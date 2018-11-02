
(function ($) {
    // 33333插件方式 使用 jQuery提供的 extend() 将自定义函数 转化为jQuery 插件
    function xiala_hanshu(canshu, $canshu_xiaoguo) { // 定义函数 带一个参数
        var $this_jq_dx = $(canshu); // 将缓存变量 提到函数外面
        var activeClass_bianlian = $this_jq_dx.data('active') + '-active';

        // 获取要被显示的下拉层
        var $xialaceng = $this_jq_dx.find('.dropdown-layer'); 

        // // 出入参数，初始化showhide
        // $xialaceng.xianshi_yincang_chajian({ 
        //     css3_shuxing: true,
        //     js_shuxing: false,
        //     animation_shuxing: 'slideUpDown_fangfa' 
        // });

        // 将初始化的参数从外面html传进来 
        $xialaceng.xianshi_yincang_chajian($canshu_xiaoguo);
        // console.log($canshu_xiaoguo);

        $xialaceng.on('show shown hide hidden003', function (e) {
            console.log(e.type); // 打印触发事件的类似 show hide
        });

        $this_jq_dx.hover(function () {
            $this_jq_dx.addClass(activeClass_bianlian);

            // 使用showhide模块的方法 显示 下拉层要显示 下拉层调用
            $xialaceng.xianshi_yincang_chajian('xianshi_fangfa');
        }, function () {
            $this_jq_dx.removeClass(activeClass_bianlian);

            // 谁要显示隐藏 谁调用
            $xialaceng.xianshi_yincang_chajian('yincang_fangfa');
        });
    }
    // jquery插件
    $.fn.extend({
        xiala_chajian: function ($canshu_xiaoguo) {  // $canshu_xiaoguo接收传进来的对象
            return this.each(function () {
                xiala_hanshu(this, $canshu_xiaoguo);
            });
        }
    });

})(jQuery);