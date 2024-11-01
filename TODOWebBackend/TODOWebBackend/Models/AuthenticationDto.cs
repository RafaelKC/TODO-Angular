namespace TODOWebBackend.Models
{
  public class AuthenticationDto
  {
    public User user { get; set; }
    public string token { get; set; }
    public bool valid { get; set; }
  }
}
