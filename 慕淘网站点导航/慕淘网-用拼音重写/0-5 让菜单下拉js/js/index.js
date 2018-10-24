// // console.log(123);
// // 第一种方法
// $('.dropdown').hover(function() { // 鼠标移入 
//     var $xiala = $(this); // 将dropdown 保存成jQuery变量 

//     $xiala.find('.dropdown-toggle').css( // 改变 dropdown-toggle' 样式
//         {
//             'background-color': '#fff',
//             'border-color': '#cdd0d4'
//         }
//     );

//     $xiala.find('.dropdown-arrow').css(  // 改变dropdown-arrow样式
//         { 
//             'background-image': 'url(./image/dropdown-arrow-active.png)' //箭头向上
//         }
//     );

//     $xiala.find('.dropdown-layer').show(); // dropdown-layer显示出来

// }, function() { // 鼠标移出
//     var $xiala = $(this);

//     $xiala.find('.dropdown-toggle').css( 
//         {
//             'background-color': '',
//             'border-color': ''
//         }
//     );
    
//     $xiala.find('.dropdown-arrow').css(  
//         { 
//             'background-image': 'url(./image/dropdown-arrow.png)' 
//         }
//     );

//     $xiala.find('.dropdown-layer').hide(); 

// });


// // 第二种方法 将js 的样式 拿出来 通过添加 class 实现
// $('.dropdown').hover(function(){
//     // console.log(1)
//     $(this).addClass('dropdown-active');
// }, function(){
//     $(this).removeClass('dropdown-active');
// });


// 第三种方法 直接使用 hover
