using Pedestrian.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Pedestrian
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        //protected void Application_Error(object sender, EventArgs e)
        //{
        //    Exception exception = Server.GetLastError();
        //    HttpException httpException = exception as HttpException;
        //    RouteData routeData = new RouteData();
        //    routeData.Values.Add("controller", "Error");
        //    switch (httpException.GetHttpCode())
        //    {
        //        case 404:
        //            routeData.Values.Add("action", "Index");
        //            break;
        //    }
        //    Response.Clear();
        //    Server.ClearError();
        //    Response.TrySkipIisCustomErrors = true;
        //    IController errorController = new ErrorController();
        //    errorController.Execute(new RequestContext(new HttpContextWrapper(Context), routeData));
        //}
    }
}
