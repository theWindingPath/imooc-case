// 封装成一个模块 方便调用
(function ($) {
    'use strict';

    // 使用对象 构造函数重写 dropdown
    function Dropdown(elem, options) { // 构造函数 在大家都还执行的地方传参$elems
        this.$elem = $(elem); // 如果使用var是局部变量 外面show不能用 都用this 传值 
        this.options = options; // 将 options 改成通用的 在下面的show 可以使用 局部变量在函数外不可用 变成属性
        this.$layer = this.$elem.find('.dropdown-layer');
        this.activeClass = options.active + '-active'; // 例如 menu-active

        this.$layer.showHide(options);

        // $.proxy(this.show, this)(); // 所有的自动显示

        var self = this;
        // 判断一下使用哪种方式
        if (options.event === 'click') { // click
            // this.$elem.on('click', $.proxy(this.show, this)); // 当proxy()作为参数传递时，里面的this是指向外面的，在这里指向Dropdown，可以调用原型链上的show

            // 绑定事件 点击调用show 展示下拉框
            // this.$elem.on('click', $.proxy(this.show, this));
            // 阻止冒泡 
            this.$elem.on('click', function (e) { // 阻止冒泡需要 e
                self.show(); // 不在参数里，一进入函数里面，这里的this则执行调用者this.$elem，进入局部作用域，所以这里不能直接用this，需要在函数外部保存this到self上
                // $.proxy(self.show, self)(); // 这样可以，self指向Dropdown，Dropdown原型链prototype上有show方法
                // $.proxy(this.show, this)(); // 这样不行，this指向this.$elem，this.$elem上没有show
                // console.log(e)
                e.stopPropagation(); // 阻止事件冒泡
            });
            // 点击空白处隐藏起来 有点小问题 点击马上隐藏 下拉菜单也在 document里 js事件可以冒泡 下面的隐藏也会被触发
            $(document).on('click', $.proxy(this.hide, this)); 

        } else { // 只有两种选择 提高容错率 hover
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this)); // 参数上的this是指向上面的Dropdown，不是指向this.$elem
        }

        // // 判断一下使用哪种方式
        // if(options.event === 'click') {

        // }else if(options.event === 'hover') {
        //     this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
        // }
        // // $.proxy() 改变函数的指向  执行结果还是一个函数 只是改变了里面的this 指向
        // this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
    }

    // js里的函数 本质上是对象
    Dropdown.DEFAULTS = { // 用大写模拟一个常量 js里没有常量概念
        event: 'hover', // 使用哪种触发方式 click
        css3: false,
        js: false,
        animation: 'fade',
        delay: 0, // 延迟显示 默认不需要 为0 不会立展示下拉菜单 停留一点时间展示
        active: 'dropdown' // 新增一个属性  如果想用menu 这在传参那里写 html
    };

    // 在构造函数原型上写
    Dropdown.prototype.show = function () {
        var self = this; // 保存this 在里面的函数用 这里的this 就是dropdown
        // 判断一下有没有delay 有则延迟
        if (this.options.delay) {
            // 显示时候开定时器 延迟显示 delay
            this.timer = setTimeout(function () { // 用timer 接收定时器 在hide 需要清理掉
                _show(); // 调用内部 show
                // self.$elem.addClass(self.activeClass); // 这里面的this 是Windows 的 this 需要在本函数外面保存一下外面的this 然后里面来用
                // self.$layer.showHide('show'); // 这里的 self 指向 dropdown
            }, this.options.delay); // delay 为时间 setTimeout 异步 等待执行 系统排队
        } else { // 没有延迟 直接执行
            _show();
            // self.$elem.addClass(self.activeClass); 
            // self.$layer.showHide('show'); 
        }

        // 创建一个内部执行的函数 封装上面代码
        function _show() {
            self.$elem.addClass(self.activeClass); // 这里面的this 是Windows 的 this 需要在本函数外面保存一下外面的this 然后里面来用
            self.$layer.showHide('show'); // 这里的 self 指向 dropdown
        }

        // // 显示时候开定时器 延迟显示 delay
        // this.timer = setTimeout(function() { // 用timer 接收定时器 在hide 需要清理掉
        //     this.$elem.addClass(this.activeClass);
        //     this.$layer.showHide('show');
        // }, this.options.delay); // delay 为时间 setTimeout 异步 等待执行 系统排队

        // // console.log(this); // this 变成了 DOM元素 期望的 this 应该是dropdown
        // this.$elem.addClass(this.activeClass);
        // this.$layer.showHide('show');
    };
    Dropdown.prototype.hide = function () {
        // 时间没有待够 清理定时器 
        if (this.options.delay) { // 如果有定时器 清理
            clearTimeout(this.timer); // 相当于 划出清理 调用hide 则调用清理
        }
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    };


    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function (option) { // 在这里接收
            return this.each(function () { // 返回数组中的每一个
                // 使用默认参数 
                // console.log($(this).data()); // 将HTML 里所有以 data- 开头的元素获取 如 data-menu 获取为menu 是一个对象
                // var options = $.extend({}, defaults, option);
                var options = $.extend({}, Dropdown.DEFAULTS, $(this).data(), option);
                new Dropdown(this, options); // 调用方式 new一下构造函数
            });
        }
    });

})(jQuery);