var transition = window.mt.transition;

// 将公共部分提取出来 减少代码冗余
function init($elem, hiddenCallback) {
    // 自动添加对应类 不用手动添加
    // $elem.addClass('transition');
    if ($elem.is(':hidden')) { // 为真 是隐藏状态 hidden
        $elem.data('status', 'hidden');
        if (typeof hiddenCallback === 'function') hiddenCallback();
        // 隐藏时 自动添加 fadeOut 类
        // $elem.addClass('fadeOut'); // 加一个回调函数 有需求 传进来参数
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
            css3._init($elem, 'fadeOut');
        },
        show: function ($elem) {
            css3._show($elem, 'fadeOut');
        },
        hide: function ($elem) {
            css3._hide($elem, 'fadeOut');
        }
    },
    slideUpDown: {
        init: function ($elem) {
            // 计算出高度
            $elem.height($elem.height()); // 将获取到的高度 显性赋予
            css3._init($elem, 'slideUpDownCollapse');
        },
        show: function ($elem) {
            css3._show($elem, 'slideUpDownCollapse');
        },
        hide: function ($elem) {
            css3._hide($elem, 'slideUpDownCollapse');
        }
    },
    slideLeftRight: {
        init: function ($elem) {
            // 变换宽度
            $elem.width($elem.width()); // 将获取到的高度 显性赋予
            css3._init($elem, 'slideLeftRightCollapse');
        },
        show: function ($elem) {
            css3._show($elem, 'slideLeftRightCollapse');
        },
        hide: function ($elem) {
            css3._hide($elem, 'slideLeftRightCollapse');
        }
    },
    fadeSlideUpDown: { // 加两个 class
        init: function ($elem) {
            // 计算出高度
            $elem.height($elem.height()); // 将获取到的高度 显性赋予
            css3._init($elem, 'fadeOut slideUpDownCollapse');
        },
        show: function ($elem) {
            css3._show($elem, 'fadeOut slideUpDownCollapse');
        },
        hide: function ($elem) {
            css3._hide($elem, 'fadeOut slideUpDownCollapse');
        }
    },
    fadeSlideLeftRight: {
        init: function ($elem) {
            // 变换宽度
            $elem.width($elem.width()); // 将获取到的高度 显性赋予
            css3._init($elem, 'fadeOut slideLeftRightCollapse');
        },
        show: function ($elem) {
            css3._show($elem, 'fadeOut slideLeftRightCollapse');
        },
        hide: function ($elem) {
            css3._hide($elem, 'fadeOut slideLeftRightCollapse');
        }
    }
};
// 内部使用 _init
css3._init = function($elem, className) {
    $elem.addClass('transition');
    init($elem, function () { // 传回调函数
        $elem.addClass(className);
    });
};
css3._show = function($elem, className) {
    show($elem, function () {
        $elem.off('transition.end').one('transition.end', function () { // one 只绑定一次
            $elem.data('status', 'shown').trigger('shown');
        });
        $elem.show();
        setTimeout(function () {
            $elem.removeClass(className);
        }, 20);
    });
};
css3._hide = function($elem, className) {
    hide($elem, function() {
        $elem.off('transitionend').one('transitionend', function () { // one 不会累加
            $elem.hide();
            $elem.data('status', 'hidden').trigger('hidden');
        });
        $elem.addClass(className);
    });
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