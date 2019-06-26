using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatthewMackay.Info.Models;
using MatthewMackay.Info.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MatthewMackay.Info.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private readonly TestService _testService;
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public SampleDataController(TestService testService)
        {
            _testService = testService;
        }

        [HttpGet("[action]")]
        [Authorize(Roles="Administrator")]
        public ActionResult Test() => Ok(new { someText="hello world" });

        [HttpPost("[action]")]
        [Authorize(Roles = "Administrator")]
        public ActionResult Test([FromBody]Test test)
        {
            //validate Test here
            _testService.Put(test);
            return Created(nameof(GetTest), test);
        }

        [HttpGet("[action]")]
        public IEnumerable<Test> GetTest() => 
            _testService.Get().Result;

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts(int startDateIndex)
        {
           
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index + startDateIndex).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
