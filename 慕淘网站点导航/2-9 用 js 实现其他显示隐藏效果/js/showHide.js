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
        hide($elem, function () {
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
css3._init = function ($elem, className) {
    $elem.addClass('transition');
    init($elem, function () { // 传回调函数
        $elem.addClass(className);
    });
};
css3._show = function ($elem, className) {
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
css3._hide = function ($elem, className) {
    hide($elem, function () {
        $elem.off('transitionend').one('transitionend', function () { // one 不会累加
            $elem.hide();
            $elem.data('status', 'hidden').trigger('hidden');
        });
        $elem.addClass(className);
    });
};

var js = {
    fade: {
        init: function ($elem) {
            js._init($elem);
        },
        show: function ($elem) {
            js._show($elem, 'fadeIn'); // 传字符串 做参数
        },
        hide: function ($elem) {
            js._hide($elem, 'fadeOut');
        }
    },
    slideUpDown: {
        init: function ($elem) {
            js._init($elem);
        },
        show: function ($elem) {
            js._show($elem, 'slideDown');
        },
        hide: function ($elem) {
            js._hide($elem, 'slideUp');
        }
    },
    slideLeftRight: {
        init: function ($elem) {
            js._customInit($elem, { // 传一个对象过去
                'width': 0,
                'padding-left': 0,
                'padding-right': 0
            });

            // //初始化前 获取 width等属性 padding
            // var styles = {}; // 空对象 保存 属性

            // // styles.width = $elem.css('width');
            // styles['width'] = $elem.css('width');
            // styles['padding-left'] = $elem.css('padding-left'); // 因为有- 没法用. 用[]
            // styles['padding-right'] = $elem.css('padding-right');
            // // styles是局部的 需要保存起来 其他函数才可以使用
            // $elem.data('styles', styles); // 保存数据

            // $elem.removeClass('transition');
            // init($elem, function () { //初始化 隐藏
            //     $elem.css({ // 修改 css样式 jQuery没有封装响应函数 自定义s
            //         'width': 0,
            //         'padding-left': 0,
            //         'padding-right': 0
            //     });
            // });
        },
        show: function ($elem) {
            js._customShow($elem);

            // show($elem, function () { // 调用上面show 和回调
            //     var styles = $elem.data('styles'); //获取

            //     $elem.show();
            //     // 自己做动画 使用 animatie
            //     $elem.stop().animate({
            //         'width': styles['width'],
            //         'padding-left': styles['padding-left'],
            //         'padding-right': styles['padding-right']
            //     }, function () { // 动画执行完毕 在这个回调中
            //         $elem.data('status', 'shown').trigger('shown');
            //     });
            // });
        },
        hide: function ($elem) {
            js._customHide($elem, {
                'width': 0,
                'padding-left': 0,
                'padding-right': 0
            });

            // hide($elem, function () { // 调用上面show 和回调
            //     // 自己做动画 使用 animatie
            //     $elem.stop().animate({
            //         'width': 0,
            //         'padding-left': 0,
            //         'padding-right': 0
            //     }, function () {
            //         $elem.hide();
            //         $elem.data('status', 'hidden').trigger('hidden');
            //     });
            // });
        }
    },
    fadeSlideUpDown: {
        init: function ($elem) {
            js._customInit($elem, { // 传一个对象过去
                'opacity': 0,
                'height': 0,
                'padding-top': 0,
                'padding-down': 0
            });

            // //初始化前 获取 width等属性 padding
            // var styles = {}; // 空对象 保存 属性

            // styles['opacity'] = $elem.css('opacity');
            // // styles.width = $elem.css('width');
            // styles['height'] = $elem.css('height');
            // styles['padding-top'] = $elem.css('padding-top'); // 因为有- 没法用.
            // styles['padding-down'] = $elem.css('padding-down');
            // // styles是局部的 需要保存起来 其他函数才可以使用
            // $elem.data('styles', styles); // 保存数据

            // $elem.removeClass('transition');
            // init($elem, function () { //初始化 隐藏
            //     $elem.css({ // 修改 css样式 jQuery没有封装响应函数 自定义s
            //         'opacity': 0,
            //         'height': 0,
            //         'padding-top': 0,
            //         'padding-down': 0
            //     });
            // });
        },
        show: function ($elem) {
            js._customShow($elem);

            // show($elem, function () { // 调用上面show 和回调
            //     var styles = $elem.data('styles'); //获取

            //     $elem.show();
            //     // 自己做动画 使用 animatie
            //     $elem.stop().animate({
            //         'opacity': styles['opacity'],
            //         'height': styles['height'],
            //         'padding-top': styles['padding-top'],
            //         'padding-bottom': styles['padding-bottom']
            //     }, function () { // 动画执行完毕 在这个回调中
            //         $elem.data('status', 'shown').trigger('shown');
            //     });
            // });
        },
        hide: function ($elem) {
            js._customHide($elem, {
                'opacity': 0,
                'height': 0,
                'padding-top': 0,
                'padding-bottom': 0
            });

            // hide($elem, function () { // 调用上面show 和回调
            //     // 自己做动画 使用 animatie
            //     $elem.stop().animate({
            //         'opacity': 0,
            //         'height': 0,
            //         'padding-top': 0,
            //         'padding-bottom': 0
            //     }, function () {
            //         $elem.hide();
            //         $elem.data('status', 'hidden').trigger('hidden');
            //     });
            // });
        }
    },
    fadeSlideLeftRight: {
        init: function ($elem) {
            js._customInit($elem, { // 传一个对象过去
                'opacity': 0, //在原来基础上多加一个 opacity
                'width': 0,
                'padding-left': 0,
                'padding-right': 0
            });
        },
        show: function ($elem) {
            js._customShow($elem);
        },
        hide: function ($elem) {
            js._customHide($elem, {
                'opacity': 0,
                'width': 0,
                'padding-left': 0,
                'padding-right': 0
            });
        }
    }
};
// js 内部函数 将可以复制的代码提取出来 减少冗余
js._init = function ($elem, hiddenCallback) { // 加一个回调函数
    $elem.removeClass('transition');
    init($elem, hiddenCallback);
};
// 自定义 init
js._customInit = function ($elem, options) {
    //初始化前 获取 width等属性 padding
    var styles = {}; // 空对象 保存 属性
    // 传一个对象进来 options
    // {
    //     'width': 0,
    //     'padding-left':0,
    //     'padding-right':0
    // }
    //遍历赋值
    for (var p in options) {
        styles[p] = $elem.css(p);
    }
    // // styles.width = $elem.css('width');
    // styles['width'] = $elem.css('width');
    // styles['padding-left'] = $elem.css('padding-left'); // 因为有- 没法用.
    // styles['padding-right'] = $elem.css('padding-right');
    // styles是局部的 需要保存起来 其他函数才可以使用
    $elem.data('styles', styles); // 保存数据
    js._init($elem, function () { // 调用上面的 init函数 传一个回调
        $elem.css(options);
    });
    // $elem.removeClass('transition');
    // init($elem, function () { //初始化 隐藏
    //     $elem.css(options);
    //     // $elem.css({ // 修改 css样式 jQuery没有封装响应函数 自定义s
    //     //     'width': 0,
    //     //     'padding-left': 0,
    //     //     'padding-right': 0
    //     // });
    // });
};

// mode 方式 是一个字符串 不能用点 用方括号
js._show = function ($elem, mode) { // mode 对应 jQuery的函数 fadeIn 等
    show($elem, function () {
        $elem.stop()[mode](function () { // 动画触发完毕 再来一个回调 执行这个函数
            $elem.data('status', 'shown').trigger('shown');
        });
    });
};
js._customShow = function($elem) {
    show($elem, function () { // 调用上面show 和回调
        // var styles = $elem.data('styles'); //获取
        $elem.show();
        $elem.stop().animate($elem.data('styles'), function () { // 动画执行完毕 在这个回调中
            $elem.data('status', 'shown').trigger('shown');
        });

        // // 自己做动画 使用 animatie
        // $elem.stop().animate({
        //     'width': styles['width'],
        //     'padding-left': styles['padding-left'],
        //     'padding-right': styles['padding-right']
        // }, function () { // 动画执行完毕 在这个回调中
        //     $elem.data('status', 'shown').trigger('shown');
        // });
    });
};

js._hide = function ($elem, mode) {
    hide($elem, function () {
        $elem.stop()[mode](function () { // 动画触发完毕 再来一个回调 执行这个函数
            $elem.data('status', 'hidden').trigger('hidden');
        });
    });
};
js._customHide = function($elem, options) { // 通过 options改变属性
    hide($elem, function () { // 调用上面show 和回调
        // 自己做动画 使用 animatie
        $elem.stop().animate(options, function () {
            $elem.hide();
            $elem.data('status', 'hidden').trigger('hidden');
        });
    });
}