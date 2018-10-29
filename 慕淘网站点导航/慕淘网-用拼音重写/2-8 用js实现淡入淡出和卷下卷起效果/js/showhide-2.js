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
            // // 使用jQuery 封装好的 fadeIn 和 fadeOut 函数 显示淡入淡出
            // $canshu.fadeIn();

            // 调用上面 公共部分的 显示 隐藏函数 发送消息 show shown 
            xianshi_gonggong_hanshu($canshu, function () {
                // // 使用jQuery 封装好的 fadeIn 和 fadeOut 函数 显示淡入淡出
                // $canshu.fadeIn();

                // // 使用stop() 暂停之前的动画 在执行当前的
                // $canshu.stop().fadeIn();

                // //  显示完成发送 shown
                // $canshu.data('status', 'shown').trigger('shown');

                // 将发送 shown 放到 fadeIn的回调函数里执行
                $canshu.stop().fadeIn(function(){
                    $canshu.data('status', 'shown').trigger('shown'); 
                });
            });

        },
        yincang_hanshu: function ($canshu) {
            // $canshu.fadeOut();

            yincang_gonggong_hanshu($canshu, function(){
                // $canshu.stop().fadeOut();
                // $canshu.data('status', 'hidden003').trigger('hidden003');

                $canshu.stop().fadeOut(function(){
                    $canshu.data('status', 'hidden003').trigger('hidden003');
                });
            });
        }
    },
    slideUpDown_fangfa: { // 上下滚动
        xianshi_hanshu: function () {

        },
        yincang_hanshu: function () {

        }
    },
    slideLeftRight_fangfa: { // 左右滚动
        xianshi_hanshu: function () {

        },
        yincang_hanshu: function () {

        }
    },
    fadeslideUpDown_fangfa: { // 淡入淡出上下滚动
        xianshi_hanshu: function () {

        },
        yincang_hanshu: function () {

        }
    },
    fadeslideLeftRight_fangfa: { // 淡入淡出左右滚动
        xianshi_hanshu: function () {

        },
        yincang_hanshu: function () {

        }
    }
};