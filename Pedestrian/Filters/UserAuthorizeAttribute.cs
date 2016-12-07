using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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
}