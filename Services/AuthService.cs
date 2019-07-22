using MatthewMackay.Info.Dtos;
using MatthewMackay.Info.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace MatthewMackay.Info.Services
{
    public class AuthService
    {
        private readonly IEnumerable<User> _users = new List<User>
        {
            new User { Id = 1, Username = "matt", Password = "84854f3aea13b84dfefb68fa9e3ce3c50538539e2fa7518133b01414e5ef8c97", Role = "Administrator"},
            new User { Id = 2, Username = "guest", Password = "2fa4d02ba2b276156f37bb3677cd6c76764dc17fd2eb6dc7e91d7f1871111810", Role = "Administrator"},
            new User { Id = 3, Username = "curt", Password = "2fa4d02ba2b276156f37bb3677cd6c76764dc17fd2eb6dc7e91d7f1871111810", Role = "Administrator"},
            new User { Id = 4, Username = "chelsie", Password = "2fa4d02ba2b276156f37bb3677cd6c76764dc17fd2eb6dc7e91d7f1871111810", Role = "Administrator"},
        };

        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string Login(LoginDto loginDto)
        {
            var user = _users
                .Where(
                    x => x.Username == loginDto.Username &&
                    x.Password == Sha256(loginDto.Password))
                .SingleOrDefault();

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

        public static string Sha256(string value)
        {
            StringBuilder Sb = new StringBuilder();
            using (var hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }
            return Sb.ToString();
        }

    }
}