// 兼容不同浏览器的transition 各浏览器的transition 命名不同
// 保存在模块里 不让暴露在全局里 自执行的匿名函数
(function () {
    // 各浏览器transition 名字映射表 
    var transition_mingzi_duixiang = {
        transition: 'transitionend', // w3c标准写法 transition下的属性transitionend
        MozTransition: 'transitionend', // 火狐浏览器
        WebkitTransition: 'webkitTransitionEnd',
        OTransition: 'oTransitionEnd'
    };

    // 定义变量 接收获得的transitionEnd 返回出去 
    var transitionEnd_bianliang = '',
        isSupport_bianliang = false;

    // 变量映射表 取出当前浏览器支持的transition 里的 transitionEnd 
    for (var shuxing_ming in transition_mingzi_duixiang) {
        // 如果当前浏览器 body下的style的 transition 不是undefined 则表示支持
        if (document.body.style[shuxing_ming] !== undefined) {
            // 将映射表浏览器当前支持的属性名transition 的值返回 transitionEnd 
            transitionEnd_bianliang = transition_mingzi_duixiang[shuxing_ming]; // 保存起来返回
            isSupport_bianliang = true;
            break;
        }
    }
    // console.log(transitionEnd_bianliang); //打印是否存在
    // console.log(isSupport_bianliang);

    // 将获得的 transitionEnd_bianliang、isSupport_bianliang返回
    // 使用 window 里的对象、属性 可以在window 上自定义对象、属性
    window.mt_duixiang = window.mt_duixiang || {}; // 如果之前有就用 没有则创建新的空对象
    window.mt_duixiang.transition_shuxing_duixiang = { // 在window 下自定义
        end_shuxing: transitionEnd_bianliang,  // 左边属性名 右边是返回的值
        isSupport_shuxing: isSupport_bianliang
    };
    // 可以在别的函数里使用 window.mt_duixiang 调用 获得 transitionEnd_bianliang、isSupport_bianliang 

})();

// // 各浏览器transition 名字映射表 
// var transition_mingzi_duixiang = {
//     transition: 'transitionend', // w3c标准写法 transition下的属性transitionend
//     MozTransition: 'transitionend',  // 火狐浏览器
//     WebkitTransition: 'webkitTransitionEnd',
//     OTransition: 'oTransitionEnd'
// };

// // 定义变量 接收获得的transitionEnd 返回出去 
// var transitionEnd_bianliang = '',
//     isSupport_bianliang = false;

// // 变量映射表 取出当前浏览器支持的transition 里的 transitionEnd 
// for (var shuxing_ming in transition_mingzi_duixiang) {
//     // 如果当前浏览器 body下的style的 transition 不是undefined 则表示支持
//     if(document.body.style[shuxing_ming] !== undefined ) { 
//         // 将映射表浏览器当前支持的属性名transition 的值返回 transitionEnd 
//         transitionEnd_bianliang = transition_mingzi_duixiang[shuxing_ming]; // 保存起来返回
//         isSupport_bianliang = true;
//         break;
//     }
// }
// // console.log(transitionEnd_bianliang); //打印是否存在
// // console.log(isSupport_bianliang);