(function ($) {
    // // 33333插件方式 使用 jQuery提供的 extend() 将自定义函数 转化为jQuery 插件
    // function xiala_hanshu(canshu, $canshu_xiaoguo) { // 定义函数 带一个参数
    //     var $this_jq_dx = $(canshu); // 将缓存变量 提到函数外面
    //     var activeClass_bianlian = $this_jq_dx.data('active') + '-active';

    //     // 获取要被显示的下拉层
    //     var $xialaceng = $this_jq_dx.find('.dropdown-layer');

    //     // 初始化
    //     $xialaceng.xianshi_yincang_chajian($canshu_xiaoguo);

    //     // 发送消息
    //     $xialaceng.on('show shown hide hidden003', function (e) {
    //         console.log(e.type); // 打印触发事件的类似 show hide
    //     });

    //     $this_jq_dx.hover(function () {
    //         $this_jq_dx.addClass(activeClass_bianlian);
    //         $xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
    //     }, function () {
    //         $this_jq_dx.removeClass(activeClass_bianlian);
    //         $xialaceng.xianshi_yincang_chajian('yincang_fangfa');
    //     });
    // }

    // 将上面的 xiala_hanshu改写成构造函数方式
    function XIALA_GOUZHAO_HANSHU(canshu, $canshu_xiaoguo) {
        // 将变量放到this上，变成XIALA_GOUZHAO_HANSHU的属性，函数即对象，
        this.$this_jq_dx = $(canshu); // var定义局部变量，在原型链上的show、hide方法使用不了，
        // this.activeClass_bianlian = this.$this_jq_dx.data('active') + '-active';

        // 使用新添加属性 active（dropdown、menu）
        // this.activeClass_bianlian = XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN.active_shuxing + '-active'; //这样使用的只是默认的dropdown，没有用到传进来的menu
        this.activeClass_bianlian = $canshu_xiaoguo.activeshuxing + '-active'; // 使用传进来的对象上的属性
        // console.log($canshu_xiaoguo);

        // 获取要被显示的下拉层
        this.$xialaceng = this.$this_jq_dx.find('.dropdown-layer');

        // 在这里使用$canshu_xiaoguo初始化函数xianshi_yincang_chajian
        this.$xialaceng.xianshi_yincang_chajian($canshu_xiaoguo);

        // 使用hover,调用原型链上的方法
        // this.$this_jq_dx.hover(this.xianshi_yuanxingliang_fangfa, this.yincang_yuanxingliang_fangfa); //this.xianshi_yuanxingliang_fangfa（可以拿到原型链上的函数）
        // 函数本体里面的this指向this.$this_jq_dx -> $(canshu)/dom节点,这样调用不了原型链上的属性$(canshu).$xialaceng（×）

        // 用proxy(),第二个参数传进第一个参数（函数本体），改变第一个参数（函数本体）的里面this指向,传指向XIALA_GOUZHAO_HANSHU实例化new出来的this,
        this.$this_jq_dx.hover($.proxy(this.xianshi_yuanxingliang_fangfa, this), $.proxy(this.yincang_yuanxingliang_fangfa, this)); // proxy第二个参数this是外面的、指向XIALA_GOUZHAO_HANSHU
    }

    // XIALA_GOUZHAO_HANSHU有show、hide两个方法，放到prototype上，通过原型链调用，
    XIALA_GOUZHAO_HANSHU.prototype.xianshi_yuanxingliang_fangfa = function () {
        this.$this_jq_dx.addClass(this.activeClass_bianlian); //通过使用实例化XIALA_GOUZHAO_HANSHU出来对象上属性调用函数，
        this.$xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
    };
    // 通过原型链调用，不会重复拷贝方法，一份就够
    XIALA_GOUZHAO_HANSHU.prototype.yincang_yuanxingliang_fangfa = function () {
        this.$this_jq_dx.removeClass(this.activeClass_bianlian);
        this.$xialaceng.xianshi_yincang_chajian('yincang_fangfa');
    };

    // 将默认对象参数放到构造函数上
    XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN = { // 全大写DEFAULTS_MOREN，约定表示为默认参数
        css3_shuxing: false, // 默认不使用css3  这是对象里的属性
        js_shuxing: false,
        animation_shuxing: 'fade_fangfa', // 默认淡出淡出 第一个方法

        activeshuxing: 'dropdown' // 添加一个默认属性为active,可以改为其他：menu
    };

    // // 定义一个默认对象 里面相对应参数
    // var defaults_moren_duixiang = {
    //     css3_shuxing: false, // 默认不使用css3  这是对象里的属性
    //     js_shuxing: false,
    //     animation_shuxing: 'fade_fangfa' // 默认淡出淡出 第一个方法
    // };

    // jquery插件
    $.fn.extend({
        xiala_chajian: function ($canshu_xiaoguo) { // $canshu_xiaoguo接收传进来的对象
            return this.each(function () {
                // xiala_hanshu(this, $canshu_xiaoguo);

                // 获取html上元素的data属性，传过去，如：data-active = 'menu'
                // console.log($(this).data()); //打印出来为 active:"menu"，需要传过去的是这样的：active_shuxing: 'menu'，可以修改html上的data-active
                //获取保存传入参数对象 
                var xuanxiang_duixiang = $.extend({}, XIALA_GOUZHAO_HANSHU.DEFAULTS_MOREN, $(this).data(), $canshu_xiaoguo);

                // 通过new实例化构造函数
                new XIALA_GOUZHAO_HANSHU(this, xuanxiang_duixiang); // this为谁调用xiala_chajian，则指向谁,dropdown调用，指向dropdown
            });
        }
    });

})(jQuery);