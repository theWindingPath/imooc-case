/*zhe bu fen shi huan suan rem wei px 
she zi fontsize zi shi ying bu ju */
(function (doc,win) {
    var docEl =doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' :'resize',
    recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 640) {
            docEl.style.fontSize = '100px';
        } else {
            docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
        }
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt,recalc,false);
    doc.addEventListener('DOMContentLoaded',recalc,false);
    recalc();
})(document,window);

/*zhe bu fen shi lun bo tu */
var innerGroup = $(".innerwraper");
var leftArrow = $(".left-arrow");
var rightArrow = $(".right-arrow");
var spanGroup = $(".pagination span");
var imgWidth = $(".innerwraper img:first-child").eq(0).width();
var _index = 0;
var timer = null;
spanGroup.on("click",function() {
    _index = spanGroup.index($(this));
    selectPic(_index);
})

function autoGo() {
    timer = setIntervalL(go,3000);
}

autoGo();

function go() {
    _index++;
    selectPic(_index);
}

function selectPic(num) {
    clearInterval(timer);
    $(".pagination span").eq(num).addClass("active").siblings().removeClass("active");
    if (num % 4 == 0) {
        $(".pagination span").eq(0).addClass("active").siblings().removeClass("active");
    }
    $(".inner").stop().animate({
        left: -num * imgWidth,
    }, 1000, function() {
        timer = setInterval(go,3000);
        if(_index == innerGroup.length -1){
            _index %= 4;
            $(".inner").css("left","0px");
        }
    })
}