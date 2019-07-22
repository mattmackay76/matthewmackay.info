using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MatthewMackay.Info.Models;
using MatthewMackay.Info.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace MatthewMackay.Info.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class SampleDataController : Controller
    {
        private readonly TestService _testService;

        public SampleDataController(TestService testService)
        {
            _testService = testService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Test(string Id) => 
            Ok(await _testService.Get(getUserId(), new ObjectId(Id)));

        [HttpPost("[action]")]
        public async Task<ActionResult> Test([FromBody]Test test)
        {
            await _testService.Upsert(getUserId(), test);
            return Created(nameof(Test), test);
        }

        [HttpGet("[action]")]
        public IEnumerable<Test> Tests() => 
            _testService.GetAll(getUserId()).Result;

        public int getUserId() =>
            int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == "userid").Value);

    }
}
