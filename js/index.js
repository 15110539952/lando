/**
 * Created by 33214 on 2017/2/20.
 */





function ld_banner() {
    var number=$(".banner ul li").size()-1;//����±�
    var cur=0;//��ǰ��ʾ��ͼƬ
    var banner=$(".banner ul li");
    var indicator=$(".indicator>a");
    function slideNext(){
        if(cur<number){
            banner.eq(cur).css({'z-index':10}).stop().fadeOut();
            banner.eq(cur+1).css({'z-index':20}).stop().fadeIn();
            cur++;
            indicator.removeClass('active').eq(cur).addClass('active');
        }else{
            banner.eq(cur).css({'z-index':10}).stop().fadeOut();
            banner.eq(0).css({'z-index':20}).stop().fadeIn();
            cur=0;
            indicator.removeClass('active').eq(cur).addClass('active');
        }
    }
    function slidePrev(){
        if(cur>0){
            banner.eq(cur).css({'z-index':10}).stop().fadeOut();
            banner.eq(cur-1).css({'z-index':20}).stop().fadeIn();
            cur--;
            indicator.removeClass('active').eq(cur).addClass('active');
        }else{
            banner.eq(cur).css({'z-index':10}).stop().fadeOut();
            banner.eq(number).css({'z-index':20}).stop().fadeIn();
            cur=number;
            indicator.removeClass('active').eq(cur).addClass('active');
        }
    }
    $(".next").click(function(){slideNext()});
    $(".prev").click(function(){slidePrev()});

    var timer=setInterval(slideNext,5000);

    banner.mouseover(function () {
        clearInterval(timer);
    });
    banner.mouseout(function () {
        timer=setInterval(slideNext,5000);
    })

    //СԲ��ָʾ��
    indicator.click(function (e) {
        e.preventDefault();
    });
    indicator.mouseover(function () {
        var now=$(this).index();
        banner.eq(cur).css({'z-index':10}).stop().fadeOut();
        banner.eq(now).css({'z-index':20}).stop().fadeIn();
        cur=now;
        indicator.removeClass('active');
        $(this).addClass('active');
    });


    $(".banner").on("touchstart", function(e) {
        e.preventDefault();
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $(".banner").on("touchend", function(e) {
        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX,
        moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;

        if ( X > 0 ) {
            slidePrev();
        }
        else if ( X < 0 ) {
            slideNext();
        }
        //else if ( Y > 0) {
        //    alert("top 2 bottom");
        //}
        //else if ( Y < 0 ) {
        //    alert("bottom 2 top");
        //}
        //else{
        //    alert("just touch");
        //}
    });



};



//ê����ת����
$(function(){

    $("ul.nav-bar>li>a").click(function(){
        if($(this).attr("href")!=="#"){
            var top=$($(this).attr("href")).offset().top-50;
            $("html,body").animate({scrollTop:top},1000);
        }
    });

    $.ajax({
        type:"get",
        url:"data/banner.php",
        success: function (d) {
            var data=d.data;
            console.log(data);
            var html="",indicator='';
            for(var i=0;i<data.length;i++){
                if(i==0){
                    html+=`<li style="z-index:20; display:block;background:#fff url(${data[i].pic}) no-repeat center 0;"><a target="_blank" class="link" href="${data[i].burl}"></a></li>`
                    indicator+='<a href="#" class="active"></a>'
                }else{
                    html+=`<li style="background: #fff url(${data[i].pic}) no-repeat center 0"><a target="_blank" class="link" href="${data[i].burl}"></a></li>`;
                    indicator+='<a href="#"></a>';
                }
            }
            $('.banner ul').html(html);
            $('.banner .indicator').html(indicator);
            ld_banner();
        }

    });


    $.ajax({
        type:"get",
        url:"data/case.php",
        success: function (d) {
            var data=d.data;
            var html="";
            for(var i=0;i<12;i++){
                //var tt=dateFormat(parseInt(data[i].pubTime),'-');
                var t=new Date(parseInt(data[i].pubTime));
                var tt=t.getFullYear()+'-'+t.getMonth()+1+'-'+t.getDate();
                html+=`
                <div class="case_all">
                    <div class="case">
                        <img src="images_case_cover/${data[i].picture}"/>
                    <div class="a-bg">
                        <div class="a-content">
                            <h2><a href="#">${data[i].title}</a>
                                <span>${i}</span></h2>
                            <b></b>
                            <p>${tt}</p>
                        </div>
                    </div>
                    </div>
                </div>`;
            }
            $('.jccase .row').html(html);

            //案例详情
            $('.jccase').on('click','.a-content a',function(e){
                e.preventDefault();
                $('.detail_model').fadeIn(300);
                var i=$(this).next('span').html();
                var t=new Date(parseInt(data[i].pubTime));
                var tt=t.getFullYear()+'-'+t.getMonth()+1+'-'+t.getDate();
                var html=`<h1>${data[i].title}<br/>
                            <span>${tt}</span>
                        </h1>
                        <p><b></b></p>
                        <h4>
                            ${data[i].content}
                        </h4>`;
                $('.detail_left').html(html);

                $.ajax({
                    type:"get",
                    url:"data/case_detail.php",
                    data:{i:parseInt(i)+1},
                    success: function (d) {
                        console.log(d);
                        var data=d.data;
                        var html="";
                        for(var i=0;i<data.length;i++){
                            html+=`
                            <img src="${data[i].pic}"/>
                            <p>${data[i].pname}</p>`;
                        }
                        $('.detail_right>div').html(html);
                    },
                    error: function () {
                        alert("案例加载失败，请重试！")
                    }
                });


            });


        }

    });


    setTimeout(function () {
		$('.lando').css({'margin-top':'-1500px'});
	},1000);



});


//��������
setTimeout(function () {
    //$(".lando").fadeOut(500);
    $('.lando').css({'display':'none'});
},3000);



//banner ���Ҽ��л�
$(".banner").on("mouseenter",function () {
    $(".banner .cut").show(300);
});

$(".banner").on("mouseleave",function () {
    $(".banner .cut").hide(300);
});


//$(".banner").on("mouseenter",function () {
//    $(".banner .cut").fadeIn(300);
//});
//
//$(".banner").on("mouseleave",function () {
//    $(".banner .cut").fadeOut(300);
//})






$(".detail").on('click','a',function(e){
    e.preventDefault();
    $('.detail_model').fadeOut(300);
});













