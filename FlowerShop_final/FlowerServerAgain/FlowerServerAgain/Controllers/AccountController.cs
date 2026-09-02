using FlowerServerAgain.Models;
using FlowerServerAgain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System.Security.Claims;

namespace FlowerServerAgain.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
        }
        [HttpGet]
        public IActionResult Register()
        {
            return Ok();
        }
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.UserName, PhoneNumber = model.PhoneNumber, Birthday = model.Birthday };
                // добавляем пользователя
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {

                    var res = await _roleManager.RoleExistsAsync("Administrator");
                    if (!res)
                    {
                        var Role = new IdentityRole("Administrator");
                        await _roleManager.CreateAsync(new IdentityRole("Administrator"));
                        await _userManager.AddToRoleAsync(user, "Administrator");

                    }


                    // установка куки
                    await _signInManager.SignInAsync(user, false);
                    return Ok("Создал молодец");
                        //RedirectToAction("Index", "Home");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                }
            }
            return Ok();
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login()//string? ReturnUrl = null)
        {
            LoginViewModel model = new LoginViewModel
            {
                //ReturnUrl = ReturnUrl,
                //The GetExternalAuthenticationSchemesAsync() method of the SignInManager class is used to retrieve
                //a list of all external authentication schemes that have been configured in the application.
                ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            return View(model);
        }
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)//, string? ReturnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, false, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    //if (!string.IsNullOrEmpty(ReturnUrl) && Url.IsLocalUrl(ReturnUrl))
                    //{
                    //    return Redirect(ReturnUrl);
                    //}
                    // Handle successful login
                    //var user = await _userManager.FindByEmailAsync(model.Email);
                    var role = await _userManager.GetRolesAsync(user);

                    return Ok(new { message = "Вход успешно выполнен", account = new { id = user.Id, username = user.UserName, role = role.FirstOrDefault() } });
                    //Ok(new { message = "Вход успешно выполнен", user = new { id = user.Id, username = user.Username, role = user.Role.RoleName } });
                    //RedirectToAction(nameof(HomeController.Index), "Home");
                }
                if (result.RequiresTwoFactor)
                {
                    // Handle two-factor authentication case
                }
                if (result.IsLockedOut)
                {
                    // Handle lockout scenario
                }
                else
                {
                    model.ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
                    // Handle failure
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return Unauthorized("Invalid login attempt.");



                }
            }
            // If we got this far, something failed, redisplay form
            model.ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();
            return View(model);
        }


        //-------------------
        [AllowAnonymous]
        [HttpGet]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Generate a URL for the "ExternalLoginCallback" action method in the "Account" controller.
            // This URL includes the returnUrl as a route parameter, which will be used to redirect the user
            // back to the original page they were trying to access after a successful external login.
            var redirectUrl = Url.Action(
         action: "ExternalLoginCallback", // The name of the callback action method.
         controller: "Account", // The name of the controller containing the callback method.
         values: new { ReturnUrl = returnUrl } // Pass the returnUrl as a parameter to the callback method.
            );
            // Configure authentication properties for the external login.
            // The "ConfigureExternalAuthenticationProperties" method sets up parameters needed for the external provider,
            // such as the login provider name (e.g., Google, Facebook) and the redirect URL to be used after login.
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            // Redirect the user to the external provider's login page (e.g., Google or Facebook).
            // The "ChallengeResult" triggers the external authentication process, which redirects the user
            // to the external provider's login page using the configured properties.
            return new ChallengeResult(provider, properties);
        }
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string? returnUrl, string? remoteError)
        {
            // If no returnUrl is provided, default to the application's home page.
            returnUrl = returnUrl ?? Url.Content("~/");
            // Check if an error occurred during the external authentication process.
            // If so, display an alert to the user and close the popup window.
            if (remoteError != null)
            {
                return Content($"<script>alert('Error from external provider: {remoteError}'); window.close();</script>", "text/html");
            }
            // Retrieve login information about the user from the external login provider (e.g., Google, Facebook).
            // This includes details like the provider's name and the user's identifier within that provider.
            var info = await _signInManager.GetExternalLoginInfoAsync();
            // If the login information could not be retrieved, display an error message
            // and close the popup window.
            if (info == null)
            {
                return Content($"<script>alert('Error loading external login information.'); window.close();</script>", "text/html");
            }
            // Attempt to sign in the user using their external login details.
            // If a corresponding record exists in the AspNetUserLogins table, the user will be logged in.
            var signInResult = await _signInManager.ExternalLoginSignInAsync(
         info.LoginProvider, // The name of the external login provider (e.g., Google, Facebook).
         info.ProviderKey, // The unique identifier of the user within the external provider.
         isPersistent: false, // Indicates whether the login session should persist across browser restarts.
         bypassTwoFactor: true  // Bypass two-factor authentication if enabled.
            );
            // If the external login succeeds, redirect the parent window to the returnUrl
            // and close the popup window.
            if (signInResult.Succeeded)
            {
                return Content($"<script>window.opener.location.href = '{returnUrl}'; window.close();</script>", "text/html");
            }
            // If the user does not have a corresponding record in the AspNetUserLogins table,
            // attempt to create a new account using the user's email from the external provider.
            var email = info.Principal.FindFirstValue(ClaimTypes.Email); // Retrieve the user's email from the external login provider.
            if (email != null)
            {
                // Check if a local user account with the retrieved email already exists.
                var user = await _userManager.FindByEmailAsync(email);
                // If no local account exists, create a new user in the AspNetUsers table.
                if (user == null)
                {
                    user = new User
                    {
                        UserName = email, // Set the username to the user's email.
                        Email = email, // Set the email.
                                       //FirstName = info.Principal.FindFirstValue(ClaimTypes.GivenName), // Retrieve and set the user's first name.
                                       // LastName = info.Principal.FindFirstValue(ClaimTypes.Surname)    // Retrieve and set the user's last name.

                        PhoneNumber = info.Principal.FindFirstValue(ClaimTypes.MobilePhone),
                        //Birthday = info.Principal.FindFirstValue(ClaimTypes.DateOfBirth)
                    };
                    // Create the new user in the database.
                    await _userManager.CreateAsync(user);
                }
                // Link the external login to the newly created or existing user account.
                // This inserts a record into the AspNetUserLogins table.
                await _userManager.AddLoginAsync(user, info);
                // Sign in the user locally after linking their external login.
                await _signInManager.SignInAsync(user, isPersistent: false);
                // Redirect the parent window to the returnUrl and close the popup window.
                return Content($"<script>window.opener.location.href = '{returnUrl}'; window.close();</script>", "text/html");
            }
            // If the email claim is not provided by the external login provider,
            // display an error message and close the popup window.
            return Content($"<script>alert('Email claim not received. Please contact support.'); window.close();</script>", "text/html");
        }
    }
}
