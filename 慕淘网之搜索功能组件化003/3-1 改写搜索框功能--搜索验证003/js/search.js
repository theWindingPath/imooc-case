// (function ($) {
//     'use strict';

//     // 获取所有元素 节点
//     var $search = $('.search'),
//         $input = $search.find('.search-inputbox'),
//         $form = $search.find('.search-form'), //获取form表单
//         $btn = $search.find('.search-btn'),
//         $layer = $search.find('.search-layer');

//     // 无论是什么方式提交的（点击提交按钮，点击下拉层），都会触发form表单的提交事件，给form表单的提交事件绑定事件
//     $form.on('submit', function () { // 同样需要验证搜索框是否为空
//         if ($.trim($input.val()) === '') { // 判断 如果input 输入框 为空 '' 
//             // btn 默认是 submit 按钮 
//             return false; // 返回false 阻止提交 默认行为  空格还可以提交
//         }
//     });

//     // input 兼容性 IE6、7、8 不支持
//     $input.on('input', function () { // input 和change类似 内容改变触发 上下左右箭头不触发
//         // 使用 encodeURIComponent 进行编码 
//         var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1&q=' + encodeURIComponent($.trim($input.val()));

//         // 每改变内容 发送ajax请求
//         $.ajax({
//             url: url, // url地址 先空着 往哪发送
//             // timeout:1, // 超时导致请求失败 模拟1毫秒 没有返回data 会执行fail 
//             dataType: 'jsonp', // 发送到淘宝服务器 用到跨域问题 没有本地服务器
//         }).done(function (data) { // 改用ajax 提供的done 异步操作 data传过来 异步方式主要是为了避免回调
//             console.log(data);
//             var html = '', // 保存收到数据生成 html返回
//                 dataNum = data['result'].length, // 获得内容长度 
//                 maxNum = 6; // 默认10个 显示下拉数据个数 可以修改为 6个等

//             if (dataNum === 0) {
//                 $layer.hide().html('');
//                 return;
//             }

//             for (var i = 0; i < data['result'].length; i++) { // 遍历返回的数组 取出我们想要的数据 展示
//                 if (i >= maxNum) break; // 如果i 大于我们想要显示个数 跳出循环

//                 // 累加html data下的result数组的第i个数组的第0个数据 第0个是文字 第1个是数字
//                 html += '<li class="search-layer-item">' + data['result'][i][0] + '</li>';
//             }
//             // 将上面得到的html 放到 $layer 上 下拉层里
//             $layer.html(html).show(); // 然后展示出来 show .jQuery链式调用

//         }).fail(function () {
//             // 先隐藏起来 在将内容清空
//             $layer.hide().html('');
//         }).always(function () { // 无论成功失败都会执行always
//             console.log('why always me!');
//         });
//     });

//     // 事件是绑定在$layer上的，只绑定了一次,$layer类下面的所有.search-layer-item子类都可以触发，执行匿名函数里的东西（每次触发）
//     $layer.on('click', '.search-layer-item', function () { //第二个参数.search-layer-item为谁要触发事件，代理谁
//         $input.val(removeHtmlTags($(this).html())); //使用removeHtmlTags函数将标签去除
//         $form.submit();
//     });

//     // 显示隐藏下拉层
//     $input.on('focus', function () {
//         $layer.show(); // 在focus时下拉层显示
//     }).on('click', function () { // 在绑定click事件，阻止冒泡
//         return false; //阻止冒泡(也阻止默认事件)，就不会触发document的click事件了
//     }); // 不用blur，用document的click

//     // 点击页面空白，下拉菜单消失
//     $(document).on('click', function () {
//         $layer.hide(); //由于冒泡，focus事件也会触发document的click事件，
//     });

//     // 利用正则表达式将搜索出来，含有html标签(</b>等)去除掉
//     function removeHtmlTags(str) { // 传字符串进来
//         return str.replace(/<(?:[^>'"]|"[^"]*"|'[^']*')*>/g, '');
//     }

// })(jQuery);


// 将搜索框封装成一个模块，search函数有两大功能，提交和自动完成
(function ($) {
    'use strict';

    // Search是一个构造函数，也是一个对象，有两个参数，
    function Search(elem, options) { //1、第一个参数，为了复用，传递不同的elem，2、options为用户传的参数
        // 一进来，将两个参数转为jQuery对象，并保存到this上
        this.$elem = $(elem);
        this.$options = $(options);
    }

    // 如果用户没有传，则使用默认参数
    Search.DEAFAULTS = {
        autocomplete: false, // 默认不自动完成，
        url: 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1540368616784_723&callback=jsonp724&k=1&area=c2c&bucketid=1&q=', //往哪传，现在我们用的是淘宝的url，我们也可以使用京东的url，或者其他的

        // 将showhide的参数拿过来使用
        css3: false,
        js: false,
        animation: 'fade'
    };

    // Search作为一个对象，有两大功能submit/autocomplete
    Search.prototype.submit = function () {

    };
    Search.prototype.autocomplete = function () {

    };
    // autocomplete自动完成还可以细分出小功能getData(获取数据) /showLayer(显示下拉层) /hideLayer(隐藏下拉层)
    Search.prototype.getData = function () { // autocomplete小功能
 
    };
    Search.prototype.showLayer = function () { // autocomplete小功能
 
    };
    Search.prototype.hideLayer = function () { // autocomplete小功能
 
    };


    // Search是局部的，要和外面通信，需要把Search变成jQuery插件
    $.fn.extend({
        search: function(option) {
            return this.each(function() {
                
                var $this=$(this),
                search=$this.data('search'),
                options = $.extend({}, Search.DEFAULTS, $(this).data(), typeof option==='object'&&option);
                // dropdown(this, options);  
                if(!search){//解决多次调用dropdown问题
                    $this.data('search',search=new Search($this,options));

                }  

                if(typeof search[option]==='function'){
                    search[option]();

                }

            });

        }
    });

    // $.fn.extend({
    //     dropdown: function(option) {
    //         return this.each(function() {
                
    //             var $this=$(this),
    //             dropdown=$this.data('dropdown'),
    //             options = $.extend({}, Dropdown.DEFAULTS, $(this).data(), typeof option==='object'&&option);
    //             // dropdown(this, options);  
    //             if(!dropdown){//解决多次调用dropdown问题
    //                 $this.data('dropdown',dropdown=new Dropdown($this,options));

    //             }  

    //             if(typeof dropdown[option]==='function'){
    //                 dropdown[option]();

    //             }

    //         });

    //     }
    // });

})(jQuery);