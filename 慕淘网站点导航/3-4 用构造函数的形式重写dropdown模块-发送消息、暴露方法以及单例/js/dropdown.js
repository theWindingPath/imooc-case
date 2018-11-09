// 封装成一个模块 方便调用
(function ($) {
    'use strict';
    function Dropdown($elem, options) { // 构造函数 在大家都还执行的地方传参$elems
        // console.log(1); // 显示 多次实例化 dropdown 需要使用 单例 保证实例化一次就够
        this.$elem = $elem; // 如果使用var是局部变量 外面show不能用 都用this 传值 
        this.options = options; // 将 options 改成通用的 在下面的show 可以使用 局部变量在函数外不可用 变成属性
        this.$layer = this.$elem.find('.dropdown-layer');
        this.activeClass = options.active + '-active'; // 例如 menu-active

        this._init(); // 调用初始化函数
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

    // 三个构造函数 原型上的方法
    // 创建一个初始化函数 
    Dropdown.prototype._init = function() { // 加下划线 表示提供内部使用 约定的
        var self = this;

        this.$layer.showHide(this.options);
        this.$layer.on('show shown hide hidden', function(e) {
            // console.log(e.type);
            // 将show hide 的消息 转为 dropdown的 转发出去
            self.$elem.trigger('dropdown-' + e.type); // 如果是 show 则变成dropdown-show

        });

        // 判断一下使用哪种方式
        if (this.options.event === 'click') { // click
            this.$elem.on('click', function (e) { // 阻止冒泡需要 e
                self.show();
                e.stopPropagation(); // 阻止事件冒泡
            });
            // 点击空白处隐藏起来 有点小问题 点击马上隐藏 下拉菜单也在 document里 js事件可以冒泡 下面的隐藏也会被触发
            $(document).on('click', $.proxy(this.hide, this));

        } else { // 只有两种选择 提高容错率 hover
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));
        }
    };
    // 在构造函数原型上写
    Dropdown.prototype.show = function () {
        var self = this; // 保存this 在里面的函数用 这里的this 就是dropdown
        // 判断一下有没有delay 有则延迟
        if (this.options.delay) {
            // 显示时候开定时器 延迟显示 delay
            this.timer = setTimeout(function () { // 用timer 接收定时器 在hide 需要清理掉
                _show(); // 调用内部 show
            }, this.options.delay); // delay 为时间 setTimeout 异步 等待执行 系统排队
        } else { // 没有延迟 直接执行
            _show();
        }

        // 创建一个内部执行的函数 封装上面代码
        function _show() {
            self.$elem.addClass(self.activeClass); // 这里面的this 是Windows 的 this 需要在本函数外面保存一下外面的this 然后里面来用
            self.$layer.showHide('show'); // 这里的 self 指向 dropdown
        }
    };
    Dropdown.prototype.hide = function () {
        // 时间没有待够 清理定时器 
        if(this.options.delay) { // 如果有定时器 清理
            clearTimeout(this.timer); // 相当于 划出清理 调用hide 则调用清理
        }
        this.$elem.removeClass(this.activeClass);
        this.$layer.showHide('hide');
    };

    // 使用 jQuery提供的插件
    $.fn.extend({
        // 插件名
        dropdown: function (option) { // 在这里接收 option 默认对象 现在可能是字符串
            return this.each(function () { // 返回数组中的每一个
                var $this = $(this),  // 变成 jQuery 对象
                    dropdown = $this.data('dropdown'), // 以后每次都从 dropdown 的data 里获取
                    options = $.extend({}, Dropdown.DEFAULTS, $this.data(), typeof option === 'object' && option ); //判断option是不是对象 如果不是对象则不会执行
                // 如果不存在，dropdown为undefined，加上!dropdown（为true）， 则实例化
                if(!dropdown) { // 实现单例 判断dropdown 是否存在   
                    $this.data('dropdown', dropdown = new Dropdown($this, options));
                }
                //实例化 保存成对象 使用单例 第一次实例化 保存下来 以后都使用保存下来的值
                // 将dropdown 保存到 dom元素上去
                // this 就是 dom 元素 谁调用它 
                // $(this).data('dropdown', dropdown = new Dropdown(this, option));
                // var dropdown = new Dropdown(this, options); // 调用方式 new一下构造函数

                // if(typeof option === 'string') { // 如果option 是字符串 执行上面 show hide 方法
                //     dropdown[option](); // 将option 当参数 传进来
                // }
                // 增加容错率 判断 是不是 函数 
                if(typeof dropdown[option] === 'function') { // 如果option 是字符串(传show参数进来) 执行上面 show hide 方法
                    dropdown[option](); // 将option 当参数 传进来
                }
            });
        }
    });

})(jQuery);