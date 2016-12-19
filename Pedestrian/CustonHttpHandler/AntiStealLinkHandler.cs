using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace System.Web
{
    public class AntiStealLinkHandler : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }
        public void ProcessRequest(HttpContext context)
        {
            context.Response.Expires = 0;
            context.Response.Clear();
            context.Response.ContentType = "image/jpg";
            if (context.Request.UrlReferrer!=null&&context.Request.UrlReferrer.Host == "localhost")
            {
                context.Response.WriteFile(context.Request.PhysicalPath);
                context.Response.End();
                 
                return;
            }
            context.Response.ContentType = "text/plain";
            context.Response.Write("您请求的资源不合法！！！");
        }
    }
}