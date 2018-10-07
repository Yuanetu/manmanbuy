// 声明一个全局变量用来存放要请求网址的公共部分
var baseURL = 'http://localhost:9090/api/';


//----- 导航js代码区域-----
// 1.页面一打开,就发送请求
$.ajax({   //这里为什么不能用get请求
    url : baseURL+ 'getindexmenu',
    type: 'get',
    // dataType: 'json',  //为什么这里不用加这句
    success: function(obj){
        // console.log(obj);

        // 2.声明一个全局变量用来拼接导航栏的内容
        var str = '';
        for(var i=0; i<3;i++){
            str += '<ul class="row">';

            for(var j=i*4;j<obj.result.length;j++){

                // 3.判断,如果是是跟多,则添加行内点击事件,如果是比价搜索,则跳转到比价搜索的页面
                if(obj.result[j].name == '更多'){
                    str += '<li class="col-xs-3"><a href="javascript: more()">'+obj.result[j].img+'<p>'+obj.result[j].name+'</p></a></li>';
                }
                else if(obj.result[j].name == '比价搜索'){
                    str += '<li class="col-xs-3"><a href="classify.html">'+obj.result[j].img+'<p>'+obj.result[j].name+'</p></a></li>';
                }
                else if(obj.result[j].name == '优惠券'){
                    str += '<li class="col-xs-3"><a href="coupon.html">'+obj.result[j].img+'<p>'+obj.result[j].name+'</p></a></li>';
                }
                else {
                    str += '<li class="col-xs-3"><a href="#">'+obj.result[j].img+'<p>'+obj.result[j].name+'</p></a></li>';

                }
                // 4.用来实现每4个图标换一行
                if(j==3+i*4){
                    break;
                }
            }

            str += '</ul>';
        }
        // 5.把拼接好的内容添加到导航栏的容器中
        $('#nav>.container').html(str);
        
    }
});

// 6.声明一个显示或隐藏更多的函数
function more(){
    $('#nav>.container').children('ul').eq(2).toggle();
}


//----- 主体js代码区域-----
// 1.页面一打开就发送请求
$.ajax({
    url: baseURL + 'getmoneyctrl',
    type: 'get',
    success: function(obj){
        console.log(obj);

        //2.调用商品内容模板
        var html = template('tpl',obj);

        $('.products>ul').html(html);
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
