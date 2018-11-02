// 封装成一个模块 方便调用
(function ($) {
    'use strict';

    // 将上面代码 封装成一个函数 让想用的对象 传进来 复用
    // optionss 接收
    function dropdown(elem, options) { // 谁想充当下拉菜单 谁传进来 elem 
        // 将传进来elem 转化为 jQuery对象 
        var $elem = $(elem),
            $layer = $elem.find('.dropdown-layer'), // 获取下拉层 它来调用showhide
            activeClass = $elem.data('active') + '-active'; // 提前拼接 获取 menu-active

        $layer.showHide(options); // 使用外面传进来对象
        // // 调用之前需要初始化
        // $layer.showHide({ // 传参 对象
        //     css3: true,
        //     js: true,
        //     // animation: 'fade'
        //     animation: 'slideUpDown' // 该开始没有同步 需要加 overflow: hidden
        // });

        $elem.hover(function () {
            //获得上面 data-active的内容 menu 再加上 -active 形成 data-active
            $elem.addClass(activeClass);
            // 鼠标滑过 调用showhide 的show
            $layer.showHide('show');
        }, function () {
            $elem.removeClass(activeClass);
            $layer.showHide('hide');
        });
    }

    // 默认参数 用户没有传参 使用这里默认的
    var defaults = {
        css3: false,
        js: false,
        animation: 'fade'
    };

    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function (option) { // 在这里接收
            return this.each(function () { // 返回数组中的每一个
                // 使用默认参数 
                var options = $.extend({}, defaults, option);
                dropdown(this, options);
            });
        }
    });

})(jQuery);