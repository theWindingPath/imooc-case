(function ($) {
    function XIALA_GOUZHAO_HANSHU(canshu, $canshu_xiaoguo) {
        this.$this_jq_dx = $(canshu); // var定义局部变量，在原型链上的show、hide方法使用不了，
        this.$canshu_xiaoguo = $canshu_xiaoguo; // 一进来就保存,在其他函数里才可以通过this使用$canshu_xiaoguo
        this.activeClass_bianlian = $canshu_xiaoguo.activeshuxing + '-active'; // 使用传进来的对象上的属性
        this.$xialaceng = this.$this_jq_dx.find('.dropdown-layer');

        // 调用初始化函数init
        this._init_neibu();

        // // 将下面这部分代码封装成内部init函数
        // this.$xialaceng.xianshi_yincang_chajian($canshu_xiaoguo);
        // var self = this; // 在函数外保存this，里面用

        // if ($canshu_xiaoguo.event_shuxing === 'click_fangshi') { // 如果用户想用click_fangshi
        //     this.$this_jq_dx.on('click', function (e003) {
        //         self.xianshi_yuanxingliang_fangfa(); // 调用show,下拉层展开
        //         e003.stopPropagation(); // 阻止事件冒泡
        //     });
        //     $(document).on('click', function () {
        //         self.yincang_yuanxingliang_fangfa(); // 由于事件冒泡，
        //     });
        // } else { // 用户想用hover，传错也是用hover，提高容错率
        //     this.$this_jq_dx.hover($.proxy(this.xianshi_yuanxingliang_fangfa, this), $.proxy(this.yincang_yuanxingliang_fangfa, this));
        // }
    }

    XIALA_GOUZHAO_HANSHU.prototype._init_neibu = function () {
        var self = this; // 在函数外保存this，里面用
        this.$xialaceng.xianshi_yincang_chajian(this.$canshu_xiaoguo);

        // 发送消息，绑定接收trigger消息的事件
        this.$this_jq_dx.on('show shown hide hidden003', function (e) {
            // console.log(e.type); // 打印触发事件的类似 show hide

            // 发送新的消息到外部，html接收
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
        _xianshi_neibu_hanshu = function () {
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
        xiala_chajian: function ($canshu_xiaoguo) { // $canshu_xiaoguo接收传进来的对象
            return this.each(function () {
                // var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), $canshu_xiaoguo);

                // // 需要判断一下$canshu_xiaoguo，
                // var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), typeof $canshu_xiaoguo === 'object' && $canshu_xiaoguo);

                // // new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang); // this为谁调用xiala_chajian，则指向谁,dropdown调用，指向dropdown

                // // // 定义一个变量来接收 new 出来的对象
                // // var xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang);  // 没有使用单例，现在随着点击的重复，会重复new出来很多对象(随着点击按钮增加，每次点击发送的消息增多)，浪费性能

                // // 使用单例模式，
                // var $this_jq_dx = $(this); // 将this保存为jQuery对象，才可以使用jQuery的data方法
                // // 在new之前从data上获取，如果之前已经new过
                // var xiala_new_duixiang = $this_jq_dx.data('xiala_new_duixiang');

                // 调整一下顺序
                var $this_jq_dx = $(this);
                var xiala_new_duixiang = $this_jq_dx.data('xiala_new_duixiang');
                var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), typeof $canshu_xiaoguo === 'object' && $canshu_xiaoguo);

                if (!xiala_new_duixiang) { 
                    $this_jq_dx.data('xiala_new_duixiang',xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU($this_jq_dx, xuanxiang_duixiang));
                }


                // // 判断，如果data上没有，则new
                // if (!xiala_new_duixiang) { // 为假才做
                //     // xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang);
                //     xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU($this_jq_dx, xuanxiang_duixiang);
                //     // 将new出来对象保存到$.data()里
                //     $this_jq_dx.data('xiala_new_duixiang', xiala_new_duixiang);
                // }

                // xiala_new_duixiang = new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang);
                // // 将new出来对象保存到$.data()里
                // this.data('xiala_new_duixiang', xiala_new_duixiang);

                // 暴露方法，判断如果XIALA_GOUZHAO_HANSHU[$canshu_xiaoguo]是函数，则执行
                // console.log(typeof (this.xianshi_yuanxingliang_fangfa)) // 这不是函数  打印undefined
                // console.log(typeof (xiala_new_duixiang.xianshi_yuanxingliang_fangfa)) // 这才是函数
                if (typeof xiala_new_duixiang[$canshu_xiaoguo] === 'function') {
                    // console.log(1)
                    xiala_new_duixiang[$canshu_xiaoguo](); //执行函数
                }
            });
        }
    });

})(jQuery);