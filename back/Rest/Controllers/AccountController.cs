using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Owin.Security;
using System;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

[RoutePrefix("api/Account")]
public class AccountController : ApiController
{
    private ApplicationUserManager _userManager;

    public AccountController()
    {
    }

    public AccountController(ApplicationUserManager userManager)
    {
        UserManager = userManager;
    }

    public ApplicationUserManager UserManager
    {
        get
        {
            return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        }
        private set
        {
            _userManager = value;
        }
    }

    [HttpPost]
    [Route("Register")]
    public async Task<IHttpActionResult> Register(RegisterBindingModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser { UserName = model.Username, Email = model.Email };
        var result = await UserManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return GetErrorResult(result);
        }

        return Ok();
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IHttpActionResult> Login(LoginBindingModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await UserManager.FindAsync(model.Username, model.Password);
        if (user == null)
        {
            return Unauthorized();
        }

        var token = GenerateToken(user.Id);
        return Ok(new { token });
    }

    private string GenerateToken(string userId)
    {
        var handler = new JwtSecurityTokenHandler();
        var issuer = ConfigurationManager.AppSettings["JwtIssuer"];
        var key = Convert.FromBase64String(ConfigurationManager.AppSettings["JwtSecretKey"]);

        var identity = new ClaimsIdentity(new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId)
        });

        var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        var token = handler.CreateJwtSecurityToken(issuer, issuer, identity, DateTime.UtcNow, DateTime.UtcNow.AddHours(1), DateTime.UtcNow, signingCredentials);

        return handler.WriteToken(token);
    }

    private IHttpActionResult GetErrorResult(IdentityResult result)
    {
        if (result == null)
        {
            return InternalServerError();
        }

        if (!result.Succeeded)
        {
            if (result.Errors != null)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error);
                }
            }

            if (ModelState.IsValid)
            {
                return BadRequest();
            }

            return BadRequest(ModelState);
        }

        return null;
    }
}
