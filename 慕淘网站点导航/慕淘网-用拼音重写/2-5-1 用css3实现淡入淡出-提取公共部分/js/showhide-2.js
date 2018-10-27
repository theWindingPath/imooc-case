// 提取公共部分 到一个函数里 大家调用
// 提取 init 公共部分
function init_gonggong($elem, huidiao_hanshu) {
    if ($elem.is(':hidden')) { // 如果元素是 display none 则添加hidden状态
        $elem.data('status', 'hidden003');
        // 回调函数在这里执行 
        if(typeof(huidiao_hanshu) === 'function') huidiao_hanshu();
    } else { //否则添加显示状态
        $elem.data('status', 'shown');
    }
}

// 提取show 公共部分 独有的部分用回调函数来写
function xianshi_gonggong_hanshu($canshu, huidiao_hanshu) {
    if ($canshu.data('status') === 'show') return;
    if ($canshu.data('status') === 'shown') return;
    $canshu.data('status', 'show').trigger('show');

    // 回调函数
    huidiao_hanshu();
}

// 提取hide 公共部分 定义函数
function yincang_gonggong_hanshu($canshu, huidiao_hanshu) {
    if ($canshu.data('status') === 'hide') return;
    if ($canshu.data('status') === 'hidden003') return;
    $canshu.data('status', 'hide').trigger('hide');

    huidiao_hanshu();
}

// 普通显示隐藏
var silent_duixiang = { // 定义对象
    init: function ($elem) {
        // 上一步
        // if ($elem.is(':hidden')) { // is() 判断元素是否隐藏 是则添加隐藏状态
        //     $elem.data('status', 'hidden003');
        // } else { //否则添加显示状态
        //     $elem.data('status', 'shown');
        // }

        // 本次
        init_gonggong($elem);
    },
    xianshi_hanshu: function ($canshu) { // 对象里的方法
        // 上一步
        // if ($canshu.data('status') === 'show') return;
        // if ($canshu.data('status') === 'shown') return; // 如果当前状态为shown 直接返回 退出函数 不再执行后面代码
        // $canshu.data('status', 'show').trigger('show');
        // // 上面公共部分可以提取出 放到一个函数里

        // $canshu.show();
        // $canshu.data('status', 'shown').trigger('shown');

        // 本次
        xianshi_gonggong_hanshu($canshu, function () {
            $canshu.show();
            $canshu.data('status', 'shown').trigger('shown');
        });
    },
    yincang_hanshu: function ($canshu) {
        // 上一步
        // if ($canshu.data('status') === 'hide') return;
        // if ($canshu.data('status') === 'hidden003') return;
        // $canshu.data('status', 'hide').trigger('hide'); // 触发hide事件

        // $canshu.hide();
        // $canshu.data('status', 'hidden003').trigger('hidden003');

        // 本次的
        yincang_gonggong_hanshu($canshu, function () {
            $canshu.hide();
            $canshu.data('status', 'hidden003').trigger('hidden003');
        });
    }
};

// 带效果的显示和隐藏，css3实现方法
var css3_duixiang = {
    fade_fangfa: { // 淡入淡出
        init: function ($elem) {
            // // 上一步
            // $elem.addClass('transition');

            // if ($elem.is(':hidden')) { // 如果元素是 display none 则添加hidden状态
            //     $elem.data('status', 'hidden003');
            //     $elem.addClass('fade-danrudanchu'); // 初始化 如果元素是隐藏 则添加 fade-danrudanchu类
            // } else { //否则添加显示状态
            //     $elem.data('status', 'shown');
            // }

            // 本次的
            $elem.addClass('transition'); // 独有的
            // 调用公共函数
            init_gonggong($elem, function(){
                $elem.addClass('fade-danrudanchu'); // 初始化 如果元素是隐藏 则添加 fade-danrudanchu类
            });
        },
        xianshi_hanshu: function ($canshu) {
            // // 这是上一步的
            // if ($canshu.data('status') === 'show') return;
            // if ($canshu.data('status') === 'shown') return;
            // $canshu.data('status', 'show').trigger('show');

            // $canshu.show();
            // setTimeout(function () {
            //     $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
            // }, 30); // 30毫秒后执行
            // $canshu.off('transitionend').one('transitionend', function () {
            //     $canshu.data('status', 'shown').trigger('shown'); // 还会连着触发下面的hidden 使用off
            // });

            // 这是本次的 调用公共部分 函数
            xianshi_gonggong_hanshu($canshu, function () {
                $canshu.show();
                setTimeout(function () {
                    $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
                }, 30); // 30毫秒后执行
                $canshu.off('transitionend').one('transitionend', function () {
                    $canshu.data('status', 'shown').trigger('shown'); // 还会连着触发下面的hidden 使用off
                });
            });
        },
        yincang_hanshu: function ($canshu) {
            // 上一步
            // if ($canshu.data('status') === 'hide') return;
            // if ($canshu.data('status') === 'hidden003') return;
            // $canshu.data('status', 'hide').trigger('hide');

            // $canshu.addClass('fade-danrudanchu');
            // $canshu.off('transitionend').one('transitionend', function () {
            //     $canshu.hide();
            //     $canshu.data('status', 'hidden003').trigger('hidden003'); // 不会发送hidden003 事件？？？ 
            // });

            // 本次的
            yincang_gonggong_hanshu($canshu, function () {
                $canshu.addClass('fade-danrudanchu');
                $canshu.off('transitionend').one('transitionend', function () {
                    $canshu.hide();
                    $canshu.data('status', 'hidden003').trigger('hidden003'); // 不会发送hidden003 事件？？？ 
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

// 带效果的显示和隐藏，js实现方法
var js_duixiang = {
    fade_fangfa: { // 淡入淡出
        xianshi_hanshu: function () {

        },
        yincang_hanshu: function () {

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