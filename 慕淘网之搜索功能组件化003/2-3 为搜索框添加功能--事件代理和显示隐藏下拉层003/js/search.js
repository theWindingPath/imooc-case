(function ($) {
    'use strict';

    // 获取所有元素 节点
    var $search = $('.search'),
        $input = $search.find('.search-inputbox'),
        $form = $search.find('.search-form'), //获取form表单
        $btn = $search.find('.search-btn'),
        $layer = $search.find('.search-layer');

    // // 验证 使用事件驱动方式 
    // $btn.on('click', function () {
    //     // $.trim() 阻止空格提交
    //     if ($.trim($input.val()) === '') { // 判断 如果input 输入框 为空 '' 
    //         // btn 默认是 submit 按钮 
    //         return false; // 返回false 阻止提交 默认行为  空格还可以提交
    //     }
    // });

    // 无论是什么方式提交的（点击提交按钮，点击下拉层），都会触发form表单的提交事件，给form表单的提交事件绑定事件
    $form.on('submit', function(){ // 同样需要验证搜索框是否为空
        if ($.trim($input.val()) === '') { // 判断 如果input 输入框 为空 '' 
            // btn 默认是 submit 按钮 
            return false; // 返回false 阻止提交 默认行为  空格还可以提交
        }
    });

    // 自动完成
    // input 兼容性 IE6、7、8 不支持
    $input.on('input', function () { // input 和change类似 内容改变触发 上下左右箭头不触发
        // console.log(12);
        // 淘宝搜索请求地址 https://suggest.taobao.com/sug?code=utf-8&q=win&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1 
        // 修改q= 后面的值会获得新内容 如将q=win 改为q=iphone 可以获得iPhone搜索相关内容
        // 将 &q=win 找出来 连到后面  将win 去掉 然后 + 字符串连接 
        // 将 $.trim($input.val()) 拼接上去 $.trim($input.val())为用户在搜索框输入的内容
        // 使用 encodeURIComponent 进行编码 
        var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1&q=' + encodeURIComponent($.trim($input.val()));

        // 每改变内容 发送ajax请求
        $.ajax({
            url: url, // url地址 先空着 往哪发送
            // timeout:1, // 超时导致请求失败 模拟1毫秒 没有返回data 会执行fail 
            dataType: 'jsonp', // 发送到淘宝服务器 用到跨域问题 没有本地服务器
            // success: function(data){ // 成功之后做什么 接收到data
            //     // 收到返回数据有 result数组 和 magic数组 我们用result magic是淘宝搜索出右边图片
            //     console.log(data); //输入后 打印从淘宝服务器获取的值
            // },
            // error:function(error) { // 失败后做什么 涉及ajax请求 不要忽视错误时候做什么 1、网速太慢导致超时 2、或者服务器宕机
            //     console.log(error);
            // }
            // // 上面success error 是回调函数 
        }).done(function (data) { // 改用ajax 提供的done 异步操作 data传过来 异步方式主要是为了避免回调
            console.log(data);
            var html = '', // 保存收到数据生成 html返回
                dataNum = data['result'].length, // 获得内容长度 
                maxNum = 6; // 默认10个 显示下拉数据个数 可以修改为 6个等

            // 当输入搜索内容过长 搜索为空 
            // 判断 data['result'].length 是否为0 如果为0 空 return 退出不执行下面的
            if (dataNum === 0) {
                $layer.hide().html('');
                return;
            }

            for (var i = 0; i < data['result'].length; i++) { // 遍历返回的数组 取出我们想要的数据 展示
                if (i >= maxNum) break; // 如果i 大于我们想要显示个数 跳出循环

                // 累加html data下的result数组的第i个数组的第0个数据 第0个是文字 第1个是数字
                html += '<li class="search-layer-item">' + data['result'][i][0] + '</li>';
            }

            // 将上面得到的html 放到 $layer 上 下拉层里
            $layer.html(html).show(); // 然后展示出来 show .jQuery链式调用

            // // 通过search-layer找到它下面的search-layer-item，为search-layer-item们添加点击事件
            // $layer.find('.search-layer-item').on('click', function () { //.search-layer-item是动态生成的，意味着每生成一次就要绑定一次（相同）事件，这很浪费，性能下降
            //     // (可以使用事件代理机制，也就是事件冒泡)
            //     // 首先给input搜索框扔东西，将搜索出来的search-layer-item/$(this).html()扔到搜索框里$input.val()
            //     $input.val($(this).html());
            //     // 提交表单，通过$input找到父类form，调用submit()
            //     $input.parents('form').submit();
            // });

        }).fail(function () {
            // console.log('1失败做什么');

            // 先隐藏起来 在将内容清空
            $layer.hide().html('');
        }).always(function () { // 无论成功失败都会执行always
            console.log('why always me!');
        });
    });

    // // 在这里绑定事件无效，因为搜索出的数据一直在改变，是动态变化的，要放到上面done的里面
    // // 通过search-layer找到它下面的search-layer-item，为search-layer-item们添加点击事件
    // $layer.find('.search-layer-item').on('click', function(){
    //     // 首先给input搜索框扔东西，将搜索出来的search-layer-item/$(this).html()扔到搜索框里$input.val()
    //     $input.val($(this).html());
    //     // 提交表单，通过$input找到父类form，调用submit()
    //     $input.parents('form').submit();
    // });

    // (可以使用事件代理机制，也就是事件冒泡)，给父类绑定事件，子类触发
    // 如父类$layer绑定一个click事件，子类.search-layer-item点击自身会触发 父类$layer绑定的这个click事件，
    // 事件是绑定在$layer上的，只绑定了一次,$layer类下面的所有.search-layer-item子类都可以触发，执行匿名函数里的东西（每次触发）
    $layer.on('click', '.search-layer-item', function(){ //第二个参数.search-layer-item为谁要触发事件，代理谁
        // 首先给input搜索框扔东西，将搜索出来的search-layer-item/$(this).html()扔到搜索框里$input.val()
        // $input.val($(this).html()); // 这里的this还是.search-layer-item（this指向第二个参数）
        $input.val(removeHtmlTags($(this).html())); //使用removeHtmlTags函数将标签去除
        // 提交表单，通过$input找到父类form，调用submit()
        // $input.parents('form').submit();
        $form.submit(); 
    });

    // 利用正则表达式将搜索出来，含有html标签(</b>等)去除掉
    function removeHtmlTags(str){  // 传字符串进来
        // 使用正则表达式replace改变（替换）str内容，然后返回str
        // return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>//g, ""); 
        // 第二个参数为替换新的内容进去（这里为空（清空找到的部分）），第一个参数为正则表达式（要匹配的内容（这里为html标签：如</b>等））
        return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
    }

})(jQuery);