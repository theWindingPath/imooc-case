// 封装成一个模块 方便调用
(function ($) {
    'use strict';

    // 使用对象 构造函数重写 dropdown
    function Dropdown(elem, options) { // 构造函数 在大家都还执行的地方传参$elems
        this.$elem = $(elem); // 如果使用var是局部变量 外面show不能用 都用this 传值 
        this.$layer = this.$elem.find('.dropdown-layer');
        this.activeClass = options.active + '-active'; // 例如 menu-active

        this.$layer.showHide(options);

        // 判断一下使用哪种方式
        if(options.event === 'click') {

        }else if(options.event === 'hover') {
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
        }
        // // $.proxy() 改变函数的指向  执行结果还是一个函数 只是改变了里面的this 指向
        // this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
    }

    // js里的函数 本质上是对象
    Dropdown.DEAFAULTS = {  // 用大写模拟一个常量 js里没有常量概念
        event: 'hover',  // 使用哪种触发方式 click
        css3: false,
        js: false,
        animation: 'fade',
        active: 'dropdown'  // 新增一个属性  如果想用menu 这在传参那里写 html
    }; 

    // 在构造函数原型上写
    Dropdown.prototype.show = function () {
        // console.log(this); // this 变成了 DOM元素 期望的 this 应该是dropdown
        this.$elem.addClass(this.activeClass);
        this.$layer.showHide('show');
    };
    Dropdown.prototype.hide = function () {
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    };


    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function (option) { // 在这里接收
            return this.each(function () { // 返回数组中的每一个
                // 使用默认参数 
                console.log($(this).data()); // 将HTML 里所有以 data- 开头的元素获取 如 data-menu 获取为menu 是一个对象
                // var options = $.extend({}, defaults, option);
                var options = $.extend({}, Dropdown.DEAFAULTS, $(this).data(), option);
                new Dropdown(this, options); // 调用方式 new一下构造函数
            });
        }
    });

})(jQuery);