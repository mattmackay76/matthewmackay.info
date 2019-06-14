using MatthewMackay.Info.Dtos;
using MatthewMackay.Info.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace MatthewMackay.Info.Services
{
    public class AuthService
    {
        private readonly IEnumerable<User> _users = new List<User>
        {
            new User { Id = 1, Username = "matt", Password = "123", Role = "Administrator"},
            new User { Id = 3, Username = "guest", Password = "123", Role = "Guest"},
        };

        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Login(LoginDto loginDto)
        {
            var user = _users.Where(x => x.Username == loginDto.Username && x.Password == loginDto.Password).SingleOrDefault();

            if (user == null)
            {
                return null;
            }

            var signingKey = Convert.FromBase64String(_configuration["Jwt:SigningSecret"]);
            var expiryDuration = int.Parse(_configuration["Jwt:ExpiryDuration"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = null,              // Not required as no third-party is involved
                Audience = null,            // Not required as no third-party is involved
                IssuedAt = DateTime.UtcNow,
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(expiryDuration),
                Subject = new ClaimsIdentity(new List<Claim> {
                        new Claim("userid", user.Id.ToString()),
                        new Claim("role", user.Role)
                    }),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(signingKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var token = jwtTokenHandler.WriteToken(jwtToken);
            return token;
        }
    }
}