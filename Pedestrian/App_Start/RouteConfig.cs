using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Pedestrian
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                 name: "Default",
                 url: "{controller}/{action}/{id}",
                 defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
             );
            routes.MapRoute(
               name: "Default1",
               url:  "{controller}/{action}/{id}/{*catchall}",
                 defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
           );


            //指定请求方法
            routes.MapRoute("MyRoute3", "{controller}/{action}/{id}/{*catchall}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new { controller = "^H.*", action = "Index|About", httpMethod = new HttpMethodConstraint("GET") },
                new[] { "URLsAndRoutes.Controllers" }
            );
        }
    }
}
