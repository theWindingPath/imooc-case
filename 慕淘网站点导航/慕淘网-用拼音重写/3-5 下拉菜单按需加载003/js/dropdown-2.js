(function ($) {
    'use strict' // 使用use strict（严格模式） 浏览器会提示一些错误

    function XIALA_GOUZHAO_HANSHU(canshu, $canshu_xiaoguo) { //console.log(1)
        // this.$this_jq_dx = $(canshu); // var定义局部变量，在原型链上的show、hide方法使用不了，
        // 不需要包$(),直接传
        this.$this_jq_dx = canshu;
        this.$canshu_xiaoguo = $canshu_xiaoguo; // 一进来就保存,在其他函数里才可以通过this使用$canshu_xiaoguo
        this.activeClass_bianlian = $canshu_xiaoguo.activeshuxing + '-active'; // 使用传进来的对象上的属性
        this.$xialaceng = this.$this_jq_dx.find('.dropdown-layer');

        this._init_neibu();
    }

    XIALA_GOUZHAO_HANSHU.prototype._init_neibu = function () {
        var self = this; // 在函数外保存this，里面用
        this.$xialaceng.xianshi_yincang_chajian(this.$canshu_xiaoguo);

        // this.$this_jq_dx.on('show shown hide hidden003', function (e) {
        //     self.$this_jq_dx.trigger('dropdown-' + e.type); // 字符串拼接成 dropdown-show dropdown-hide等 
        // });

        // 是下拉层来接收 消息的
        this.$xialaceng.on('show shown hide hidden003', function (e) {
            self.$this_jq_dx.trigger('dropdown-' + e.type); // 字符串拼接成 dropdown-show dropdown-hide等 
        });

        if (this.$canshu_xiaoguo.event_shuxing === 'click_fangshi') { // 如果用户想用click_fangshi
            this.$this_jq_dx.on('click', function (e003) {
                self.xianshi_yuanxingliang_fangfa(); // 调用show,下拉层展开
                e003.stopPropagation(); // 阻止事件冒泡
            });
            $(document).on('click', function () {
                self.yincang_yuanxingliang_fangfa(); // 由于事件冒泡，
            });
        } else { // 用户想用hover，传错也是用hover，提高容错率
            this.$this_jq_dx.hover($.proxy(this.xianshi_yuanxingliang_fangfa, this), $.proxy(this.yincang_yuanxingliang_fangfa, this));
        }
    };
    XIALA_GOUZHAO_HANSHU.prototype.xianshi_yuanxingliang_fangfa = function () {
        var self = this;
        if (this.$canshu_xiaoguo.delay_shuxing) { // 如果delay_shuxing有传
            this.timer_dingshiqi = setTimeout(function () {
                _xianshi_neibu_hanshu();
            }, this.$canshu_xiaoguo.delay_shuxing); // 延迟1000毫秒后显示
        } else { // 没有传，默认为0，则直接显示
            _xianshi_neibu_hanshu();
        }
        // _xianshi_neibu_hanshu = function () {
        //     self.$this_jq_dx.addClass(self.activeClass_bianlian);
        //     self.$xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
        // }

        // 改变定义函数写法
        function _xianshi_neibu_hanshu() {
                self.$this_jq_dx.addClass(self.activeClass_bianlian);
                self.$xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
        }
    };

    XIALA_GOUZHAO_HANSHU.prototype.yincang_yuanxingliang_fangfa = function () {
        if (this.$canshu_xiaoguo.delay_shuxing) {
            clearTimeout(this.timer_dingshiqi);
        }
        this.$this_jq_dx.removeClass(this.activeClass_bianlian);
        this.$xialaceng.xianshi_yincang_chajian('yincang_fangfa');
    };

    XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN = { // 全大写DEFAULTS_MOREN，约定表示为默认参数
        css3_shuxing: true, // 默认不使用css3  这是对象里的属性
        js_shuxing: true,
        animation_shuxing: 'fade_fangfa', // 默认淡出淡出 第一个方法
        activeshuxing: 'dropdown', // 添加一个默认属性为active,可以改为其他：menu

        event_shuxing: 'hover', // 多一个click触发方式，默认hover
        delay_shuxing: 100 // 是否使用延迟显示，默认不使用
    };

    // jquery插件
    $.fn.extend({
        xiala_chajian: function ($canshu_xiaoguo_001) { // $canshu_xiaoguo接收传进来的对象
            return this.each(function () {
                var $this_jq_dx = $(this);
                var xiala_new_duixiang = $this_jq_dx.data('xiala_new_duixiang');
                var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), typeof $canshu_xiaoguo_001 === 'object' && $canshu_xiaoguo_001);

                if (!xiala_new_duixiang) {
                    $this_jq_dx.data('xiala_new_duixiang', xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU($this_jq_dx, xuanxiang_duixiang));
                }

                if (typeof xiala_new_duixiang[$canshu_xiaoguo_001] === 'function') {
                    // console.log(1)
                    xiala_new_duixiang[$canshu_xiaoguo_001](); //执行函数
                }
            });
        }
    });

})(jQuery);