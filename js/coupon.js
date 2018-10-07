// 声明一个全局变量用来存放要请求网址的公共部分
var baseURL = 'http://localhost:9090/api/';

// 1.页面一打开就发起请求
$.ajax({
    url: baseURL + 'getcoupon',
    type: 'get',
    success: function(obj){
        console.log(obj);

        var str = '';
        for(var i=0;i<obj.result.length;i++){
            str += '<li class="col-xs-4"><a href="'+ obj.result[i].couponLink+'?couponId='+ obj.result[i].couponId +'"><img data-original="'+ obj.result[i].couponImg +'" alt="'+ obj.result[i].couponTitle +'"></a></li>';
        }

        $('#main>ul').html(str);
        $('ul img').lazyload({
            effect: "fadeIn",
            placeholder:'../images/feizhai.jpg'
        });
    }
});

// 用于实现页面加载动画的函数
function load() {
    var a= setTimeout("loading.style.transition='opacity 0.3s'",0)   
    //设置透明度改变的过渡时间为0.3秒
    var b= setTimeout("loading.style.opacity=0",500)
    //0.5秒后加载动画开始变为透明
    var c= setTimeout("loading.style.display='none'",800)
    //当透明度为0的时候，隐藏掉它
}

// $(function(){
//     $('ul img').lazyload({
//         effect: "fadeIn",
//         placeholder:'../images/feizhai.jpg'
//     });
// });