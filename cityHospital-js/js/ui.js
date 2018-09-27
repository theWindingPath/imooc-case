// alert(1);
// ui-search 定义
$.fn.UiSearch = function () { //自定义 UiSearch 函数
    var ui = $(this); // ui 相当于 $('.ui-search') 获取ui-search 类选择器
    // debugger;
    // 点击医院 展开下拉菜单
    $('.ui-search-selected', ui).on('click', function () { //点击  在ui 下选择 ui-search-selected 类
        $('.ui-search-selected-list').show(); //展示
        return false; //不让它自动向上传递 到 body 
    });

    // 选中下拉菜单子元素 点击 后 添加上去 然后 同时隐藏
    $('.ui-search-selected-list a', ui).on('click', function () { //点击

        $('.ui-search-selected').text($(this).text()); //替换文本 this 指向 a 选择器 内容
        $('.ui-search-selected-list').hide(); // 隐藏

        return false;
    });
    // 点击空白处 将下拉菜单隐藏起来
    $('body').on('click', function () {
        $('.ui-search-selected-list').hide(); // 隐藏
    });

}
// ui-tab 定义

// @param {string} header TAB组件,的所有选项卡  .item
// @param {string} content TAB组件，内容区域， 所有.item
// @param {string} focus_prefix 选项卡高亮样式前缀，可选

$.fn.UiTab = function (header, content, focus_prefix) {

    var ui = $(this);
    var tabs = $(header, ui);
    var cons = $(content, ui);
    var focus_prefix = focus_prefix || ''; // 没有则为空白符

    tabs.on('click', function () {
        var index = $(this).index();
        // debugger
        //点击 医院 和 科室 切换（清除、添加）颜色
        tabs.removeClass(focus_prefix + 'item_focus').eq(index).addClass(focus_prefix + 'item_focus');
        //点击 隐藏 和 显示 cons 选中的内容
        cons.hide().eq(index).show();
        return false;
    })

}

// // ui-backTop
$.fn.UiBackTop = function () {
    var ui = $(this);
    // body 下所有 <a> 标签会被选中
    var el = $('.ui-backTop'); //  显示不出来 可能是版本不支持 
    el.show();
    ui.append(el);

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

    el.on('click', function () {
        $(window).scrollTop(0);
    });

}

// ui-slider

// 1.左右箭头需要能控制翻页
// 2.翻页的时候，进度点，要联动进行focus
// 3.翻到第三页的时候，下一页需要回到 第一页，翻到第一页的时候，同理

// 4.进度点，在点击的时候，需要切换到对应的页面

// 5.没有（进度点 点击、翻页操作） 的时候 需要进行 自动滚动

// 6.滚动过程中，屏蔽其他操作 （自动滚动、左右翻页。进度点点击）

// 7.高级-无缝滚动

$.fn.UiSlider = function () {

    var ui = $(this);

    var wrap = $('.ui-slider-wrap'); 

    var btn_pre = $('.ui-slider-arrow .left', ui);

    var btn_next = $('.ui-slider-arrow .right', ui);

    // var btn_next = $('.ui-slider-arrow .right',ui);
    // console.log(btn_next);

    var items = $('.ui-slider-wrap .item', ui); // 图片数组
    var tips = $('.ui-slider-process .item', ui); // 一排小圆点

    // 预定义 UiSlider函数下的全局变量

    var current = 0; // 当前下标 0 1 2 
    var size = items.size(); // size 是3 三个点
    var width = items.eq(0).width(); // width 每个图片宽度 544px
    var enableAuto = true; // 停止自动 轮播

    // 设置自动滚动感应 （如果鼠标在 ui-slider 中， 停止自动滚动
    ui
        .on('mouseover', function () {  // 鼠标移进
            // console.log('in');
            enableAuto = false;
        })
        .on('mouseout', function () {  // 移出
            // console.log('out');
            enableAuto = true;
        })

    // 具体操作
    wrap  // 一个变量 定义 多个函数 函数名： move_prev / move_next / move_to 等
        .on('move_prev', function () {

            if (current <= 0) {
                current = size;
            }
            current = current - 1;
            // console.log(current);
            wrap.triggerHandler('move_to', current); //调用 move_to 函数

        })

        // .on('move_next',function(){
        // 	if( current >= size-1){
        // 		current = -1;
        // 	}
        // 	current = current + 1 ;
        // 	console.log(current);
        // 	wrap.triggerHandler('move_to',current);
        // })

        .on('move_next', function () {

            if (current >= size - 1) {
                current = -1;
            }
            current = current + 1;
            // console.log(current);
            wrap.triggerHandler('move_to', current);

        })
        .on('move_to', function (evt, index) {  // move_to 是唯一 一个执行切换图片的函数, 所有其他函数都 直接 间接 调用 move_to
            // debugger 需要点击 debugger
            wrap.css('left', index * width * -1); //移动距离 0 1 2 乘 544 乘-1  left : -544px;
            tips.removeClass('item_focus').eq(index).addClass('item_focus'); // 圆点跟着变化 通过添加 类名 减少
        })
        //自动滚动
        .on('auto_move', function () {

            setInterval(function () {
                enableAuto && wrap.triggerHandler('move_next');
            }, 2000)

        })
        .triggerHandler('auto_move'); // 一进来 自动执行 不需要事件调用



    // 事件 通过点击事件 调用对应函数
    btn_pre.on('click', function () {
        wrap.triggerHandler('move_prev'); // 调用函数名 move_prev  在上面 wrap 定义
    });
    btn_next.on('click', function () {
        wrap.triggerHandler('move_next');
    });
    tips.on('click', function () {
        // index 为局部变量
        var index = $(this).index();
        wrap.triggerHandler('move_to', index);
    })

}


// ui-cascading 级联菜单
$.fn.UiCascading = function(){
    // debugger // 然后 this 一下 看指向哪里
    var ui = $(this);  // ui 指向 this 指向的 当前 ui-cascading 
    var selects = $('select', ui); //select 前不用加 . 是HTML 元素 类名需要加点 是数组
    
    selects
    .on('change',function(){
        var val = $(this).val(); // 当前值拿出来
        var index = selects.index(this); // 当前选中第几个 option下拉选项

        // debugger // 然后在 下拉选框 选择
    })
    .on('reloadOptions',function(){   //select 下每个 option 都需要重新更新、加载

    })

}


// 页面的脚本逻辑
$(function () {
    // alert(1);
    // debugger  调用函数
    $(".ui-search-003").UiSearch(); // 类选择器 选中 ui-search 类  调用 UiSearch 函数

    $('.content-tab').UiTab('.caption > .item', '.block > .item'); // 传入两个参数， .caption下所有的 item,和 .block下的所有 item, 两个参数都为数组 
    $('.content-tab .block .item').UiTab('.block-caption > a', '.block-content > .block-wrap', 'block-caption-');

    $('body').UiBackTop();

    $('.ui-slider').UiSlider();
    $('.ui-cascading').UiCascading();
});

// alert(2);