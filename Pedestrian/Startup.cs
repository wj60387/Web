using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Pedestrian.Startup))]
namespace Pedestrian
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
