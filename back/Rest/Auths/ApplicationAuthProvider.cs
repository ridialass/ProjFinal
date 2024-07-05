using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
{
    public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
    {
        context.Validated();
    }

    public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
    {
        var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

        ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

        if (user == null)
        {
            context.SetError("invalid_grant", "The user name or password is incorrect.");
            return;
        }

        ClaimsIdentity oAuthIdentity = await userManager.CreateIdentityAsync(user, OAuthDefaults.AuthenticationType);
        AuthenticationProperties properties = CreateProperties(user.UserName);
        AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
        context.Validated(ticket);
    }

    public static AuthenticationProperties CreateProperties(string userName)
    {
        IDictionary<string, string> data = new Dictionary<string, string>
        {
            { "userName", userName }
        };
        return new AuthenticationProperties(data);
    }
}
