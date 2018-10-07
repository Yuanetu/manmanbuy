// 声明一个全局变量用来存放要请求网址的公共部分
var baseURL = 'http://localhost:9090/api/';

var slideList = '<ul class="clearfix">';  //声明一个全局变量,用来实现轮播图的拼接;

var index = 0;   //用来存放当前li标签的下标 ,实现轮播图的播放

// 主体的js代码区域
// 1.获取优惠卷的id
var url = window.location.href;   //获取当前页面的url
var couponId = url.slice(url.indexOf('?')+10);  //获取到优惠卷的id
// console.log(couponId);

// 2.页面一打开就发起请求
$.ajax({
    url: baseURL + 'getcouponproduct',
    type: 'get',
    data: {couponid:couponId},
    success: function (obj) {
        console.log(obj);
        
        // 2-1.拼接优惠卷信息
        var str = '';
        for(var i=0;i<obj.result.length;i++){
            str += '<li><a href="#"><div class="icon-text clearfix">'+ obj.result[i].couponProductImg
            +'<P>'+  obj.result[i].couponProductName +'</P><P>'+ obj.result[i].couponProductPrice 
            +'</P></div><p class="time">'+ obj.result[i].couponProductTime +'</p></a></li>';

            // 2-3.拼接轮播图
            slideList += '<li index="'+i+'">' +obj.result[i].couponProductImg+ '</li>';

            // 2-4.在最后加上第一张图,实现无限轮播
            if(i == obj.result.length-1){
                slideList += '<li index="0">' +obj.result[0].couponProductImg+ '</li>';
            }
        }

        // 2-3.拼接轮播图
        slideList += '</ul>';

        // 2-2.添加到页面中
        $('.content>ul').html(str);
        $('#slide').html(slideList);
    }
});

// 3.使用事件委托,为每张优惠卷注册点击事件,并添加事件处理函数
$('.content ul').on('click','li>a>div>img',function(){
    $('#mask').show();

    $('#arrow>div').show();

    $('#slide').show();

    $('#close').show();
});

// 4.为左箭头注册点击事件
$('.l-arrow').click(function(){
    // console.log(1);

    var ul = document.querySelector('#slide>ul');

    // (1)边界检测
    if(index == 0){//如果是第一张  index = 0
        //修改index为最大下标
        index = $('#slide>ul>li').length-1;

        //瞬间修改ul的位置为最后一张
        ul.style.left = -index*$('#slide>ul>li').width() + 'px';
    }

    // (2)图片下标-1
    index--;
    // (3)动画滚动图片 移动距离：  -index* li标签盒子的宽度
    $('#slide>ul').stop(true,false).animate({
        left: -index*$('#slide>ul>li').width()
    });
});


// 5.为右箭头注册点击事件
$('.r-arrow').click(function(){

    var ul = document.querySelector('#slide>ul');
    // (1)编辑检测
    if(index == $('#slide>ul>li').length-1){  // 如果index为图片数组的最大下标,则不动
        ul.style.left = '0px';  //瞬间改变ul的位置为0

        index = 0;  //下标复位
    }

    // (2)图片下标+1
    index++;
    // (3)动画滚动图片 移动距离：  -index* li标签盒子的宽度
    $('#slide>ul').stop(true,false).animate({
        left: -index*$('#slide>ul>li').width()
    });
});


// 6.关闭按钮注册点击事件
$('#close').click(function(){
    $('#mask').hide();

    $('#arrow>div').hide();

    $('#slide').hide();

    $('#close').hide();
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
