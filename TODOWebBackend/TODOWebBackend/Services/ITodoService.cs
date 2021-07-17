using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TODOWebBackend.Models;

namespace TODOWebBackend.Services
{
  public interface ITodoService
  {
    Task<ActionResult<List<Todo>>> GetList();
    Task<ActionResult<Todo>> GetById(string id);
    Task<ActionResult<Todo>> Post(Todo model);
    Task<ActionResult<Todo>> Put(Todo model, string id);
    Task<ActionResult<Todo>> Delete(string id);
  }
}
