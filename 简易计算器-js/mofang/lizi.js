// // 初步
// //获取 DOM元素
// var jisuanqi_bl = document.querySelector('#jisuanqi');
// var qian_shuru_bl = document.querySelector('.qian_shuru');
// var hou_shuru_bl = document.querySelector('.hou_shuru');
// var fuhao_bl = document.querySelector('.fuhao');
// var jieguo_shuchu_bl = document.querySelector('.jieguo_shuchu');

// // 函数 加法
// function jiafa_hs() {
//     fuhao_bl.innerHTML = "加";
//     jieguo_shuchu_bl.innerHTML = +qian_shuru_bl.value + +hou_shuru_bl.value;
// }
// //减法
// function jianfa_hs() {
//     fuhao_bl.innerHTML = "减";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value - hou_shuru_bl.value;
// }
// //乘法
// function chengfa_hs() {
//     fuhao_bl.innerHTML = "乘";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value * hou_shuru_bl.value;
// }
// //除法
// function chufa_hs() {
//     fuhao_bl.innerHTML = "除";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value / hou_shuru_bl.value;
// }

// // 第一次改进--将结构和行为分离
// //获取 DOM元素
// var jisuanqi_bl = document.querySelector('#jisuanqi');
// var qian_shuru_bl = document.querySelector('.qian_shuru');
// var hou_shuru_bl = document.querySelector('.hou_shuru');
// var fuhao_bl = document.querySelector('.fuhao');
// var jieguo_shuchu_bl = document.querySelector('.jieguo_shuchu');
// var anniu_bl = document.querySelectorAll('.anniu'); // 获取数组需要加上 ALL

// // var anniu_bl = document.querySelector('.anniu');
// // console.log(anniu_bl);

// // 绑定事件
// anniu_bl[0].onclick = jiafa_hs;
// anniu_bl[1].onclick = jianfa_hs;
// anniu_bl[2].onclick = chengfa_hs;
// anniu_bl[3].onclick = chufa_hs;

// // 函数 加法
// function jiafa_hs() {
//     fuhao_bl.innerHTML = "加";
//     jieguo_shuchu_bl.innerHTML = +qian_shuru_bl.value + +hou_shuru_bl.value;
// }
// //减法
// function jianfa_hs() {
//     fuhao_bl.innerHTML = "减";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value - hou_shuru_bl.value;
// }
// //乘法
// function chengfa_hs() {
//     fuhao_bl.innerHTML = "乘";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value * hou_shuru_bl.value;
// }
// //除法
// function chufa_hs() {
//     fuhao_bl.innerHTML = "除";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value / hou_shuru_bl.value;
// }

// // 第二次改进--使用循环
// //获取 DOM元素
// var jisuanqi_bl = document.querySelector('#jisuanqi');
// var qian_shuru_bl = document.querySelector('.qian_shuru');
// var hou_shuru_bl = document.querySelector('.hou_shuru');
// var fuhao_bl = document.querySelector('.fuhao');
// var jieguo_shuchu_bl = document.querySelector('.jieguo_shuchu');
// var anniu_bl = document.querySelectorAll('.anniu'); // 获取数组需要加上 ALL

// // var anniu_bl = document.querySelector('.anniu');
// // console.log(anniu_bl);

// //循环绑定事件 
// for (var i = 0; i < anniu_bl.length; i++) {
//     anniu_bl[i].onclick = function () {
//         // console.log(this.title);
//         // console.log(this.value);
//         switch (this.title) {
//             case 'jia':
//                 jiafa_hs();
//                 break;
//             case 'jian':
//                 jianfa_hs();
//                 break;
//             case 'cheng':
//                 chengfa_hs();
//                 break;
//             case 'chu':
//                 chufa_hs();
//                 break;
//         }
//     };
// }

// // // 绑定事件
// // anniu_bl[0].onclick = jiafa_hs;
// // anniu_bl[1].onclick = jianfa_hs;
// // anniu_bl[2].onclick = chengfa_hs;
// // anniu_bl[3].onclick = chufa_hs;

// // 函数 加法
// function jiafa_hs() {
//     fuhao_bl.innerHTML = "加";
//     jieguo_shuchu_bl.innerHTML = +qian_shuru_bl.value + +hou_shuru_bl.value;
// }
// //减法
// function jianfa_hs() {
//     fuhao_bl.innerHTML = "减";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value - hou_shuru_bl.value;
// }
// //乘法
// function chengfa_hs() {
//     fuhao_bl.innerHTML = "乘";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value * hou_shuru_bl.value;
// }
// //除法
// function chufa_hs() {
//     fuhao_bl.innerHTML = "除";
//     jieguo_shuchu_bl.innerHTML = qian_shuru_bl.value / hou_shuru_bl.value;
// }

// // 第三次改进--提取函数
// //获取 DOM元素
// var jisuanqi_bl = document.querySelector('#jisuanqi');
// var qian_shuru_bl = document.querySelector('.qian_shuru');
// var hou_shuru_bl = document.querySelector('.hou_shuru');
// var fuhao_bl = document.querySelector('.fuhao');
// var jieguo_shuchu_bl = document.querySelector('.jieguo_shuchu');
// var anniu_bl = document.querySelectorAll('.anniu'); // 获取数组需要加上 ALL

// // var anniu_bl = document.querySelector('.anniu');
// // console.log(anniu_bl);

// // 绑定事件 each函数
// bianli_bangding_hs(anniu_bl, function (xiaobiao_xingcan, yuansu_xingcan) {
//     yuansu_xingcan.onclick = function () {
//         switch (this.title) {
//             case 'jia':
//                 jiafa_hs();
//                 break;
//             case 'jian':
//                 jianfa_hs();
//                 break;
//             case 'cheng':
//                 chengfa_hs();
//                 break;
//             case 'chu':
//                 chufa_hs();
//                 break;
//         }
//     }
// });

// function bianli_bangding_hs(shuzu_xingcan, hanshu_xingcan) {
//     for (var i = 0; i < shuzu_xingcan.length; i++) {
//         hanshu_xingcan(i, shuzu_xingcan[i]);
//     }
// }

// // 更新符号函数
// function genxin_fuhao_hs(fuhao_xingcan){
//     fuhao_bl.innerHTML = fuhao_xingcan;
// }

// // 加法函数
// function jia_hs(shuzi_1, shuzi_2) {
//     return +shuzi_1 + +shuzi_2;
// }
// // 减法函数
// function jian_hs(shuzi_1, shuzi_2) {
//     return shuzi_1 - shuzi_2;
// }
// // 乘法函数
// function cheng_hs(shuzi_1, shuzi_2) {
//     return shuzi_1 * shuzi_2;
// }
// // 除法函数
// function chu_hs(shuzi_1, shuzi_2) {
//     return shuzi_1 / shuzi_2;
// }

// // 输出结果函数
// function shuchu_jieguo_hs(jieguo_xingcan) {
//     jieguo_shuchu_bl.innerHTML = jieguo_xingcan;
// }


// // 函数 加法
// function jiafa_hs() {
//     // fuhao_bl.innerHTML = "加";
//     genxin_fuhao_hs('加');
//     // jieguo_shuchu_bl.innerHTML = +qian_shuru_bl.value + +hou_shuru_bl.value;
//     // jieguo_shuchu_bl.innerHTML = jia_hs(qian_shuru_bl.value, hou_shuru_bl.value);
//     shuchu_jieguo_hs( jia_hs(qian_shuru_bl.value, hou_shuru_bl.value) );
// }
// //减法
// function jianfa_hs() {
//     genxin_fuhao_hs('减');
//     shuchu_jieguo_hs( jian_hs(qian_shuru_bl.value, hou_shuru_bl.value) );
// }
// //乘法
// function chengfa_hs() {
//     genxin_fuhao_hs('乘');
//     shuchu_jieguo_hs( cheng_hs(qian_shuru_bl.value, hou_shuru_bl.value) );
// }
// //除法
// function chufa_hs() {
//     genxin_fuhao_hs('除');
//     shuchu_jieguo_hs( chu_hs(qian_shuru_bl.value, hou_shuru_bl.value) );
// }

// // 第四次改进--管理代码
// //获取 DOM元素 创建对象 管理变量
// var wrap_yuansu = document.querySelector('#jisuanqi');
// var jisuanqi_Elem = {
//     qian_shuru_bl: wrap_yuansu.querySelector('.qian_shuru'),
//     hou_shuru_bl: wrap_yuansu.querySelector('.hou_shuru'),
//     fuhao_bl: wrap_yuansu.querySelector('.fuhao'),
//     jieguo_shuchu_bl: wrap_yuansu.querySelector('.jieguo_shuchu'),
//     anniu_bl: wrap_yuansu.querySelectorAll('.anniu')
// }
// // console.log(jisuanqi_Elem.anniu_bl);

// // 绑定事件 each函数
// bianli_bangding_hs(jisuanqi_Elem.anniu_bl, function (xiaobiao_xingcan, yuansu_xingcan) {
//     yuansu_xingcan.onclick = function () {
//         switch (this.title) {
//             case 'jia':
//                 jiafa_hs();
//                 break;
//             case 'jian':
//                 jianfa_hs();
//                 break;
//             case 'cheng':
//                 chengfa_hs();
//                 break;
//             case 'chu':
//                 chufa_hs();
//                 break;
//         }
//     }
// });

// function bianli_bangding_hs(shuzu_xingcan, hanshu_xingcan) {
//     for (var i = 0; i < shuzu_xingcan.length; i++) {
//         hanshu_xingcan(i, shuzu_xingcan[i]);
//     }
// }

// // 更新符号函数
// function genxin_fuhao_hs(fuhao_xingcan) {
//     jisuanqi_Elem.fuhao_bl.innerHTML = fuhao_xingcan;
// }

// // 创建对象 管理函数
// var suansu_hanshu_dx = {
//     // 加法函数
//     jia_hs: function (shuzi_1, shuzi_2) {
//         return +shuzi_1 + +shuzi_2;
//     },
//     // 减法方法
//     jian_hs: function (shuzi_1, shuzi_2) {
//         return shuzi_1 - shuzi_2;
//     },
//     // 乘法方法
//     cheng_hs: function (shuzi_1, shuzi_2) {
//         return shuzi_1 * shuzi_2;
//     },
//     // 除法方法
//     chu_hs: function (shuzi_1, shuzi_2) {
//         return shuzi_1 / shuzi_2;
//     }
// }


// // 输出结果函数
// function shuchu_jieguo_hs(jieguo_xingcan) {
//     jisuanqi_Elem.jieguo_shuchu_bl.innerHTML = jieguo_xingcan;
// }


// // 函数 加法
// function jiafa_hs() {
//     // fuhao_bl.innerHTML = "加";
//     genxin_fuhao_hs('加');
//     // jieguo_shuchu_bl.innerHTML = +qian_shuru_bl.value + +hou_shuru_bl.value;
//     // jieguo_shuchu_bl.innerHTML = jia_hs(qian_shuru_bl.value, hou_shuru_bl.value);
//     shuchu_jieguo_hs(suansu_hanshu_dx.jia_hs(jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
// }
// //减法
// function jianfa_hs() {
//     genxin_fuhao_hs('减');
//     shuchu_jieguo_hs(suansu_hanshu_dx.jian_hs(jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
// }
// //乘法
// function chengfa_hs() {
//     genxin_fuhao_hs('乘');
//     shuchu_jieguo_hs(suansu_hanshu_dx.cheng_hs(jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
// }
// //除法
// function chufa_hs() {
//     genxin_fuhao_hs('除');
//     shuchu_jieguo_hs(suansu_hanshu_dx.chu_hs(jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
// }

// // 第五次改进--OCP 开放--封闭原则
// //获取 DOM元素 创建对象 管理变量
// var wrap_yuansu = document.querySelector('#jisuanqi');
// var jisuanqi_Elem = {
//     qian_shuru_bl: wrap_yuansu.querySelector('.qian_shuru'),
//     hou_shuru_bl: wrap_yuansu.querySelector('.hou_shuru'),
//     fuhao_bl: wrap_yuansu.querySelector('.fuhao'),
//     jieguo_shuchu_bl: wrap_yuansu.querySelector('.jieguo_shuchu'),
//     anniu_bl: wrap_yuansu.querySelectorAll('.anniu')
// };
// // console.log(jisuanqi_Elem.anniu_bl);

// // 绑定事件 each函数
// bianli_bangding_hs(jisuanqi_Elem.anniu_bl, function (xiaobiao_xingcan, yuansu_xingcan) {
//     yuansu_xingcan.onclick = function () {
//         // 更新符号函数
//         genxin_fuhao_hs(this.value);
//         shuchu_jieguo_hs(chaozuo_hs(this.title, jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
//         //         // 添加新方法 mod
//         //     case 'mod':
//         //         modfa_hs();
//         //         break;
//         // }
//     }
// });

// function bianli_bangding_hs(shuzu_xingcan, hanshu_xingcan) {
//     for (var i = 0; i < shuzu_xingcan.length; i++) {
//         hanshu_xingcan(i, shuzu_xingcan[i]);
//     }
// }

// // 更新符号函数
// function genxin_fuhao_hs(fuhao_xingcan) {
//     jisuanqi_Elem.fuhao_bl.innerHTML = fuhao_xingcan;
// }

// // 运算函数 代替switch 
// function chaozuo_hs(hanshuming_xingcan, shuzi_1, shuzi_2) {
//     // 先判断传入 运算函数名 如 add 是否存在,如果 为假 抛出错误
//     if (!suansu_hanshu_dx[hanshuming_xingcan]) throw new Error('不存在名为' + hanshuming_xingcan + '的运算方法');
//     return suansu_hanshu_dx[hanshuming_xingcan](shuzi_1, shuzi_2); //调用下面方法 
// }

// // 创建对象 管理函数
// var suansu_hanshu_dx = {
//     // 加法函数
//     jia: function (shuzi_1, shuzi_2) {
//         return +shuzi_1 + +shuzi_2;
//     },
//     // 减法方法
//     jian: function (shuzi_1, shuzi_2) {
//         return shuzi_1 - shuzi_2;
//     },
//     // 乘法方法
//     cheng: function (shuzi_1, shuzi_2) {
//         return shuzi_1 * shuzi_2;
//     },
//     // 除法方法
//     chu: function (shuzi_1, shuzi_2) {
//         return shuzi_1 / shuzi_2;
//     },

//     // mod法方法
//     mod: function (shuzi_1, shuzi_2) {
//         return shuzi_1 % shuzi_2;
//     },

//     // 提供方法 给外部添加新运算方法
//     tianjia_fangfa_hs: function(fangfaming_xingcan, hanshuming_xingcan) {
//         // 判断方法是否已经存在 如果不存在 则指向这个新方法
//         if(!this[fangfaming_xingcan]) {
//             this[fangfaming_xingcan] = hanshuming_xingcan;
//         }
//         return this; // 链式调用
//     }
// };

// // 在外部添加新方法
// suansu_hanshu_dx.tianjia_fangfa_hs('power', function(shuzi_1, shuzi_2){
//     return Math.pow(shuzi_1, shuzi_2);
// });

// // 输出结果函数
// function shuchu_jieguo_hs(jieguo_xingcan) {
//     jisuanqi_Elem.jieguo_shuchu_bl.innerHTML = jieguo_xingcan;
// }

// // //mod法
// // function modfa_hs() {
// //     genxin_fuhao_hs('%');
// //     shuchu_jieguo_hs(suansu_hanshu_dx.mod_hs(jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
// // }

// 第六次改进--模块化
(function () {
    //获取 DOM元素 创建对象 管理变量
    var wrap_yuansu = document.querySelector('#jisuanqi');
    var jisuanqi_Elem = {
        qian_shuru_bl: wrap_yuansu.querySelector('.qian_shuru'),
        hou_shuru_bl: wrap_yuansu.querySelector('.hou_shuru'),
        fuhao_bl: wrap_yuansu.querySelector('.fuhao'),
        jieguo_shuchu_bl: wrap_yuansu.querySelector('.jieguo_shuchu'),
        anniu_bl: wrap_yuansu.querySelectorAll('.anniu')
    };
    // console.log(jisuanqi_Elem.anniu_bl);

    // 绑定事件 each函数
    bianli_bangding_hs(jisuanqi_Elem.anniu_bl, function (xiaobiao_xingcan, yuansu_xingcan) {
        yuansu_xingcan.onclick = function () {
            // 更新符号函数
            genxin_fuhao_hs(this.value);
            shuchu_jieguo_hs(chaozuo_hs(this.title, jisuanqi_Elem.qian_shuru_bl.value, jisuanqi_Elem.hou_shuru_bl.value));
            //         // 添加新方法 mod
            //     case 'mod':
            //         modfa_hs();
            //         break;
            // }
        }
    });

    function bianli_bangding_hs(shuzu_xingcan, hanshu_xingcan) {
        for (var i = 0; i < shuzu_xingcan.length; i++) {
            hanshu_xingcan(i, shuzu_xingcan[i]);
        }
    }

    // 更新符号函数
    function genxin_fuhao_hs(fuhao_xingcan) {
        jisuanqi_Elem.fuhao_bl.innerHTML = fuhao_xingcan;
    }

    // 运算 封装成 匿名函数 自执行
    var chaozuo_hs = (function () {

        // 创建对象 管理函数
        var suansu_hanshu_dx = {
            // 加法函数
            jia: function (shuzi_1, shuzi_2) {
                return +shuzi_1 + +shuzi_2;
            },
            // 减法方法
            jian: function (shuzi_1, shuzi_2) {
                return shuzi_1 - shuzi_2;
            },
            // 乘法方法
            cheng: function (shuzi_1, shuzi_2) {
                return shuzi_1 * shuzi_2;
            },
            // 除法方法
            chu: function (shuzi_1, shuzi_2) {
                return shuzi_1 / shuzi_2;
            },

            // mod法方法
            mod: function (shuzi_1, shuzi_2) {
                return shuzi_1 % shuzi_2;
            },

            // 提供方法 给外部添加新运算方法
            tianjia_fangfa_hs: function (fangfaming_xingcan, hanshuming_xingcan) {
                // 判断方法是否已经存在 如果不存在 则指向这个新方法
                if (!suansu_hanshu_dx[fangfaming_xingcan]) {
                    suansu_hanshu_dx[fangfaming_xingcan] = hanshuming_xingcan;
                }
                // return this; // 链式调用
                return suansu_hanshu_dx; // 链式调用
            }
        };

        // 运算函数 代替switch 
        function chaozuo_hs(hanshuming_xingcan) {
            // 先判断传入 运算函数名 如 add 是否存在,如果 为假 抛出错误
            if (!suansu_hanshu_dx[hanshuming_xingcan]) throw new Error('不存在名为' + hanshuming_xingcan + '的运算方法');
            // return suansu_hanshu_dx[hanshuming_xingcan](shuzi_1, shuzi_2); //调用下面方法
            return suansu_hanshu_dx[hanshuming_xingcan].apply(suansu_hanshu_dx, [].slice.call(arguments, 1, arguments.length));
        }
        chaozuo_hs.tianjia_fangfa_hs = suansu_hanshu_dx.tianjia_fangfa_hs;

        return chaozuo_hs;

    })();

    // 在外部添加新方法
    chaozuo_hs.tianjia_fangfa_hs('power', function (shuzi_1, shuzi_2) {
        return Math.pow(shuzi_1, shuzi_2);
    });

    // 输出结果函数
    function shuchu_jieguo_hs(jieguo_xingcan) {
        jisuanqi_Elem.jieguo_shuchu_bl.innerHTML = jieguo_xingcan;
    }
})()