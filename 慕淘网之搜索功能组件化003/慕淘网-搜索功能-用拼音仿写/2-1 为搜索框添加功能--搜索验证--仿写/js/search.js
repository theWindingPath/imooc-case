// 放到模块里写
(function($){
    'use strict';

    // 点击搜索按钮，表单提交前验证是否为空，
    // 获取dom节点
    var $sousuo_bianliang = $('.search'),
        $shurukuang_bianliang = $sousuo_bianliang.find('.search-inputbox'),
        $anniu_bianliang = $sousuo_bianliang.find('.search-btn'),
        $xialaceng_bianliang = $sousuo_bianliang.find('.search-layer');

    // 点击搜索按钮，表单提交前验证是否为空，
    // 为按钮绑定点击事件
    $anniu_bianliang.on('click', function(){
        // // 输入框内容为空，返回false
        // if($shurukuang_bianliang.val() === ''){ // 输入空格依然可以提交，使用trim()
        //     return false;
        // }

        // console.log($shurukuang_bianliang.val());
        // console.log($.trim($shurukuang_bianliang.val()));
        // return false; // 不提交，方便查看打印

        // 使用$.trim()，去掉输入内容两边空格，如果输入全是空格，则为空，不提交（返回false）
        if($.trim($shurukuang_bianliang.val()) === ''){ // 输入空格依然可以提交，使用trim()
            return false;
        }
    });

})(jQuery);