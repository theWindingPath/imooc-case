// // console.log(123);
// // 第一种方法
// $('.dropdown').hover(function(){ // 鼠标移入移出 hover接收两个参数
//     var $dropdown = $(this);

//     $dropdown.find('.dropdown-toggle').css( // 鼠标移入 修改dropdown-toggle 的 css样式
//         {
//             'background-color':'#fff',
//             'border-color':'#cdd0d4'  // 没有分号
//         }
//     );

//     $dropdown.find('.dropdown-arrow').css({
//         'background-image':'url(./image/dropdown-arrow-active.png)' //箭头向上
//     });
    
//     $dropdown.find('.dropdown-layer').show();
// }, function(){  //鼠标移出
//     var $dropdown = $(this);

//     $dropdown.find('.dropdown-toggle').css( // 鼠标移入 修改dropdown-toggle 的 css样式
//         {
//             'background-color':'',  // 让它继承父类的背景颜色
//             'border-color':''  // 没有分号
//         }
//     );

//     $dropdown.find('.dropdown-arrow').css({
//         'background-image':'url(./image/dropdown-arrow.png)' // 箭头向下
//     });
    
//     $dropdown.find('.dropdown-layer').hide(); // 下拉选项隐藏

// });

// // 第二中方法
// // 在 js中设置 css样式会产生 回流 和 重置
// // console.log(123);
// $('.dropdown').hover(function(){ // 鼠标移入移出 hover接收两个参数
//     $(this).addClass('dropdown-active');
// }, function(){  //鼠标移出
//     $(this).removeClass('dropdown-active');
// });

// 第三种方法，不使用 js , 直接使用 css 中的 hover 实现