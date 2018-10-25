// 显示隐藏模块
var silent = {
    // 初始化过程
    init: function($elem) {
        // is() 判断是显示还是隐藏
        if($elem.is(':hidden')) {// 为真 是隐藏状态 hidden
            $elem.data('status', 'hidden');
            // console.log($elem.data('status'));
        }else{// 为假 显示状态 shown
            $elem.data('status', 'shown');
            // console.log($elem.data('status'));
        }

    },
    show: function ($elem) {
 
        // 第一次执行前 status 为 undefined 能够突破 if判断
        // 代码执行前 判断状态 如果状态是 show 则不执行代码 直接返回
        if($elem.data('status') === 'show') return;
        if($elem.data('status') === 'shown') return;

        // 设置状态  用data
        $elem.data('status', 'show').trigger('show');
        // console.log($elem.data('status'));
        $elem.show();
        $elem.data('status', 'shown').trigger('shown');

        // console.log($elem.data('status')); // 最后的状态是
    },
    hide: function ($elem) {
        // hide也一样 只执行一次 不会连续执行相同事件
        if($elem.data('status') === 'hide') return;
        if($elem.data('status') === 'hidden') return;

        $elem.data('status', 'hide').trigger('hide');
        $elem.hide();
        $elem.data('status', 'hidden').trigger('hidden');

        // console.log($elem.data('status'));
    }
};
var css3 = {
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
