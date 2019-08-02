using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using matthewmackay.info.Models;
using matthewmackay.info.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace matthewmackay.info.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrator")]
    public class PayrollDemoController : Controller
    {
        private readonly PayrollDemoService _payrollService;

        public PayrollDemoController(PayrollDemoService testService)
        {
            _payrollService = testService;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Employee(string Id) =>
            Ok(await _payrollService.Get(GetUserId(), new ObjectId(Id)));

        [HttpPost("[action]")]
        public async Task<ActionResult> Employee([FromBody]Employee employee)
        {
            await _payrollService.Upsert(GetUserId(), employee);
            return Created(nameof(Employee), employee);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult> Employees() => 
            Ok(await _payrollService.GetAll(GetUserId()));

        private int GetUserId() =>
            int.Parse(HttpContext.User.Claims.FirstOrDefault(c => c.Type == "userid").Value);
    }
}