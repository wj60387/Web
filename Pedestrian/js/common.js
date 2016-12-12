/**
 * Code below taken from - http://www.evolt.org/article/document_body_doctype_switching_and_more/17/30655/
 *
 * Modified 4/22/04 to work with Opera/Moz (by webmaster at subimage dot com)
 *
 * Gets the full width/height because it's different for most browsers.
 */
/**
 * 获取浏览器可视范围高度
 */
function getViewportHeight() {
    if (window.innerHeight != window.undefined) return window.innerHeight;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
    if (document.body) return document.body.clientHeight;

    return window.undefined;
}
/**
 * 获取浏览器可视范围的宽度
 * @return
 */
function getViewportWidth() {
    var offset = 17;
    var width = null;
    if (window.innerWidth != window.undefined) return window.innerWidth;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;
}

/** 
 * 对Date的扩展，将 Date 转化为指定格式的String 
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
 * eg: 
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 
 */
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份  
        "d+": this.getDate(), //日  
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时  
        "H+": this.getHours(), //小时  
        "m+": this.getMinutes(), //分  
        "s+": this.getSeconds(), //秒  
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度  
        "S": this.getMilliseconds() //毫秒  
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
///返回一个把所有的HTML或XML标记都移除的字符串。
String.prototype.stripTags = function () {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}
//截取固定长度的字符串
String.prototype.truncate = function (length, truncation) {
    length = length || 30;
    truncation = (typeof (truncation) === 'undefined' ? '...' : truncation);
    return this.length > length ?
      this.slice(0, length - truncation.length) + truncation : String(this);
}
//去除空格
String.prototype.strip = function () {
    return this.replace(/^\s+/, '').replace(/\s+$/, '').replace(/^&nbsp;+/, '').replace(/&nbsp;+$/, '');
}
//输入框的默认提示
function def_value(get_id, msg) {
    var set_obj = $('#' + get_id);
    if (set_obj.val() == "") {
        set_obj.val(msg);
        set_obj.css('color', '#949494');
    }
    set_obj.click(function () {
        if ($(this).val() == msg) {
            //   $(this).val('');
            set_obj.css('color', '');
        }
    });
    /* set_obj.bind("blur",function(){
         if($(this).val()==''){
             $(this).val(msg);
             set_obj.css('color','#949494');
         }});
      */
}

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {

    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}
String.prototype.stripTags = function () {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

///获取文章中的img的src
function findAllImage(text, root) {
    var imgs = new Array();
    if (text.indexOf('<img') < 0)
        return imgs;
    var b = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
    var s = text.match(b)
    if (!s)
        return imgs;
    for (var i = 0; i < s.length; i++) {
        var obj = {};
        var src = s[i].replace(b, "$1");
        if (src.indexOf(root) >= 0) {
            obj['src'] = src.substring(src.indexOf(root) + root.length);
            imgs.push(obj);
        }
        //imgs.push(obj);
    }
    return imgs;
}

function getQueryString(name) {
    // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
    if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
        return '';
    }

    // 获取链接中参数部分
    var queryString = location.href.substring(location.href.indexOf("?") + 1);

    // 分离参数对 ?key=value&key2=value2
    var parameters = queryString.split("&");

    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        // 获取等号位置
        pos = parameters[i].indexOf('=');
        if (pos == -1) { continue; }

        // 获取name 和 value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);

        // 如果查询的name等于当前name，就返回当前值，同时，将链接中的+号还原成空格
        if (paraName == name) {
            return unescape(paraValue.replace(/\+/g, " "));
        }
    }
    return '';
}

function shortMsg(msg, pos, fn) {
    var wrap = $('#shortMsgBox');
    if (wrap.length < 1) {
        wrap = $('<div id="shortMsgBox" style="font-size:24px;font-weight:bold; padding:12px 18px; color:red; position:absolute;z-index:10000;">' + msg + '</div>').appendTo($('body'));
    } else {
        wrap.css({ 'display': 'block', 'opacity': '1' });
        wrap.html(msg);
    }
    var left = pos == undefined || pos.left == undefined ? ($(window).width() - wrap.width()) / 2 + $(window).scrollLeft() : pos.left,
        top = pos == undefined || pos.top == undefined ? ($(window).height() - wrap.height()) / 2 + $(window).scrollTop() : pos.top;
    wrap.css({ 'left': left, 'top': top });
    setTimeout(function () {
        wrap.animate({ 'opacity': '0' }, 1000, function () {
            $(this).hide();
            if (fn && typeof fn == 'function') {
                fn();
            }
        });
    }, 200);
}

//验证不通过，错误提示
function showError(msg, time) {
    time = time ? time : 2000;
    var wrap = $(".error");
    wrap[0].timer && clearTimeout(wrap[0].timer);
    wrap.find("span").html(msg);
    wrap.show();
    wrap[0].timer = setTimeout(function () {
        wrap.animate({ "opacity": "0" }, "normal", "", function () {
            wrap.hide();
            wrap.css("opacity", "1");
        });
    }, time);
}

function uploadImgInfo() {
    $.ajaxFileUpload({
        url: contextPath + '/common/Upload/uploadPhoto.dhtml', //上传文件的服务端
        secureuri: false, //是否启用安全提交
        dataType: 'text', //数据类型  
        fileElementId: 'selectPhoto', //表示文件域ID
        //提交成功后处理函数      html为返回值，status为执行的状态
        success: function (data, status) {
            data = JSON.parse(data);
            var uri = data.uri;
            var isSuccess = data.isSuccess;
            var msg = data.msg;
            showError(msg);
            $("#imgPic").attr("src", imagePath + uri);
            $("#img").val(uri);
        },
        //提交失败处理函数
        error: function (data, status, e) {
            showError("上传图片出错");
        }
    })
}