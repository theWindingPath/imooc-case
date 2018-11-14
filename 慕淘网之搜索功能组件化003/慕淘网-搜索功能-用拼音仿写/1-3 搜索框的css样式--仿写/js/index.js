// 第三种方法 直接使用 hover

(function ($) {
    'use strict';

    // 第四步：使用单例，
    $('.dropdown').on('dropdown-show', function (e) {
        console.log(e.type);
        var html_jiedian = ''; // 定义空字符串接收 
        var $this = $(this); // 保存this 为jQuery对象
        var xialacheng_bianliang = $this.find('.dropdown-layer'); // 通过this寻找它下面的下拉层
        var dataload = $this.data('load'); // 获取data上的 .json

        // 判断 如果当前节点没有 data-load属性 直接返回
        if (!dataload) return;

        // 获取loaded_danli，第一次为undefined，
        var dataload_danli = $this.data('loaded_danli');

        // 如果dataload_danli 为undefined，则是第一次进来，
        if (!dataload_danli) {
            $.getJSON(dataload, function (data) { // data为从 dropdown3_5.json 里获得的内容，放到data里
                console.log(1) // 使用单例后，这里只打印一次，
                // 延迟1秒显示
                setTimeout(function () {
                    for (var i = 0; i < data.length; i++) {
                        html_jiedian += '<li><a href=" ' + data[i].url +
                            ' " target="_blank" class="menu-item"> ' + data[i].name_neirong +
                            ' </a></li>';
                        // 将创建的HTML放到下拉层里
                        xialacheng_bianliang.html(html_jiedian);

                        $this.data('loaded_danli', true); // 已加载，为true
                    }
                }, 1000);
            });
        }
    });

    // 在这里传想要的效果的对象参数
    $('.dropdown').xiala_chajian({
        css3_shuxing: true,
        js_shuxing: false
    });
})(jQuery);