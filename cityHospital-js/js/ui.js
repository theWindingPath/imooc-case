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
// ui-tab 定义

// @param {string} header TAB组件,的所有选项卡  .item
// @param {string} content TAB组件，内容区域， 所有.item
// @param {string} focus_prefix 选项卡高亮样式前缀，可选

$.fn.UiTab = function(header,content,focus_prefix) {

    var ui = $(this);
    var tabs = $(header,ui);
    var cons = $(content,ui);
    var focus_prefix = focus_prefix || ''; // 没有则为空白符

    tabs.on('click',function(){
        var index = $(this).index();
        // debugger
        //点击 医院 和 科室 切换（清除、添加）颜色
        tabs.removeClass(focus_prefix+'item_focus').eq(index).addClass(focus_prefix+'item_focus');
        //点击 隐藏 和 显示 cons 选中的内容
        cons.hide().eq(index).show();
        return false;
    })

}

// // ui-backTop
$.fn.UiBackTop =function(){
    var ui = $(this);
    // body 下所有 <a> 标签会被选中
    var el = $('.ui-backTop');  //  显示不出来 可能是版本不支持 
    el.show();
    ui.append( el );

    // var windowHeight = $(window).height();

    // $(window).on('scroll',function(){
    //     var top = $('body').scrollTop();
    //     // console.log(top);
    //     if(top >windowHeight){
    //         el.show();
    //     }else{
    //         el.hide();
    //     }
    // })

    el.on('click',function(){
        $(window).scrollTop(0);
    });

}




// 页面的脚本逻辑
$(function () {
    // alert(1);
    // debugger
    $(".ui-search").UiSearch(); // 类选择器 选中 ui-search 类  调用 UiSearch 函数

    $('.content-tab').UiTab('.caption > .item','.block > .item');
    $('.content-tab .block .item').UiTab('.block-caption > a', '.block-content > .block-wrap', 'block-caption-');

    $('body').UiBackTop();

});

// alert(2);