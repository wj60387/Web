using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace WebHelper
{
    public partial class FrmMain : Form
    {
        public FrmMain()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var html = GetHtmlStr(txtUrl.Text,Encoding.UTF8);
            var picUrls = GetPicUrl(html);
            foreach (var picUrl in picUrls)
            {
                txtPicUrl.Text += picUrl + "\r\n";
            }
        }
        public string GetHtmlStr(string url, Encoding encoding)
        {
            string htmlStr = "";
            if (!String.IsNullOrEmpty(url))
            {
                WebRequest request = WebRequest.Create(url);            //实例化WebRequest对象  
                WebResponse response = request.GetResponse();           //创建WebResponse对象  
                Stream datastream = response.GetResponseStream();       //创建流对象  
                StreamReader reader = new StreamReader(datastream, encoding);
                htmlStr = reader.ReadToEnd();                           //读取数据  
                reader.Close();
                datastream.Close();
                response.Close();
            }
            return htmlStr;
        }
        public void SaveAsWebImg(string picUrl, string replacePath, string folder)
        {
            picUrl = picUrl.Replace("//","/");
            if (string.IsNullOrEmpty(picUrl)) return;
            string dir = picUrl.Substring(replacePath.Length+1).Replace("/","\\");
            var localpath = Path.Combine(folder, dir);
            var DIR = Path.GetDirectoryName(localpath);
            if (!Directory.Exists(DIR))
            {
                Directory.CreateDirectory(DIR);
            }
            if (!string.IsNullOrEmpty(picUrl))
            {
                WebClient webClient = new WebClient();
                webClient.Headers.Add("User-Agent", "Chrome");
                webClient.DownloadFile("http://"+picUrl, localpath);
            }
        } 
        public string [] GetPicUrl(string html)
        {
            List<string> list = new List<string>();
            MatchCollection matches = Regex.Matches(html, @"<img\b[^<>]*?\bdata-original[\s\t\r\n]*=[\s\t\r\n]*[""']http://?[\s\t\r\n]*(?<imgUrl>[^\s\t\r\n""'<>]*)[^<>]*?/?[\s\t\r\n]*>", RegexOptions.IgnoreCase);
            foreach (Match match in matches)
            {
                list.Add(match.Groups["imgUrl"].Value);
            }
            return list.ToArray();
        }

        private void btnDown_Click(object sender, EventArgs e)
        {
            //foreach (var url in txtPicUrl.Lines)
            //{
            //    SaveAsWebImg(url, @"www.shimengren.com/FileServer",@"D:\WorkSpace\VS2010\Web\Pedestrian\Pedestrian\Content\images");
            //}
            //MessageBox.Show("下载完毕");
            var d = DateTime.MaxValue;
        }
        
    }
}
