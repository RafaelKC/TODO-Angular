using System.Net;
using Microsoft.EntityFrameworkCore;
using TODOWebBackend.Models;

namespace TODOWebBackend.Database
{
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
      Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
    public  DbSet<Todo> Todos { get; set; }
    public  DbSet<Auth> Auths { get; set; }
  }
}
