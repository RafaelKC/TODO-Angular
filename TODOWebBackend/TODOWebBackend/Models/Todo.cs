using System;
using System.ComponentModel.DataAnnotations;

namespace TODOWebBackend.Models
{
  public class Todo
  {
    [Key]
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Data { get; set; }
    public bool Checked { get; set; }
    public TodoStatus Status { get; set; }
    public string Desc { get; set; }
    public Guid UserId { get; set; }
    public IsDeleted IsDelated { get; set; }
  }
}
