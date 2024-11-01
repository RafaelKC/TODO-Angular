using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODOWebBackend.Database;
using TODOWebBackend.Models;
using TODOWebBackend.Services;

namespace TODOWebBackend.Controllers
{
  [Route("api/user")]
  public class UserController: ControllerBase
  {
    private readonly DataContext _banco;

    public UserController([FromServices] DataContext db)
    {
      _banco = db;
    }

    [HttpPost("new")]
    [AllowAnonymous]
    public async Task<ActionResult<dynamic>> NewUser([FromBody] User user)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest("Model error");
      }
      //implementar com serviço
      user.CreateTime = DateTime.UtcNow;
      _banco.Users.Add(user);
      await _banco.SaveChangesAsync();

      var token = TokenService.GenerateToken(user);
      return new AuthenticationDto
      {
        user = user,
        token = token
      };
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<dynamic>> Authenticate([FromBody] User model)
    {
      var user = await _banco.Users
        .AsNoTracking()
        .FirstOrDefaultAsync(e => e.Password == model.Password && e.Email == model.Email && e.IsDelatad == IsDeleted.No);

      if (user == null)
      {
        return new {message = "user ou password invalids"};
      }

      var token = TokenService.GenerateToken(user);
      user.Password = "";
      return new AuthenticationDto
      {
        user = user,
        token = token
      };
    }

    [HttpGet("tokenIsValid")]
    [Authorize]
    public async Task<ActionResult<AuthenticationDto>> TokenIsValid()
    {
      var identity = HttpContext.User.Identity as ClaimsIdentity;
      IList<Claim> claim = identity.Claims.ToList();
      var userId = claim[2].Value;
      var userGuid = Guid.Parse(userId);

      var user = await _banco.Users
        .AsNoTracking()
        .FirstOrDefaultAsync(e => e.Id == userGuid);

      return new AuthenticationDto
      {
        user = user,
        valid = true
      };
    }

  }
}
