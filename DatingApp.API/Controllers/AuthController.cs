using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _rep;
        private readonly IConfiguration _iConfig;
        public AuthController(IAuthRepository rep, IConfiguration iConfig)
        {
            _iConfig = iConfig;
            _rep = rep;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _rep.userExists(userForRegisterDto.Username))
                return BadRequest("Username Already Exists");

            var userToCreate = new User
            {
                userName = userForRegisterDto.Username
            };

            var createdUser = await _rep.register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto _userForLoginDto)
        {
            //check if user exist
            var userFromRepo = await _rep.login(_userForLoginDto.Username.ToLower(), _userForLoginDto.Password);
            if (userFromRepo == null)
                return Unauthorized();

            //build up the token claim
            var _claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.ID.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.userName)
            };
            //get key value from appsettings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfig.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(_claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = cred
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
            
        }

    }
}