/// <reference path="jquery-1.10.2.min.js" />

var i = 0;//全局变量
var timer;
$(function () {//页面加载之后
    $(".ig").eq(0).show().siblings().hide();//第一张图片显示，其余的图片隐藏
    A();
    $(".tab").hover(function () {
        i = $(this).index();
        Show();
        clearInterval(timer);
    }, function () {
        A();
    });
    $("#dlunbo").hover(function () {
        $(".btn").show();
    }, function () {
        $(".btn").hide();
    });
    $(".btn1").click(function () {
        clearInterval(timer);
        i--;
        if (i == -1) {
            i = 4;
        }
        Show();
        A();
    });
    $(".btn2").click(function () {
        clearInterval(timer);
        i++;
        if (i == 5) {
            i = 0;
        }
        Show();
        A();
    });
});

function Show() {
    $(".ig").eq(i).fadeIn(300).siblings().fadeOut(300);
    $(".tab").eq(i).addClass("bg").siblings().removeClass("bg");
}
function A() {
    timer = setInterval(function () {//间隔4s图片轮播一次
        i++;
        if (i == 5) {
            i = 0;
        }
        Show();
    }, 4000);
}