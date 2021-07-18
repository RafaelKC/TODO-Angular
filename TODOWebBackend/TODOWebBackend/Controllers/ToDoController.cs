using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TODOWebBackend.Database;
using TODOWebBackend.Models;
using TODOWebBackend.Services;

namespace TODOWebBackend.Controllers
{
  [ApiController]
  [Route("api/toDo")]
  [Authorize]
  public class ToDoController : ControllerBase
  {
      private readonly ITodoService _todoService;

      public ToDoController([FromServices] DataContext db)
      {
        _todoService = new TodoService(db);
      }

      [HttpGet("getList")]
      public  async Task<ActionResult<List<Todo>>> GetList()
      {
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity.Claims.ToList();
        var userId = claim[2].Value;

        var result = await _todoService.GetList(userId);
        return result;
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<Todo>> GetById(string id)
      {
        if (id == null)
        {
          return BadRequest("Id Invalid");
        }
        var identity = HttpContext.User.Identity as ClaimsIdentity;
        IList<Claim> claim = identity.Claims.ToList();
        var userId = claim[2].Value;

        var result = await _todoService.GetById(id, userId);
        if (result == null)
        {
          return NotFound();
        }

        return result;
      }

      [HttpDelete("{id}")]
      public async Task<ActionResult<Todo>> Delete(string id)
      {
        if (id == null)
        {
          return BadRequest("Id error");
        }
        var result = await _todoService.Delete(id);
        if (result == null)
        {
          return BadRequest("Id error");
        }
        return result;
      }

      [HttpPost]
      public async Task<ActionResult<Todo>> Post([FromBody] Todo model)
      {
        if (!ModelState.IsValid)
        {
          return BadRequest("Model error");
        }

        var result = await _todoService.Post(model);
        return result;
      }

      [HttpPut("{id}")]
      public async Task<ActionResult<SuccessDto>> Put([FromBody] Todo model, string id)
      {
        if (!ModelState.IsValid)
        {
          return BadRequest("Model error");
        }

        if (Guid.Parse(id) != model.Id)
        {
          return BadRequest("Model error");
        }

        var result = await _todoService.Put(model, id);
        if (result == null)
        {
          return NotFound();
        }
        return new SuccessDto
        {
          Success = true
        };
      }
  }
}
