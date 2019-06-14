using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using MatthewMackay.Info.Dtos;
using MatthewMackay.Info.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatthewMackay.Info.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("[action]")]
        public IActionResult Login(LoginDto loginDto)
        {
            var jwtToken = _authService.Login(loginDto);

            if (jwtToken == null)
            {
                return Unauthorized();
            }

            return Ok(new { token = jwtToken });
        }


        [HttpGet("[action]")]
        [Authorize(Roles="Administrator")]
        public IActionResult GenerateKey()
        {
            using (var rng = new RNGCryptoServiceProvider())
            {
                var key = new byte[64];
                rng.GetBytes(key);
                return Ok(Convert.ToBase64String(key));
            }
        }

    }
}