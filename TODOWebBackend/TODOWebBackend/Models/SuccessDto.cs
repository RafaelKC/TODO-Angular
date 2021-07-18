using System;

namespace TODOWebBackend.Models
{
  public class SuccessDto
  {
    public Boolean Success { get; set; }
    public string[] Errors { get; set; }
  }
}
