using System;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TODOWebBackend.Models;

namespace TODOWebBackend.Services
{
  public static class TokenService
  {
    public static string GenerateToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(Settings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new[]
        {
          new Claim(ClaimTypes.Name, user.Username.ToString()),
          new Claim(ClaimTypes.Email, user.Email.ToString()),
          new Claim(ClaimTypes.Role, user.Id.ToString())
        }),
        Expires = DateTime.UtcNow.AddDays(3),
        SigningCredentials =  new SigningCredentials(
            new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
