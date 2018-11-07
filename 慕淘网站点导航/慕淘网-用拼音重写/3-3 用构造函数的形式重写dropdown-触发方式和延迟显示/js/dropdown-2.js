(function ($) {
    function XIALA_GOUZHAO_HANSHU(canshu, $canshu_xiaoguo) {
        this.$this_jq_dx = $(canshu); // var定义局部变量，在原型链上的show、hide方法使用不了，
        this.activeClass_bianlian = $canshu_xiaoguo.activeshuxing + '-active'; // 使用传进来的对象上的属性
        this.$xialaceng = this.$this_jq_dx.find('.dropdown-layer');

        this.$xialaceng.xianshi_yincang_chajian($canshu_xiaoguo);
        // this.$this_jq_dx.hover($.proxy(this.xianshi_yuanxingliang_fangfa, this), $.proxy(this.yincang_yuanxingliang_fangfa, this)); // proxy第二个参数this是外面的、指向XIALA_GOUZHAO_HANSHU

        var self = this; // 在函数外保存this，里面用
        // 添加选项click触发下拉层方式，用户有两种选择hover、和click
        // if判断使用click还是hover
        if ($canshu_xiaoguo.event_shuxing === 'click_fangshi') { // 如果用户想用click_fangshi
            // 绑定事件，点击下拉按钮，下拉层展开
            this.$this_jq_dx.on('click', function (e003) {
                self.xianshi_yuanxingliang_fangfa(); // 调用show,下拉层展开
                e003.stopPropagation();   // 阻止事件冒泡
            });

            // 点击空白处，隐藏下拉层
            $(document).on('click', function () {
                self.yincang_yuanxingliang_fangfa(); // 由于事件冒泡，
            });

        } else { // 用户想用hover，传错也是用hover，提高容错率
            this.$this_jq_dx.hover($.proxy(this.xianshi_yuanxingliang_fangfa, this), $.proxy(this.yincang_yuanxingliang_fangfa, this));
        }
    }

    XIALA_GOUZHAO_HANSHU.prototype.xianshi_yuanxingliang_fangfa = function () {
        this.$this_jq_dx.addClass(this.activeClass_bianlian); //通过使用实例化XIALA_GOUZHAO_HANSHU出来对象上属性调用函数，
        this.$xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
    };

    XIALA_GOUZHAO_HANSHU.prototype.yincang_yuanxingliang_fangfa = function () {
        this.$this_jq_dx.removeClass(this.activeClass_bianlian);
        this.$xialaceng.xianshi_yincang_chajian('yincang_fangfa');
    };

    XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN = { // 全大写DEFAULTS_MOREN，约定表示为默认参数
        css3_shuxing: false, // 默认不使用css3  这是对象里的属性
        js_shuxing: false,
        animation_shuxing: 'fade_fangfa', // 默认淡出淡出 第一个方法
        activeshuxing: 'dropdown', // 添加一个默认属性为active,可以改为其他：menu

        event_shuxing: 'hover' // 多一个click触发方式，默认hover
    };

    // jquery插件
    $.fn.extend({
        xiala_chajian: function ($canshu_xiaoguo) { // $canshu_xiaoguo接收传进来的对象
            return this.each(function () {
                var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), $canshu_xiaoguo);
                new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang); // this为谁调用xiala_chajian，则指向谁,dropdown调用，指向dropdown
            });
        }
    });

})(jQuery);