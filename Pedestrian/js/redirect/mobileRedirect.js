var browser = {
    versions: function () {
        var u = window.navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
            iPad: u.indexOf('iPad') > -1, //是否为iPad
            webApp: u.indexOf('Safari') == -1,//是否为web应用程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
        };
    }()
}

//如果是手机端
if (browser.versions.ios || browser.versions.android) {
    var pathname = window.location.pathname;

    //pc端首页跳转到手机端首页
    if (pathname == '/index.jhtml') {
        window.location.href = "http://m.shimengren.com/";
    }

    var activityReg = /\/activity\/operation\/view-(\d+).jhtml/;
    var group = pathname.match(activityReg);
    //活动详细页面调整
    if (group != undefined) {
        var actId = group[1];
        window.location.href = "http://m.shimengren.com/act/act-info.html?actId=" + actId;
    }

    var articleReg = /\/article\/yj\/(\d+).jhtml/;
    group = pathname.match(articleReg);
    //游记页面跳转
    if (group != undefined) {
        var artId = group[1];
        window.location.href = "http://m.shimengren.com/art/art-detail.html?artId=" + artId;
    }
}

