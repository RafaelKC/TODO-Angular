using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODOWebBackend.Database;
using TODOWebBackend.Models;

namespace TODOWebBackend.Services
{
  public class TodoService : ITodoService
  {
    private readonly DataContext _banco;

    public TodoService(DataContext db)
    {
      _banco = db;
    }

    public async Task<ActionResult<List<Todo>>> GetList()
    {
      var todos = await _banco.Todos.Where(e => e.IsDelated != IsDeleted.Yes).ToListAsync();
      return todos;
    }

    public async Task<ActionResult<Todo>> GetById(string id)
    {
      var guid = Guid.Parse(id);
      var todo = await _banco.Todos
        .AsNoTracking()
        .FirstOrDefaultAsync(e => e.Id == guid);

      return todo;
    }

    public async Task<ActionResult<Todo>> Post(Todo model)
    {
      _banco.Todos.Add(model);
      await _banco.SaveChangesAsync();

      return model;
    }

    public async Task<ActionResult<Todo>> Put(Todo model, string id)
    {
      try
      {
        _banco.Todos.Update(model);
        await _banco.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TodoExists(id))
        {
          Console.Write(TodoExists(id) + id);
          return null;
        }
        else
        {
          throw;
        }
      }

      return model;
    }

    public async Task<ActionResult<Todo>>  Delete(string id)
    {
      var todo = await _banco.Todos.FirstOrDefaultAsync(e => e.Id == Guid.Parse(id));
      if (todo == null)
      {
        return null;
      }

      try
      {
        todo.IsDelated = IsDeleted.Yes;
        _banco.Todos.Update(todo);
        await _banco.SaveChangesAsync();

        return todo;
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TodoExists(id))
        {
          Console.Write(TodoExists(id) + id);
          return null;
        }
        else
        {
          throw;
        }
      }
    }

    private bool TodoExists(string id)
    {
      return _banco.Todos.Any(e => e.Id == Guid.Parse(id));
    }
  }
}
