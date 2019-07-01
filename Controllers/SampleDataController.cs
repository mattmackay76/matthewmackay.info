using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MatthewMackay.Info.Models;
using MatthewMackay.Info.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MatthewMackay.Info.Controllers
{
    //[Authorize]
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
        public ActionResult Test()
        {

            var req = HttpContext.Request;
            var reqJson = new {
                host = JsonConvert.SerializeObject(req.Host),
                scheme = req.Scheme,
                path = HttpContext.Request.Path,
                now = DateTime.Now
                
            };
            //var host = HttpContext.Request.Host;
            //var newPath = $"{HttpContext.Request.Scheme}://{host.Host.Replace("www.", "", StringComparison.OrdinalIgnoreCase)}{ req.PathBase}{ req.Path}{ req.QueryString}";
            return new JsonResult(reqJson);
        }

        [HttpPost("[action]")]
        [Authorize(Roles = "Administrator")]
        public ActionResult Test([FromBody]Test test)
        {
            //validate Test here
            _testService.Put(test);
            return Created(nameof(GetTest), test);
        }

        [HttpGet("[action]")]
        [Authorize(Roles = "Administrator")]
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
