// 声明一个全局变量用来存放要请求网址的公共部分
var baseURL = 'http://localhost:9090/api/';


// 商品详情的js代码区域
//1.获取商品的id,分类的id,商品的品牌名称
var url = decodeURIComponent(window.location.href);  //获取当前页面的URL
// decodeURIComponent();//进行解码，可将页面乱码转换成中文。

var productId = url.slice(url.indexOf('?')+11,url.indexOf('&'));  //获取该商品的id
var categoryId = url.slice(url.indexOf('&')+12,url.indexOf('brandName')-1);  //获取分类的id
console.log(productId);
console.log(categoryId);

var brandName = url.slice(url.indexOf('brandName')+10);  //该商品的品牌名称
console.log(brandName);


// 2.页面一打开就发送请求,请求商品的详细信息
$.ajax({
    url: baseURL + 'getproduct',
    type: 'get',
    data: {productid:productId},
    success: function(obj){
        console.log(obj);
        // console.log(obj.result[0]);

        // 2-1.拼接商品信息
        var productStr = 
        '<div class="info">' + obj.result[0].productName + '</div>'+
        '<div class="icon">'+ obj.result[0].productImg+'</div>'+
        '<a href="#"><img src="http://www.zuyushop.com/wap/images/sc.jpg" alt=""></a>';

        // 2-2.把商品信息添加到页面
        $('.detail').html(productStr);

        // 2-3.把商品比价购买店铺添加到页面
        $('.price>.text1').html(obj.result[0].bjShop);
    }
});

// 3.页面一打开就发送请求,请求评价的信息
$.ajax({
    url: baseURL + 'getproductcom',
    type: 'get',
    data: {productid:productId},
    success: function(obj){
        console.log(obj);

        // 3-1.拼接评价的内容
        var str = '';
        for(var i=0;i<obj.result.length;i++){

            str += '<li><p>'+ obj.result[i].comName +'<span>'+ obj.result[i].comTime +'</span></p><p>'+ obj.result[i].comFrom +'</p><p>'+ obj.result[i].comContent +'</p></li>';
        }

        // 3-2.把拼接内容添加到页面
        $('#evaluate>.content>ul').html(str);
        // 3-3.把获取到的商品品牌名称添加到页面
        $('#nav>ul>li').eq(2).children().html(brandName);


    }
});

// 4.为电视按钮注册点击事件,并添加事件处理函数
$('nav .category>a').click(function(e){
    // 1.阻止a标签的默认行为
    e = e || window.event;
    e.preventDefault();

    //2.返回商品列表页
    location = 'productsList.html?id='+categoryId;
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
