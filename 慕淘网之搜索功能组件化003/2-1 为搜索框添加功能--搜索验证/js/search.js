(function ($) {
    'use strict';

    // 获取所有元素 节点
    var $search = $('.search'),
        $input = $search.find('.search-inputbox'),
        $btn = $search.find('.search-btn'),
        $layer = $search.find('.search-layer');

    // 验证 使用事件驱动方式 
    // 鼠标点击按钮 产生验证
    $btn.on('click', function () {

        // // 阻止空格提交 $.trim() jQuery提供方法 可以去掉字符串两边的空格 
        // console.log($input.val());
        // console.log($.trim($input.val())); // 中间空格不会去掉
        // return false; // 直接返回 不往后面执行了 不提交了 下面代码 不会执行
        
        // $.trim() 阻止空格提交
        if ($.trim($input.val()) === '') { // 判断 如果input 输入框 为空 '' 
        // btn 默认是 submit 按钮 
            return false; // 返回false 阻止提交 默认行为  空格还可以提交
        }

        // if ($input.val() === '') { // 判断 如果input 输入框 为空 '' 
        // // btn 默认是 submit 按钮 
        //     return false; // 返回false 阻止提交 默认行为  空格还可以提交
        // }

    });


    // 自动完成


})(jQuery);