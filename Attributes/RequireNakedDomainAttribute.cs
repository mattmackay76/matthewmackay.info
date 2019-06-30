//Adapted from https://www.logicalimagination.com/blogs/2018/3/dotnet-core-www-subdomain-redirect
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;

namespace matthewmackay.info.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = false)]
    public class RequireNakedDomainAttribute : Attribute, IAuthorizationFilter, IOrderedFilter
    {
        private bool? permanent;
        public bool Permanent
        {
            get => permanent ?? true;
            set => permanent = value;
        }
        private bool? ignoreLocalhost;
        public bool IgnoreLocalhost
        {
            get => ignoreLocalhost ?? true;
            set => ignoreLocalhost = value;
        }
               
        public int Order { get; set; }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context == null)
                throw new ArgumentNullException(nameof(context));

            var req = context.HttpContext.Request;
            var host = req.Host;

            var isLocalHost = string.Equals(host.Host, "localhost", StringComparison.OrdinalIgnoreCase);
            if (IgnoreLocalhost && isLocalHost)
                return;

            if (host.Host.StartsWith("www.", StringComparison.OrdinalIgnoreCase))
            {
                var optionsAccessor = context.HttpContext
                    .RequestServices
                    .GetRequiredService<IOptions<MvcOptions>>();
                var permanentValue = permanent ?? optionsAccessor.Value.RequireHttpsPermanent;
                var newPath = $"{req.Scheme}://{host.Host.Replace("www.","", StringComparison.OrdinalIgnoreCase)}{ req.PathBase}{ req.Path}{ req.QueryString}";
                context.Result = new RedirectResult(newPath, permanentValue);
                
                //https://stackoverflow.com/questions/1644045/return-307-temporary-redirect-in-asp-net-mvc
                //look into 307 internal redirect
                //public ActionResult Action()
                //{
                //    string url = GetRedirectUrl()
                //    HttpContext.Response.AddHeader("Location", url);
                //    return new HttpStatusCodeResult(307);
                //}
            }

            //do nothing
        }
    }
}
