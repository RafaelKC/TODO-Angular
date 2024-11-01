using System;
using System.ComponentModel.DataAnnotations;

namespace TODOWebBackend.Models
{
  public class User
  {
    [Key]
    public  Guid Id { get; set; }
    public string Username { get; set; }
    public string Login { get; set; }
    public string Email { get; set; }
    public IsDeleted IsDelatad { get; set; }
    public DateTime CreateTime { get; set; }
    public string Password { get; set; }
  }
}
