var transition = window.mt.transition;

// 将公共部分提取出来 减少代码冗余
function init($elem, hiddenCallback) {
    // 自动添加对应类 不用手动添加
    // $elem.addClass('transition');
    if ($elem.is(':hidden')) { // 为真 是隐藏状态 hidden
        $elem.data('status', 'hidden');
        if (typeof hiddenCallback === 'function') hiddenCallback();
        // 隐藏时 自动添加 fadeOut 类
        $elem.addClass('fadeOut'); // 加一个回调函数 有需求 传进来参数
    } else { // 为假 显示状态 shown
        $elem.data('status', 'shown');
    }
}

function show($elem, callback) { // 不一样添加回调 各写个的
    if ($elem.data('status') === 'show') return;
    if ($elem.data('status') === 'shown') return;
    $elem.data('status', 'show').trigger('show');
    callback(); // 直接执行
}

function hide($elem, callback) {
    if ($elem.data('status') === 'hide') return;
    if ($elem.data('status') === 'hidden') return;
    $elem.data('status', 'hide').trigger('hide');
    callback(); 
}


// 显示隐藏模块
var silent = {
    // 初始化过程
    // init: function ($elem) {
    //     // is() 判断是显示还是隐藏
    //     if ($elem.is(':hidden')) { // 为真 是隐藏状态 hidden
    //         $elem.data('status', 'hidden');
    //     } else { // 为假 显示状态 shown
    //         $elem.data('status', 'shown');
    //     }

    // },
    init: init,
    show: function ($elem) {
        show($elem, function () {
            $elem.show();
            $elem.data('status', 'shown').trigger('shown');
        });

        // // 第一次执行前 status 为 undefined 能够突破 if判断
        // // 代码执行前 判断状态 如果状态是 show 则不执行代码 直接返回
        // if ($elem.data('status') === 'show') return;
        // if ($elem.data('status') === 'shown') return;

        // // 设置状态  用data
        // $elem.data('status', 'show').trigger('show');
        // $elem.show();
        // $elem.data('status', 'shown').trigger('shown');
    },
    hide: function ($elem) {
        hide($elem, function() {
            $elem.hide();
            $elem.data('status', 'hidden').trigger('hidden');
        });

        // // hide也一样 只执行一次 不会连续执行相同事件
        // if ($elem.data('status') === 'hide') return;
        // if ($elem.data('status') === 'hidden') return;

        // $elem.data('status', 'hide').trigger('hide');
        // $elem.hide();
        // $elem.data('status', 'hidden').trigger('hidden');
    }
};
var css3 = {
    fade: {
        init: function ($elem) {
            // 自动添加对应类 不用手动添加
            $elem.addClass('transition');
            init($elem, function () { // 传回调函数
                $elem.addClass('fadeOut');
            });
            // // is() 判断是显示还是隐藏
            // if ($elem.is(':hidden')) { // 为真 是隐藏状态 hidden
            //     $elem.data('status', 'hidden');
            //     // 隐藏时 自动添加 fadeOut 类
            //     $elem.addClass('fadeOut');
            // } else { // 为假 显示状态 shown
            //     $elem.data('status', 'shown');
            // }
        },
        show: function ($elem) {
            show($elem, function () {
                $elem.off('transition.end').one('transition.end', function () { // one 只绑定一次
                    $elem.data('status', 'shown').trigger('shown');
                });
                $elem.show();
                setTimeout(function () {
                    $elem.removeClass('fadeOut');
                }, 20);
            });
            // if ($elem.data('status') === 'show') return;
            // if ($elem.data('status') === 'shown') return;

            // $elem.data('status', 'show').trigger('show');

            // 触发事件
            // $elem.trigger('show');
            // $elem.on('transitionend', function() { // on 每次都触发事件 可以改为one
            //     $elem.data('status', 'shown').trigger('shown');
            // });
            // off() 在绑定之前 off掉
            $elem.off('transition.end').one('transition.end', function () { // one 只绑定一次
                $elem.data('status', 'shown').trigger('shown');
            });
            // 先show 在变化 
            // 打破同步执行 改为异步
            $elem.show();
            setTimeout(function () {
                $elem.removeClass('fadeOut');
            }, 20);
            // $elem.css({
            //     'visibility': 'visible',
            //     'opacity': 1
            // });
        },
        hide: function ($elem) {
            hide($elem, function() {
                $elem.off('transitionend').one('transitionend', function () { // one 不会累加
                    $elem.hide();
                    $elem.data('status', 'hidden').trigger('hidden');
                });
                $elem.addClass('fadeOut');
            });

            // if ($elem.data('status') === 'hide') return;
            // if ($elem.data('status') === 'hidden') return;

            // $elem.data('status', 'hide').trigger('hide');

            // // $elem.trigger('hide');
            // $elem.off('transitionend').one('transitionend', function () { // one 不会累加
            //     $elem.hide();
            //     $elem.data('status', 'hidden').trigger('hidden');
            // });
            // $elem.addClass('fadeOut');
        }

    },
    slideUpDown: {
        show: function () {

        },
        hide: function () {

        }

    },
    slideLeftRight: {
        show: function () {

        },
        hide: function () {

        }

    },
    fadeSlideUpDown: {
        show: function () {

        },
        hide: function () {

        }
    },
    fadeSlideLeftRight: {
        show: function () {

        },
        hide: function () {

        }
    }
};
var js = {
    fade: {
        show: function () {

        },
        hide: function () {

        }
    },
    slideUpDown: {
        show: function () {

        },
        hide: function () {

        }
    },
    slideLeftRight: {
        show: function () {

        },
        hide: function () {

        }
    },
    fadeSlideUpDown: {
        show: function () {

        },
        hide: function () {

        }
    },
    fadeSlideLeftRight: {
        show: function () {

        },
        hide: function () {

        }
    }
};