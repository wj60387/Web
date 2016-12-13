; (function ($) {
    $.fn.extend({
        'imgbox': function (options) {
            var defaultSetting = {
                'changeTime': 5
            };
            options = $.extend(defaultSetting, options || {})
            return this.each(function () {
                var $obj = $(this);
                $obj.css('position', 'relative');

                var $list = $('div.list', $obj).find('a');
                var t = options.changeTime;
                var imgPath = options.imgPath;
                var len = $list.length;
                var i = len;
                var w = parseInt($obj.css('width'));
                var h = parseInt($obj.css('height'));

                show_imgbox();

                var tid = window.setInterval(function () {
                    show_imgbox();
                }, t * 1000);

                function show_imgbox() {
                    i -= 1;

                    if (i < 0) i = len - 1;
                    var $img = $($list[i]);
                    var title = $img.attr('title');
                    var url = $img.attr('href');
                    var src = $img.find('img').attr('src');
                    var $panel = $('div.imgbox_panel', $obj);
                    ///初始化显示图片的面板
                    if ($panel.length == 0) {
                        $panel = $('<div style="padding:0px;margin:0px;font:normal 500 14px/20px arial;font-weight:500;font-style:normal;">' +
										'<a href="#" style="padding:0px;margin:0px;" target="_blank"><img src="" border="0" style="padding:0px;margin:0px"/></a>' +
									'<p style="height:40px;text-align:center;margin:0 auto;background:#FFF;position:absolute;text-indent: 15px;line-height: 15px;font-size: 15px;font-family: "微软雅黑", "宋体", serif;text-align: left;left:0px;z-index:100;width:100%;">' +
										'<h2 style="padding:0px;margin:0px;background:black;left:0px;visibility:visible;position:absolute;z-index:100;width:100%;height:40px; -moz-opacity:0.8;opacity: 0.8;filter:alpha(opacity=80);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:微软雅黑, 宋体, serif;">' +
											'<a href="#" style="padding:0px;margin:0px;text-decoration:none;" target="_blank">loading...</a>' +
										'</h2>' +
								    '</p>' +
								    	'</div>').attr('class', 'imgbox_panel');
                        $panel.find('h2').css({
                            'top': (h - 40) + 'px'
                        });
                        $panel.find('img').css({
                            'width': w + 'px',
                            'height': h + 'px',
                            'border': 0
                        }).attr('width', w + 'px').attr('height', (h + 30) + 'px');
                        $obj.append($panel);
                        $panel.mouseover(function (e) {
                            window.clearInterval(tid);
                        }).mouseout(function (e) {
                            tid = window.setInterval(function () {
                                show_imgbox();
                            }, t * 1000);
                        });
                    }

                    $panel.find('img').attr('src', src);
                    $panel.find('a').attr('href', url).attr('title', title);
                    ///设置显示轮转提示文字的面板
                    $panel.find('a:last').html('<p style="padding:0px;margin:0px;font-weight:700;margin-left:15px;display:block;font-size:18px;color:white">' + title + '</p>');


                    var $u = $('ul.imgbox_num', $obj);
                    if ($u.length == 0) {
                        $u = $('<ul style="z-index:102;display:block;list-style-type:none;overflow:hidden;zoom:1;position:absolute;left:0;top:0;visibility:hidden;padding:0;margin:0;" />').attr('class', 'imgbox_num').css('width', len * 29 + 'px');
                        for (var i2 = 1; i2 <= len; i2++) {
                            $('<li style="float:right; width:10px; height:10px; margin-right:10px; display:inline; background:url(' + imgPath + 'qhc.png) -66px -4px no-repeat; cursor:pointer; font-size:0;"  index="' + i2 + '"/>').appendTo($u);
                        }
                        $u.css({
                            'left': (w - $u.width() - 5) + 'px',
                            'top': (h - $u.height() - 20) + 'px',
                            'visibility': 'visible'
                        });
                        $obj.append($u);
                        $u.find('li').click(function (e) {
                            window.clearInterval(tid);
                            i = parseInt($(this).attr('index'));
                            if (i < 0) i = len - 1;
                            show_imgbox();
                        }).mouseout(function (e) {
                            tid = window.setInterval(function () {
                                show_imgbox();
                            }, t * 1000);
                        });
                    }
                    var $uli = $u.find('li');
                    $uli.each(function (i2) {
                        $(this).css({
                            'background-position': '-66px -4px'
                        });
                    });
                    $($uli[i]).css({
                        'background-position': '-41px -4px'
                    });

                }
            });
        }
    });

})(jQuery);