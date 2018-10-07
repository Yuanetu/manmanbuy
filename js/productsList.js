// 声明一个全局变量用来存放要请求网址的公共部分
var baseURL = 'http://localhost:9090/api/';

var currenPage;
var totalPage;

// 商品列表的js代码区域
//1.获取分类的id和名称
var url = decodeURIComponent(window.location.href);  //获取当前页面的URL
// decodeURIComponent();//进行解码，可将页面乱码转换成中文。

if(url.indexOf('&')>0){
    var index = url.slice(url.indexOf('?')+4,url.indexOf('&'));  //获取该分类的id
    console.log(index);
    
    var categoryName = url.slice(url.indexOf('&')+6);  //获取该分类的名称
    console.log(categoryName);
}
else {
    var index = url.slice(url.indexOf('?')+4);  //获取该分类的id
}



// 2.页面一打开就发送请求
loadData(1);

function loadData (page){
    $.ajax({
        url: baseURL + 'getproductlist',
        type: 'get',
        data: {categoryid:index,pageid:page},
        success: function(obj){
            console.log(obj);
            // console.log(obj.totalCount);
            
            //3.调用模板
            var html = template('tpl',obj);
            $('#products>ul').html(html);

            //4.计算出总页数
            var pageNum = obj.totalCount / obj.pagesize;
            // console.log(totalPage);
            
            totalPage = Math.ceil(pageNum); //保存总页数

            currenPage = page; //保存当前页码

            //5.判断,只有在第一页时才重新覆盖,不判断的话,每次触发change事件,都会重新生成
            // option标签并覆盖上次的,这样的话第一个option会永远是默认被选中,触发不了change事件
            if(page == 1){
                var str = '';
                
                for(var i=1;i<=totalPage;i++){
                    str += '<option value="'+ i +'">'+ i + ' / ' + totalPage + '</option>';
                }

                $('select').html(str);
            }
            // 6.把获取到的商品品牌名称添加到页面
            $('#nav>ul>li').eq(2).children().html(categoryName);
        }
    });
}

// 6.为select注册change事件
$('select').change(function(){
    // 6-1.返回页面顶部
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // 6-2.调用发送请求函数
    loadData($('select').val());
});

// 7.为上一页注册点击事件
$('.up>a').click(function(e){
    // 阻止a标签的默认行为
    // e = e || window.event;
    // e.preventDefault();
    // 如果不阻止,可以实现返回顶部

    if(currenPage==1){
        loadData(totalPage);
    }
    else{
        loadData(currenPage-1);
    }

});

// 8.为下一页注册点击事件
$('.down>a').click(function(e){
    // 阻止a标签的默认行为
    // e = e || window.event;
    // e.preventDefault();
    // 如果不阻止,可以实现返回顶部

    if(currenPage==totalPage){
        loadData(1);
    }
    else{
        loadData(currenPage+1);
    }

});


// 9.为筛选按钮注册点击事件,并添加事件处理函数
$('.filtrate').click(function(e){
    // 1.阻止a标签的默认行为
    e = e || window.event;
    e.preventDefault();

    // 2.控制筛选页面和遮罩层的显示
    $('#filtratePage').show();
    $('#mask').show();
});

// 10.为筛选页面中的关闭按钮注册点击事件,并添加事件处理函数
$('.headTitle>i').click(function () { 
    // 控制筛选页面和遮罩层的隐藏
    $('#filtratePage').hide();
    $('#mask').hide();
 });

// 11.为筛选页面中的展开按钮注册点击事件,并添加事件处理函数
 $('.rowhead>a').click(function(e){
    // 11-1.阻止a标签的默认行为
    e = e || window.event;
    e.preventDefault();

    // 11-2.判断展开还是合并
    if(this.innerText == '∨'){
        $(this).parent().next().addClass('heightauto');
        this.innerText = '∧';
    }
    else{
        $(this).parent().next().removeClass('heightauto');
        this.innerText = '∨';

    }
 });

// 12.为筛选页面中的每个选项注册点击事件,并添加事件处理函数
$('.rowbody>ul>li').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
 });

// 13.用于实现页面加载动画的函数
function load() {
    var a= setTimeout("loading.style.transition='opacity 0.3s'",0)   
    //设置透明度改变的过渡时间为0.3秒
    var b= setTimeout("loading.style.opacity=0",500)
    //0.5秒后加载动画开始变为透明
    var c= setTimeout("loading.style.display='none'",800)
    //当透明度为0的时候，隐藏掉它
}