// alert(1);
// ui-search 定义
$.fn.UiSearch = function(){ //自定义 UiSearch 函数
    var ui = $(this); // ui 相当于 $('.ui-search') 获取ui-search 类选择器
    // debugger;
    // 点击医院 展开下拉菜单
    $('.ui-search-selected',ui).on('click',function(){ //点击  在ui 下选择 ui-search-selected 类
        $('.ui-search-selected-list').show(); //展示
        return false; //不让它自动向上传递 到 body 
    });
    
    // 选中下拉菜单子元素 点击 后 添加上去 然后 同时隐藏
    $('.ui-search-selected-list a',ui).on('click',function(){ //点击

        $('.ui-search-selected').text( $(this).text() ); //替换文本 this 指向 a 选择器 内容
        $('.ui-search-selected-list').hide(); // 隐藏

        return false;
    });
    // 点击空白处 将下拉菜单隐藏起来
    $('body').on('click',function(){
        $('.ui-search-selected-list').hide(); // 隐藏
    });


}


// 页面的脚本逻辑
$(function () {
    // alert(1);
    // debugger
    $(".ui-search").UiSearch(); // 类选择器 选中 ui-search 类  调用 UiSearch 函数

});

// alert(2);