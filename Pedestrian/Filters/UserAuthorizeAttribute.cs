using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Pedestrian.Filters
{
    public class UserAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            return DateTime.Now.Minute % 2 == 0;
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.HttpContext.Response.Redirect("/Home/Index");
        }
        public override void OnAuthorization(AuthorizationContext filterContext)
        {

        }

    }
    public class AuthenticationAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.HttpContext.Session["username"] == null)
                filterContext.Result = new RedirectToRouteResult("Login", new RouteValueDictionary { { "from", filterContext.HttpContext.Request.Url.ToString() } });
            base.OnActionExecuting(filterContext);
        }
    }
}