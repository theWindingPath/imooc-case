// 将全局的 写到一个模块里
(function ($) {
    'use stict';

    // 显示前加载 从 json 文件获取
    $('.dropdown').on('dropdown-show', function (e) {
        var $this = $(this),
            dataLoad = $this.data('load');

        // 判断 如果 data-load 不存在 直接返回 不再执行
        if (!dataLoad) return;

        // 执行前 判断  第一次 loaded 为 undefined 执行完一次 变为 true 第二次开始 不会执行 if 里面的内容
        if (!$this.data('loaded')) { // 没有加载 再加载
            var $layer = $(this).find('.dropdown-layer'), // this 指向前面的 谁调用它 指向谁
                html = ''; // 自己构造 HTML

            // 第二个没有 data-load 不加载 loading
            $.getJSON(dataLoad, function (data) { // data 为返回值
                // 它是数组对象 循环遍历
                for (var i = 0; i < data.length; i++) {
                    // 字符串拼接 '+ +'
                    html += '<li><a href="' + data[i].url +
                        '" target="_blank" class="menu-item">' + data[i].name +
                        '</a></li>'
                }
                // 将循环完的 html 放到 下拉层里
                $layer.html(html);
                $this.data('loaded', true); // 使用 loaded 属性判断 是否执行过
            });
        }
    });

    // 找到所有的 dropdown 然后调用 dropdown组件
    $('.dropdown').dropdown({
        css3: true,
        js: false,
    });

})(jQuery);