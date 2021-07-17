using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using TODOWebBackend.Database;
using TODOWebBackend.Models;
using TODOWebBackend.Services;

namespace TODOWebBackend.Controllers
{
  [ApiController]
  [Route("api/toDo")]
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
        var result = await _todoService.GetList();
        return result;
      }

      [HttpGet("{id}")]
      public async Task<ActionResult<Todo>> GetById(string id)
      {
        if (id == null)
        {
          return BadRequest("Id Invalid");
        }
        var result = await _todoService.GetById(id);
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
      public async Task<ActionResult<Todo>> Put([FromBody] Todo model, string id)
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
        return result;
      }
  }
}
