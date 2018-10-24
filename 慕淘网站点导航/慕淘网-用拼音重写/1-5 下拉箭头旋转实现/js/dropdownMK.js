// 模块封装在这里 别的文件也可以调用
// // 使用 jQuery模块封装
// (function($){

// })(jQuery);
(function ($) {
    // 33333插件方式 使用 jQuery提供的 extend() 将自定义函数 转化为jQuery 插件
    function xiala_hanshu(canshu) { // 定义函数 带一个参数
        var $this_jq_dx = $(canshu); // 将缓存变量 提到函数外面
        var activeClass_bianlian = $this_jq_dx.data('active') + '-active';

        $this_jq_dx.hover(function () {
            $this_jq_dx.addClass(activeClass_bianlian);
        }, function () {
            $this_jq_dx.removeClass(activeClass_bianlian);
        });
    }
    // jquery插件
    $.fn.extend({
        xiala_chajian: function () {
            return this.each(function () {
                xiala_hanshu(this);
            });
        }
    });

})(jQuery);