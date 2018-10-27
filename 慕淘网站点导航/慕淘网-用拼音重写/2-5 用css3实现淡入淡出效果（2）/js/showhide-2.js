// 普通显示隐藏
var silent_duixiang = { // 定义对象
    init: function ($elem) {
        if ($elem.is(':hidden')) { // is() 判断元素是否隐藏 是则添加隐藏状态
            $elem.data('status', 'hidden003');
        } else { //否则添加显示状态
            $elem.data('status', 'shown');
        }
    },
    xianshi_hanshu: function ($canshu) { // 对象里的方法
        if ($canshu.data('status') === 'shown') return; // 如果当前状态为shown 直接返回 退出函数 不再执行后面代码
        // 给元素添加状态
        $canshu.data('status', 'show').trigger('show');
        $canshu.show();
        $canshu.data('status', 'shown').trigger('shown');
    },
    yincang_hanshu: function ($canshu) {
        if ($canshu.data('status') === 'hidden003') return;
        $canshu.data('status', 'hide').trigger('hide'); // 触发hide事件
        $canshu.hide();
        $canshu.data('status', 'hidden003').trigger('hidden003');
    }
};

// 带效果的显示和隐藏，css3实现方法
var css3_duixiang = {
    fade_fangfa: { // 淡入淡出
        // // init 初始化 阻止刚开始的重复触发
        // init: function ($elem) {
        //     if ($elem.is(':hidden')) { // 如果元素是 display none 则添加hidden状态
        //         $elem.data('status', 'hidden003');
        //     } else { //否则添加显示状态
        //         $elem.data('status', 'shown');
        //     }
        // },

        // 初始化 自动添加 transition类 和 fadeout类 不用手动添加了
        init: function ($elem) {
            // 初始化自动添加transition类
            $elem.addClass('transition');
            if ($elem.is(':hidden')) { // 如果元素是 display none 则添加hidden状态
                $elem.data('status', 'hidden003');
                $elem.addClass('fade-danrudanchu'); // 初始化 如果元素是隐藏 则添加 fade-danrudanchu类
            } else { //否则添加显示状态
                $elem.data('status', 'shown');
            }
        },
        xianshi_hanshu: function ($canshu) {
            // 这是上一步的
            // $canshu.trigger('show');
            // $canshu.show();
            // setTimeout(function () {
            //     $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
            // }, 30); // 30毫秒后执行
            // $canshu.on('transitionend', function() {
            //     $canshu.trigger('shown');  // 会发送两次 累加 有些bug？？？
            // });

            //这是本次修改的
            // $canshu.trigger('show');

            // 判断 如果状态status 为show shown 直接返回 不执行后面代码
            if ($canshu.data('status') === 'show') return;
            if ($canshu.data('status') === 'shown') return;

            // 在发送trigger 前 添加 $.data('status','shown') 阻止重复触发
            $canshu.data('status', 'show').trigger('show');
            // console.log($canshu.data('status')); // 添加成功

            $canshu.show();
            setTimeout(function () {
                $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
            }, 30); // 30毫秒后执行
            // $canshu.on('transitionend', function() {
            //     $canshu.trigger('shown');  // 会发送两次 累加 有些bug？？？
            // })
            // // 将on 改为one 只触发一次
            // $canshu.one('transitionend', function() {
            //     $canshu.trigger('shown');  // 还会连着触发下面的hidden 使用off
            // });

            // 使用off 先清除旧的 在添加新的
            $canshu.off('transitionend').one('transitionend', function () {
                $canshu.data('status', 'shown').trigger('shown'); // 还会连着触发下面的hidden 使用off
            });
        },
        yincang_hanshu: function ($canshu) {
            // 这是上次的
            // $canshu.trigger('hide');
            // $canshu.addClass('fade-danrudanchu');
            // setTimeout(function () {
            //     $canshu.hide();
            // }, 300); //300毫秒后隐藏
            // $canshu.on('transitionend', function() {
            //     $canshu.trigger('hidden003');  // 不会发送hidden003 事件？？？
            // });

            // 这是本次的
            if ($canshu.data('status') === 'hide') return;
            if ($canshu.data('status') === 'hidden003') return;

            $canshu.data('status', 'hide').trigger('hide');
            $canshu.addClass('fade-danrudanchu');
            // setTimeout(function () {
            //     $canshu.hide();
            // }, 300); //300毫秒后隐藏
            // $canshu.on('transitionend', function() {
            //     $canshu.trigger('hidden003');  // 不会发送hidden003 事件？？？
            // });

            $canshu.off('transitionend').one('transitionend', function () {
                // 将hide() 放进来 hidden发送成功
                // transition css3属性变化完成 会触发 transitionend事件 
                // 然后执行里面这里的hide() 可以代替settimneout
                $canshu.hide();
                $canshu.data('status', 'hidden003').trigger('hidden003'); // 不会发送hidden003 事件？？？ 
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