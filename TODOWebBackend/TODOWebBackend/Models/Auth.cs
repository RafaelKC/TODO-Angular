using System;
using System.ComponentModel.DataAnnotations;

namespace TODOWebBackend.Models
{
  public class Auth
  {
    [Key]
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid Authentication { get; set; }
    public DateTime LastLogin { get; set; }
    public bool IsLoging { get; set; }
  }
}
