// console.log(document.body.style.transitions); //属性没有打印 undefined
// console.log(document.body.style.transition);  // 空字符串 存在
// console.log(document.body.style);
(function () {
    var transitionEndEventName = { // 映射表 做一下遍历
        transition: 'transitionend',
        MozTransition: 'transitionend',
        WebkitTransition: 'WebkitTransitionEnd',
        OTransition: 'oTransitionEnd otransitionend'
    };
    var transitionEnd = '', // 初始为空串
        isSupport = false; // 默认不支持

    for(var name in transitionEndEventName) { //遍历
        if(document.body.style[name] !== undefined) { //不等于 存在
            transitionEnd = transitionEndEventName[name];
            isSupport = true; // 存在 支持
            break; // 找到 退出循环
        }
    }
    // 暴露给全局作用域 mt慕淘
    window.mt = window.mt || {}; // 不存在则创建 新空对象
    window.mt.transition = { 
        end: transitionEnd, // 变量
        isSupport: isSupport
    };
})();