// 封装成模块后 模块里代码全部成了局部变量 在模块外使用 window.mt. 方式调用
// 或者封装成jQuery插件
(function ($) {
    'use strict';
    var transition_bianliang = window.mt_duixiang.transition_shuxing_duixiang;

    function init_gonggong($elem, huidiao_hanshu) {
        if ($elem.is(':hidden')) { // 如果元素是 display none 则添加hidden状态
            $elem.data('status', 'hidden003');
            if (typeof (huidiao_hanshu) === 'function') huidiao_hanshu();
        } else { //否则添加显示状态
            $elem.data('status', 'shown');
        }
    }

    function xianshi_gonggong_hanshu($canshu, huidiao_hanshu) {
        if ($canshu.data('status') === 'show') return;
        if ($canshu.data('status') === 'shown') return;
        $canshu.data('status', 'show').trigger('show');
        huidiao_hanshu();
    }

    function yincang_gonggong_hanshu($canshu, huidiao_hanshu) {
        if ($canshu.data('status') === 'hide') return;
        if ($canshu.data('status') === 'hidden003') return;
        $canshu.data('status', 'hide').trigger('hide');
        huidiao_hanshu();
    }

    var silent_duixiang = { // 定义对象
        init: function ($elem) {
            init_gonggong($elem);
        },
        xianshi_hanshu: function ($canshu) { // 对象里的方法
            xianshi_gonggong_hanshu($canshu, function () {
                $canshu.show();
                $canshu.data('status', 'shown').trigger('shown');
            });
        },
        yincang_hanshu: function ($canshu) {
            yincang_gonggong_hanshu($canshu, function () {
                $canshu.hide();
                $canshu.data('status', 'hidden003').trigger('hidden003');
            });
        }
    };

    var css3_duixiang = {
        fade_fangfa: { // 淡入淡出
            init: function ($elem) {
                $elem.addClass('transition'); // 独有的
                init_gonggong($elem, function () {
                    $elem.addClass('fade-danrudanchu'); // 初始化 如果元素是隐藏 则添加 fade-danrudanchu类
                });
            },
            xianshi_hanshu: function ($canshu) {
                xianshi_gonggong_hanshu($canshu, function () {
                    $canshu.show();
                    setTimeout(function () {
                        $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
                    }, 30); // 30毫秒后执行
                    $canshu.off(transition_bianliang.end_shuxing).one(transition_bianliang.end_shuxing, function () {
                        $canshu.data('status', 'shown').trigger('shown'); // 还会连着触发下面的hidden 使用off
                    });
                });
            },
            yincang_hanshu: function ($canshu) {
                yincang_gonggong_hanshu($canshu, function () {
                    $canshu.addClass('fade-danrudanchu');
                    $canshu.off(transition_bianliang.end_shuxing).one(transition_bianliang.end_shuxing, function () {
                        $canshu.hide();
                        $canshu.data('status', 'hidden003').trigger('hidden003'); // 不会发送hidden003 事件？？？ 
                    });
                });
            }
        },
        slideUpDown_fangfa: { // 上下滚动
            init: function ($elem) {
                // 显性获取设置高度 解决没有上下滚动效果
                $elem.height($elem.height());
                // 调用封装好的 内部函数 
                css3_duixiang._init_neibu($elem, 'slide_shangxia');
            },
            xianshi_hanshu: function ($canshu) {
                // 封装的函数
                css3_duixiang._xianshi_neibu($canshu, 'slide_shangxia');
            },
            yincang_hanshu: function ($canshu) {
                // 封装
                css3_duixiang._yincang_heibu($canshu, 'slide_shangxia');
            }
        },
        slideLeftRight_fangfa: { // 左右滚动
            init: function ($elem) {
                // 手动设置宽度 
                $elem.width($elem.width());
                // 调用封装好的 内部函数 
                css3_duixiang._init_neibu($elem, 'slide_zuoyou');
            },
            xianshi_hanshu: function ($canshu) {
                css3_duixiang._xianshi_neibu($canshu, 'slide_zuoyou');
            },
            yincang_hanshu: function ($canshu) {
                css3_duixiang._yincang_heibu($canshu, 'slide_zuoyou');
            }
        },
        fadeslideUpDown_fangfa: { // 淡入淡出上下滚动 同时添加移除 两个类 fade-danrudanchu 和 slide_shangxia
            init: function ($elem) {
                // 显性获取设置高度 解决没有上下滚动效果
                $elem.height($elem.height());
                // 调用封装好的 内部函数 
                css3_duixiang._init_neibu($elem, 'fade-danrudanchu slide_shangxia');
            },
            xianshi_hanshu: function ($canshu) {
                css3_duixiang._xianshi_neibu($canshu, 'fade-danrudanchu slide_shangxia');
            },
            yincang_hanshu: function ($canshu) {
                css3_duixiang._yincang_heibu($canshu, 'fade-danrudanchu slide_shangxia');
            }
        },
        fadeslideLeftRight_fangfa: { // 淡入淡出左右滚动
            init: function ($elem) {
                // 手动设置宽度 
                $elem.width($elem.width());
                // 调用封装好的 内部函数 
                css3_duixiang._init_neibu($elem, 'fade-danrudanchu slide_zuoyou');
            },
            xianshi_hanshu: function ($canshu) {
                css3_duixiang._xianshi_neibu($canshu, 'fade-danrudanchu slide_zuoyou');
            },
            yincang_hanshu: function ($canshu) {
                css3_duixiang._yincang_heibu($canshu, 'fade-danrudanchu slide_zuoyou');
            }
        }
    };

    // 将css3 内部 fade slideUpdown 函数的公共部分提取出来 
    // css3 内部函数 init 定义
    css3_duixiang._init_neibu = function ($elem, leiming_canshu) {
        $elem.addClass('transition'); // 独有的
        init_gonggong($elem, function () {
            $elem.addClass(leiming_canshu); // 初始化 如果元素是隐藏 则添加 fade-danrudanchu类
        });
    }

    // 传相应的类名进来 添加移除
    css3_duixiang._xianshi_neibu = function ($canshu, leiming_canshu) {
        xianshi_gonggong_hanshu($canshu, function () {
            $canshu.show();
            setTimeout(function () {
                $canshu.removeClass(leiming_canshu); // 传相应的类名进来
            }, 30); // 30毫秒后执行
            $canshu.off(transition_bianliang.end_shuxing).one(transition_bianliang.end_shuxing, function () {
                $canshu.data('status', 'shown').trigger('shown'); // 还会连着触发下面的hidden 使用off
            });
        });
    }

    //css3 隐藏内部函数 _开头默许为内部函数 约定
    css3_duixiang._yincang_heibu = function ($canshu, leiming_canshu) {
        yincang_gonggong_hanshu($canshu, function () {
            $canshu.addClass(leiming_canshu);
            $canshu.off(transition_bianliang.end_shuxing).one(transition_bianliang.end_shuxing, function () {
                $canshu.hide();
                $canshu.data('status', 'hidden003').trigger('hidden003'); // 不会发送hidden003 事件？？？ 
            });
        });
    }

    // 带效果的显示和隐藏，js实现方法
    var js_duixiang = {
        fade_fangfa: { // 淡入淡出
            init: function ($elem) { // 初始化 添加状态 移除 transition 
                $elem.removeClass('transition'); // 移除 transition  和jQuery 的 fadeIn fadeOut 函数有冲突
                init_gonggong($elem, function () { // 调用公共 init 
                    // 暂时不做事情 回调函数为空
                });
            },
            xianshi_hanshu: function ($canshu) {
                xianshi_gonggong_hanshu($canshu, function () {
                    $canshu.stop().fadeIn(function () {
                        $canshu.data('status', 'shown').trigger('shown');
                    });
                });
            },
            yincang_hanshu: function ($canshu) {
                yincang_gonggong_hanshu($canshu, function () {
                    $canshu.stop().fadeOut(function () {
                        $canshu.data('status', 'hidden003').trigger('hidden003');
                    });
                });
            }
        },
        slideUpDown_fangfa: { // 上下滚动  使用jQuery的 slideDown slideUp 
            init: function ($elem) { // 初始化 添加状态 移除 transition 
                js_duixiang._init_neibu($elem);
            },
            xianshi_hanshu: function ($canshu) {
                // xianshi_gonggong_hanshu($canshu, function () {
                //     $canshu.stop().slideDown(function(){
                //         $canshu.data('status', 'shown').trigger('shown'); 
                //     });
                // });

                // 调用js内部 函数 将slideDown 传过去
                js_duixiang._xianshi_neibu($canshu, 'slideDown');
            },
            yincang_hanshu: function ($canshu) {
                js_duixiang._yincang_heibu($canshu, 'slideUp');
            }
        },
        slideLeftRight_fangfa: { // 左右滚动 使用animate()
            init: function ($elem) { // 初始化 获取元素的 width padding-left padding-right 保存到一个对象里
                var style_baocun_duixiang = {}; // 定义一个空对象 保存 高度等样式
                // style_baocun_duixiang.width = $elem.css('width'); // 保存元素width 
                // style_baocun_duixiang.padding-left = $elem.css('padding-left'); // 因为有 - 这样写不可以
                style_baocun_duixiang['width'] = $elem.css('width'); //  保存元素width
                style_baocun_duixiang['padding-left'] = $elem.css('padding-left'); // [] 这样写也可以
                style_baocun_duixiang['padding-right'] = $elem.css('padding-right');
                // console.log(style_baocun_duixiang);
                // style 是局部变量  将style保存到 data上 在其他函数才可以使用
                $elem.data('style_data', style_baocun_duixiang); // 保存数据到data上
                // console.log($elem.data('style_data'));

                // 初始化 移除transition 将元素高度等样式设置为 0 
                $elem.removeClass('transition');
                init_gonggong($elem, function () { // 调用公共 init 
                    $elem.css({ // 初始化元素 css样式
                        'width': 0,
                        'padding-left': 0,
                        'padding-right': 0
                    });
                });
            },
            xianshi_hanshu: function ($canshu) {
                // 调用公共的show 在回调函数做 对应的animate 动画
                xianshi_gonggong_hanshu($canshu, function () {
                    // 获取init 存放在传进来 元素data上的 style
                    var style_data = $canshu.data('style_data'); // 这里的$canshu 是传进来的 $hezi元素 和init里的$elem是同一个元素
                    // console.log($canshu.data('style_data'));
                    $canshu.show(); // 显示出来 在做动画
                    // animate 做动画 改变css样式 高度等 回调函数发送消息
                    $canshu.stop().animate({ //在animate 前调用stop() 防止冲突
                        'width': style_data['width'], // 改变宽度 
                        'padding-left': style_data['padding-left'],
                        'padding-right': style_data['padding-right']
                    }, function () { // 在animate 的回调函数里 发送shown
                        $canshu.data('status', 'shown').trigger('shown');
                    });
                });
            },
            yincang_hanshu: function ($canshu) {
                // 公共hide 发送消息 改变状态 state
                yincang_gonggong_hanshu($canshu, function () {
                    //在animate 的回调函数里 调用hide()
                    $canshu.stop().animate({
                        'width': 0, // 改变宽度 
                        'padding-left': 0,
                        'padding-right': 0
                    }, function () { // animate 的回调函数
                        $canshu.hide(); // 先做动画 再完全隐藏
                        $canshu.data('status', 'hidden003').trigger('hidden003');
                    });
                });
            }
        },
        fadeslideUpDown_fangfa: { // 淡入淡出上下滚动  多一个opacity 实现淡入淡出
            init: function ($elem) { //  获取元素的 height padding-top padding-bottom 
                // 调用封装的 animate部分内部函数 将对象传过去 需要做动画部分
                js_duixiang._init_neibu_animate($elem, {
                    'opacity': 0,
                    'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });
            },
            xianshi_hanshu: function ($canshu) {
                js_duixiang._xianshi_neibu_animate($canshu);
            },
            yincang_hanshu: function ($canshu) {
                js_duixiang._yincang_heibu_animate($canshu, {
                    'opacity': 0,
                    'height': 0,
                    'padding-top': 0,
                    'padding-bottom': 0
                });
            }
        },
        fadeslideLeftRight_fangfa: { // 淡入淡出左右滚动
            init: function ($elem) { //  获取元素的 width padding-left padding-right opacity 
                // 调用封装的 animate部分内部函数 将对象传过去 需要做动画部分
                js_duixiang._init_neibu_animate($elem, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });
            },
            xianshi_hanshu: function ($canshu) {
                js_duixiang._xianshi_neibu_animate($canshu);
            },
            yincang_hanshu: function ($canshu) {
                js_duixiang._yincang_heibu_animate($canshu, {
                    'opacity': 0,
                    'width': 0,
                    'padding-left': 0,
                    'padding-right': 0
                });
            }
        }
    };

    // 将js 里公共部分 提取出来放到一个 内部函数里（约定） 
    js_duixiang._init_neibu = function ($elem) { // 定义 内部init函数
        $elem.removeClass('transition'); // 移除 transition  和jQuery 的 fadeIn fadeOut 函数有冲突
        init_gonggong($elem, function () { // 调用公共 init 
            // 暂时不做事情 回调函数为空
        });
    }
    // 将js第二层公共部分（animate 部分） 提取出来 放到一个新的内部函数里 
    js_duixiang._init_neibu_animate = function ($elem, animate_duixiang) { // 用animate_duixiang参数接收
        var style_baocun_duixiang = {};
        for (var p_shuxing in animate_duixiang) { // 变量传进来的对象 获取它的属性和值
            style_baocun_duixiang[p_shuxing] = $elem.css(p_shuxing); //将元素的css样式 取出来 放到一个新对象里 
        }
        $elem.data('style_data', style_baocun_duixiang); // 保存数据到data上
        $elem.removeClass('transition');
        init_gonggong($elem, function () { // 调用公共 init 
            $elem.css(animate_duixiang); // 用参数 传进来 代替 手动
        });
    }

    // 将想要使用的效果 fadeIn fadeOut slideDown slideUp 通过参数传进来 使用
    js_duixiang._xianshi_neibu = function ($canshu, xiaoguoming_canshu) {
        xianshi_gonggong_hanshu($canshu, function () {
            $canshu.stop()[xiaoguoming_canshu](function () {
                $canshu.data('status', 'shown').trigger('shown');
            });
        });
    }
    // animate部分 内部函数
    js_duixiang._xianshi_neibu_animate = function ($canshu, animate_duixiang) {
        xianshi_gonggong_hanshu($canshu, function () {
            var style_data = $canshu.data('style_data');
            // console.log(style_data);
            $canshu.show(); // 显示出来 在做动画
            $canshu.stop().animate(style_data, function () { // 在animate 的回调函数里 发送shown
                $canshu.data('status', 'shown').trigger('shown');
            });
        });
    }

    js_duixiang._yincang_heibu = function ($canshu, xiaoguoming_canshu) {
        yincang_gonggong_hanshu($canshu, function () {
            $canshu.stop()[xiaoguoming_canshu](function () {
                $canshu.data('status', 'hidden003').trigger('hidden003');
            });
        });
    }
    // animate部分 内部函数
    js_duixiang._yincang_heibu_animate = function ($canshu, animate_duixiang) {
        yincang_gonggong_hanshu($canshu, function () {
            //在animate 的回调函数里 调用hide()
            $canshu.stop().animate(animate_duixiang, function () { // animate 的回调函数
                $canshu.hide(); // 先做动画 再完全隐藏
                $canshu.data('status', 'hidden003').trigger('hidden003');
            });
        });
    }


    // 将上面方法整合 通过传参判断使用那种 （fade slideUpDown 等）
    // 定义一个默认对象 里面相对应参数
    var defaults_moren_duixiang = {
        css3_shuxing: false, // 默认不使用css3  这是对象里的属性
        js_shuxing: false, 
        animation_shuxing: 'fade_fangfa' // 默认淡出淡出 第一个方法
    };
    // // 传进来例子  表示使用css3下的 上下卷动效果
    // {
    //     css3_shuxing: true,
    //     js_shuxing: false,
    //     animation_shuxing: 'slideUpDown_fangfa'
    // }

    // 整合一个函数 能够调用上面的所有方法
    function xianshi_yincang_hanshu($canshu, xiaoguoming_canshu) {
        // 将传进来参数 覆盖 defaults 然后赋值给一个新对象
        var xiaoguo_duixiang = $.extend({}, defaults_moren_duixiang, xiaoguoming_canshu);
        // 判断使用 css3、js、slient
        if(xiaoguo_duixiang.css3_shuxing && transition_bianliang.isSupport_shuxing){ // 判断用户传进来css3属性是否为真 和浏览器是否支持transition
            // 在这里执行初始化init  调用上面css下的init 
            css3_duixiang[xiaoguoming_canshu.animation_shuxing].init($canshu);
            // 将方法放到一个对象里返回
            return { // 返回对象
                xianshi_fangfa: css3_duixiang[xiaoguo_duixiang.animation_shuxing].xianshi_hanshu, // 返回css3下的(fade/slide)的显示函数
                yincang_fangfa: css3_duixiang[xiaoguo_duixiang.animation_shuxing].yincang_hanshu
            };
        } else if(xiaoguoming_canshu.js_shuxing){ // 如果js_shuxing 为true 则调用js下的方法
            js_duixiang[xiaoguoming_canshu.animation_shuxing].init($canshu);
            return { // 返回对象
                xianshi_fangfa: js_duixiang[xiaoguo_duixiang.animation_shuxing].xianshi_hanshu, // 返回css3下的(fade/slide)的显示函数
                yincang_fangfa: js_duixiang[xiaoguo_duixiang.animation_shuxing].yincang_hanshu
            };
        } else { // css3和js都传false 则使用 slient下的 方法
            silent_duixiang.init($canshu);
            return {  // 将 slient 方法返回
                xianshi_fangfa: silent_duixiang.xianshi_hanshu,
                yincang_fangfa: silent_duixiang.yincang_hanshu
            };
        }
    }
    // 将xianshi_yincang_hanshu 放到一个window 对象上 在外面调用
    window.mt_duixiang = window.mt_duixiang || {}; 
    window.mt_duixiang.showhide_hanshu = xianshi_yincang_hanshu; // 函数本体

})(jQuery);