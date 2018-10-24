(function ($) {
    'use strict';

    // 获取所有元素 节点
    var $search = $('.search'),
        $input = $search.find('.search-inputbox'),
        $btn = $search.find('.search-btn'),
        $layer = $search.find('.search-layer');

    // 验证 使用事件驱动方式 
    $btn.on('click', function () {
        // $.trim() 阻止空格提交
        if ($.trim($input.val()) === '') { // 判断 如果input 输入框 为空 '' 
        // btn 默认是 submit 按钮 
            return false; // 返回false 阻止提交 默认行为  空格还可以提交
        }
    });


    // 自动完成
    // input 兼容性 IE6、7、8 不支持
    $input.on('input', function(){  // input 和change类似 内容改变触发 上下左右箭头不触发
        // console.log(12);
        // 淘宝搜索请求地址 https://suggest.taobao.com/sug?code=utf-8&q=win&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1 
        // 修改q= 后面的值会获得新内容 如将q=win 改为q=iphone 可以获得iPhone搜索相关内容
        // 将 &q=win 找出来 连到后面  将win 去掉 然后 + 字符串连接 
        // 将 $.trim($input.val()) 拼接上去 $.trim($input.val())为用户在搜索框输入的内容
        var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1&q=' + $.trim($input.val());
        
        // 每改变内容 发送ajax请求
        $.ajax({
            url: url,// url地址 先空着 往哪发送
            dataType:'jsonp', // 发送到淘宝服务器 用到跨域问题 没有本地服务器
            success: function(data){ // 成功之后做什么 接收到data
                console.log(data); //输入后 打印从淘宝服务器获取的值
            },
            error:function(error) { // 失败后做什么 涉及ajax请求 不要忽视错误时候做什么 1、网速太慢导致超时 2、或者服务器宕机
                console.log(error);
            }
        
        });
    });

    // $input.on('change', function(){ // change 事件触发条件 值改变  点击空白才触发 blur
    //     console.log(12);
    // });

    // //keypress 按下键盘按钮触发 但是如果按钮忘抬起来 会连续触发
    // $input.on('keypress', function(){ 
    //     console.log(12);
    // });

    // // keyup 抬起来触发 解决按住连续触发问题 
    // $input.on('keyup', function(){  //输入上下左右 也会触发 问题2、鼠标粘贴不会触发
    //     console.log(12);
    // });

})(jQuery);