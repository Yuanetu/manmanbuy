$(function(){
    // 实例化对象
    var classify = new MMB ();
    classify.mainTitle();  //调用原型对象中获取标题的方法

});

// 控制分类内容显示或隐藏和箭头方向的函数
function titleMain(id){
    // 控制分类内容的显示或隐藏
    $('.content #id'+id).toggleClass('active');
    // $('.content #id'+id).toggle();

    // 控制箭头的方向
    $('.title #id'+id).toggleClass('fa-arrow-down');
    $('.title #id'+id).toggleClass('fa-arrow-up');

    }

// 获取商品分类内容的函数
function mainContent(id){
    //1.发送请求
    $.ajax({
        url: 'http://localhost:9090/api/getcategory',
        data: {titleid:id},
        success:function (obj) { 
            console.log(obj);
            console.log(obj.result.length%3);
            
            //2.调用分类内容模板
            var html = template('contentTpl',obj);
            $('.content #id'+id).html(html);

            // 判断需不需要添加多于的li标签凑足格数
            if(obj.result.length%3 == 1){
                var list = $('<li></li><li></li>');
                $('.content #id'+id).append(list);
            }
            if(obj.result.length%3 == 2){
                var list = $('<li></li>');
                $('.content #id'+id).append(list);
            }


        }
    });
}

// 1.创建分类的构造函数
var MMB = function () {

};

MMB.prototype = {
    // 在原型对象上写一个baseURL API的前缀网址 ,本地或者网络的
    baseURL: 'http://localhost:9090/api/',
    // baseURL: 'http://mmb.ittun.com/api/',

    // 2-1.获取商品分类标题信息的方法
    mainTitle: function(){
        // 2-2.发送请求
        $.ajax ({
            url: this.baseURL+'getcategorytitle',
            success: function(obj){
                // console.log(obj);

                // 2-3.调用分类标题模板
                var html  = template ('titleTpl',obj);
                $('.dropdown').html(html);
            }

        });
    },

    // 3.获取商品分类信息内容的方法
    // mainContent: function(id){
    //     //3-3.发送请求
    //     $.ajax({
    //         url: this.baseURL+'getcategory',
    //         data: {titleid:0},
    //         success:function (obj) { 
    //             // console.log(obj);

    
    //         }
    //     });
    // }
    
}


// 用于实现页面加载动画的函数
function load() {
    var a= setTimeout("loading.style.transition='opacity 0.3s'",0)   
    //设置透明度改变的过渡时间为0.3秒
    var b= setTimeout("loading.style.opacity=0",500)
    //0.5秒后加载动画开始变为透明
    var c= setTimeout("loading.style.display='none'",800)
    //当透明度为0的时候，隐藏掉它
}



