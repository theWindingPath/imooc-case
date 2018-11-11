(function ($) {
    // menu
    $(".dropdown").dropdown({
        css3: true,
        js: false
    });
    $('.dropdown').on('dropdown-show', function (e) {
        var $this = $(this),
            dataLoad = $this.data('load');

        if (!dataLoad) return;

        if (!$this.data('loaded')) {
            var $layer = $this.find('.dropdown-layer'),
                html = '';

            $.getJSON(dataLoad, function (data) {
                // console.log(1);
                // setTimeout(function () {
                for (var i = 0; i < data.length; i++) {
                    html += '<li><a href="' + data[i].url + '" target="_blank" class="menu-item">' + data[i].name + '</a></li>'
                }
                $layer.html(html);
                $this.data('loaded', true);
                // }, 1000);
            });
        }
    });

    // header-search
    var $headerSearch = $('#header-search'); // 获取
    $headerSearch.search({ // 调用search插件(函数),来自search.js文件的
        autocomplete: true,
        css3: false,
        js: false,
        animation: 'fade'
    });

})(jQuery);