// 放到js里 使用$.data('status') jQuery属性 解决重复触发事件
// 普通显示隐藏
var silent_duixiang = { // 定义对象
    // 初始化显示隐藏状态 阻止刚开始的重复触发 添加init方法
    init: function ($elem) {
        if ($elem.is(':hidden')) { // is() 判断元素是否隐藏 是则添加隐藏状态
            $elem.data('status', 'hidden003');
        } else { //否则添加显示状态
            $elem.data('status', 'shown');
        }
    },

    // on绑定 show shown hide hidden 事件 trigger() 来触发 相当于click事件 需要点击触发
    xianshi_hanshu: function ($canshu) { // 对象里的方法
        // // 上一步方法
        // $canshu.trigger('show'); // 触发show事件
        // $canshu.show();
        // $canshu.trigger('shown');

        // 在调用前判断状态，解决重复触发事件
        if ($canshu.data('status') === 'shown') return; // 如果当前状态为shown 直接返回 退出函数 不再执行后面代码

        // 给元素添加状态
        $canshu.data('status', 'show').trigger('show');
        // console.log($canshu.data('status')); // 打印当前状态 成功添加状态
        $canshu.show();
        $canshu.data('status', 'shown').trigger('shown');
    },
    yincang_hanshu: function ($canshu) {
        // // 上一步方法
        // $canshu.trigger('hide'); // 触发hide事件
        // $canshu.hide();
        // $canshu.trigger('hidden003'); // 事件名可以自定义 

        // 在调用前判断状态，解决重复触发事件
        if ($canshu.data('status') === 'hidden003') return;

        // 给元素添加状态
        $canshu.data('status', 'hide').trigger('hide'); // 触发hide事件
        $canshu.hide();
        $canshu.data('status', 'hidden003').trigger('hidden003');
    }
};

// 带效果的显示和隐藏，css3实现方法
var css3_duixiang = {
    fade_fangfa: { // 淡入淡出
        xianshi_hanshu: function ($canshu) {
            // $canshu.css({ // 将css样式提出 到一个class里 通过添加addClass修改css样式
            //     'opacity': '1',  // 将透明度设为1 显示出来 配合transition 实现淡入淡出s
            //     'visibility': 'visible'
            // });

            // show前发送事件show
            $canshu.trigger('show');

            // 将元素show display block  先show 再改变 opacity 
            $canshu.show();
            //  settimeout 设置异步执行  打破同步
            setTimeout(function () {
                // 通过添加删除class来实现修改css样式
                $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除
            }, 30); // 30毫秒后执行

            // show之后发送时间 shown 
            // 使用css3 的transitionend 时间 tansition 后会触发
            $canshu.on('transitionend', function() {
                $canshu.trigger('shown');  // 会发送两次 累加 有些bug？？？
            });

            // // 通过添加删除class来实现修改css样式
            // $canshu.removeClass('fade-danrudanchu'); // 将透明度为0 的类移除

            // $canshu.show();
        },
        yincang_hanshu: function ($canshu) {
            // $canshu.hide();
            // $canshu.css({
            //     'opacity': '0',  // 将透明度设为1 显示出来 配合transition 实现淡入淡出s
            //     'visibility': 'hidden'
            // });

            // $canshu.addClass('fade-danrudanchu'); // 添加 
            // // 添加类后 将 display 设置为 none
            // $canshu.hide();

            $canshu.trigger('hide');

            // 打破同步 先改变透明度 opacity 为0 再hide （300毫秒后hide） 
            // 通过添加删除class来实现修改css样式
            $canshu.addClass('fade-danrudanchu');
            setTimeout(function () {
                $canshu.hide();
            }, 300); //300毫秒后隐藏

            $canshu.on('transitionend', function() {
                $canshu.trigger('hidden003');  // 不会发送hidden003 事件？？？
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