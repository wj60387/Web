using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pedestrian.Controllers
{
    public class ArticleController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Picture()
        {
            return View("Picture");
        }
        public ActionResult Question()
        {
            return View("Question");
        }
    }
}