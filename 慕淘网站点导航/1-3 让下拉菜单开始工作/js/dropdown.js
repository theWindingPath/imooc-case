// 封装成一个模块 方便调用
(function ($) {
    'use strict';

    // 将上面代码 封装成一个函数 让想用的对象 传进来 复用
    function dropdown(elem) { // 谁想充当下拉菜单 谁传进来 elem
        // 将传进来elem 转化为 jQuery对象 
        var $elem = $(elem),
            activeClass = $elem.data('active') + '-active'; // 提前拼接 获取 menu-active

        $elem.hover(function () {
            //获得上面 data-active的内容 menu 再加上 -active 形成 data-active
            $elem.addClass(activeClass);
        }, function () {
            $elem.removeClass(activeClass);
        });
    }

    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function () {
            return this.each(function () { // 返回数组中的每一个
                dropdown(this);
            });
        }
    });

    $('.dropdown').dropdown(); //相当于 this

})(jQuery);


// // 将上面代码 封装成一个函数 让想用的对象 传进来 复用
// function dropdown(elem) { // 谁想充当下拉菜单 谁传进来 elem
//     // 将传进来elem 转化为 jQuery对象 
//     var $elem = $(elem),
//         activeClass = $elem.data('active') + '-active'; // 提前拼接 获取 menu-active

//     $elem.hover(function () {
//         //获得上面 data-active的内容 menu 再加上 -active 形成 data-active
//         $elem.addClass(activeClass);
//     }, function () {
//         $elem.removeClass(activeClass);
//     });
// }

// // 使用 jQuery提供的插件
// $.fn.extend({
//     // 插件名
//     dropdown: function () {
//         return this.each(function () { // 返回数组中的每一个
//             dropdown(this);
//         });
//     }
// });

// $('.dropdown').dropdown(); //相当于 this