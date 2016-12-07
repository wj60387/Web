using Pedestrian.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pedestrian.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        [UserAuthorizeAttribute]
        public ActionResult Contact()
        {
            //ViewBag.Message = "Your contact page.";
            return View();
        }
    }
}