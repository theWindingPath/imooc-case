// 封装成一个模块 方便调用
(function ($) {
    'use strict';

    // 使用对象 构造函数重写 dropdown
    function Dropdown(elem, options) { // 构造函数 在大家都还执行的地方传参$elems
        // this 应该是实例化new出来的dropdown 可以new多份 每个new出来的对象都有自己的this 都可以访问到原型链上的show hide 方法
        this.$elem = $(elem); // 如果使用var是局部变量 外面show不能用 都用this 传值 
        this.$layer = this.$elem.find('.dropdown-layer');
        // this.activeClass = this.$elem.data('active') + '-active';
        this.activeClass = options.active + '-active'; // 例如 menu-active

        this.$layer.showHide(options);

        // this.defaults = {}; // 将defaults 捞到里面来

        // $.proxy() 改变函数的指向  执行结果还是一个函数 只是改变了里面(里面这两个字是重点，是第一个参数（函数本体）的里面的this)的this 指向
        // $.proxy(this.show, this) proxy第二个参数this是外面new dropdown 的this，第一个参数是函数本体，this.show接收第二参数传进来的this，在函数里面的this不再是this.$elem
        // $.proxy(this.show, this) 执行结果还是返回一个函数，可以作为hover的参数
        // console.log(this.show); // this.show能够找到原型链上的show、hide（Dropdown.prototype.show）
        this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));

        // var self = this; // 用self 保存this这里的this、self是外面的new dropdown
        // this.$elem.hover(function () { //第一种改法
        //     // this.show(); // 这里的this是this.$elem 不是实例化new对象指向的this，this.$elem找不到原型链上的show hide  
        //     self.show(); // self 指向外面this 指向 dropdown
        // }, function () {
        //     self.hide();
        // });

        // this 相当于 dropdown 可以找到show
        // this 变成了前面的 dom元素 改为指向 dropdown
        // this.$elem.hover(this.show, this.hide); // this.show的this是 this.$elem（$(elem)dom节点）， this.$elem找不到 Dropdown.prototype.show，外面的this才找的到 需要在外面保存到self

        // $('#box').click(function() {
        //     console.log(this); // 这里的this 是前面的 #box dom元素
        // });

        // this.show = function() { // 这里this 相当于 下面 dropdown

        // };
        // this.hide = function() { // 每次都会在堆内存中开辟一份空间 来存放函数本体 浪费性能 可以改进

        // };
    }

    // js里的函数 本质上是对象
    Dropdown.DEAFAULTS = {  // 用大写模拟一个常量 js里没有常量概念
        css3: false,
        js: false,
        animation: 'fade',
        active: 'dropdown'  // 新增一个属性  如果想用menu 这在传参那里写 html
    }; 

    // 在构造函数原型prototype上写 这里的show hide不会反复被拷贝副本 避免浪费性能
    // Dropdown实例化的对象 通过原型链查找到show hide
    Dropdown.prototype.show = function () {
        // console.log(this); // this 变成了 DOM元素 期望的 this 应该是实例化new出来的dropdown 可以new多个
        this.$elem.addClass(this.activeClass); // 这里的this应该是指向构造函数实例化new出来的对象，不是dom节点(this.$elem)，需要使用$.proxy(this.show, this)
        this.$layer.showHide('show'); //需要改变这里this指向,才能使用 this.$layer属性，这样是使用不了的this.$elem.$layer（×）
    };
    Dropdown.prototype.hide = function () {
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    };

    // var dropdown1 = new Dropdown(); // 构造函数 通过new 实例化 生成一个对象 用dropdown 保存
    // // 不断实例化出新对象时候  随着每次实例化 上面 this.show this.hide 都还拷贝一份 应该改改可以共用
    // // var dropdown1 = new Dropdown();
    // // var dropdown2 = new Dropdown();
    // // dropdown 作为一个对象 有两个能力 两个方法 show 和 hide
    // dropdown1.show(); // 这里的show 不是 dropdown1自己的 是原型链上的
    // dropdown1.hide();


    // // 默认参数 用户没有传参 使用这里默认的
    // var defaults = {
    //     css3: false,
    //     js: false,
    //     animation: 'fade'
    // };

    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function (option) { // 在这里接收
            return this.each(function () { // 返回数组中的每一个
                // 使用默认参数 
                // console.log($(this).data()); // 将HTML 里所有以 data- 开头的元素获取 如 data-menu 获取为menu 是一个对象
                // var options = $.extend({}, defaults, option);
                var options = $.extend({}, Dropdown.DEAFAULTS, $(this).data(), option);
                new Dropdown(this, options); // 调用方式 new一下构造函数
            });
        }
    });

})(jQuery);