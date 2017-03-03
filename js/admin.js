/**
 * Created by 33214 on 2017/2/23.
 */

//管理员账号设置：
console.log(sessionStorage.getItem('userId'));
$(".header>h1>span").html(sessionStorage.getItem('userId'));

function addBanner(){
    $.ajax({
        type:"get",
        url:"../data/banner.php",
        success: function (d) {
            var data=d.data;
            console.log(data);
            var html="";
            for(var i=0;i<data.length;i++){
                html+=`
                <tr>
                <td>${data[i].bid}</td>
                <td><img src="../${data[i].pic}" /></td>
                <td>${data[i].burl}</td>
                <td><button>删除</button></td>
                </tr>
                `;
            }
            $('.admin_banner tbody').html(html);
        }

    });
}

addBanner();


//banner删除

$(".admin_banner tbody").on("click",'button', function () {

    var result=window.confirm('是否删除啊啊啊');
    if(result){
        var bid=$(this).parent().parent().children(":first").html();
        var pic=$(this).parent().parent().children(":nth-child(2)").children(":first").attr('src');
        console.log(bid);
        console.log(pic);
        $.ajax({
            type:"post",
            url:"../data/delete_banner.php",
            data:{"bid":bid,pic:pic},
            success: function (result){
                if(result=='succ'){
                    alert("删除成功！");
                    addBanner();
                }else{
                    alert("删除失败，请重试！");
                }
            },
            error: function (result) {
                console.log(result);
                console.log("有问题")
            }
        });
    }
});


//banner图片链接
$('#imgUpload').change(function(){
    // 获取FileList的第一个元素
    var f = document.getElementById('imgUpload').files[0];
    var src = window.URL.createObjectURL(f);
    console.log(src);
    $('#preview').css({'width':'300px'}).attr('src',src);
    if(f){
        $('.admin_banner .btn').attr('disabled',false);
    }
});



$('.form .btn').on('click', function () {
    //var data = new FormData($('.form')[0]);

    //console.log(data);
    //var pic=document.getElementById('imgUpload').files[0].name;
    var data=new FormData($('.form')[0]);

    $.ajax({
        type:"post",
        url:"../data/addbanner.php",
        data: data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if(result=='exist'){
                alert("图片已存在，请换一张，或者修改文件名！");
            }else if(result=='succ'){
                alert("上传成功！");
                addBanner();
            }else{
                alert("上传失败，请重试！");
            }
        },
        error: function (result) {
            console.log("报错");
        }
    });
});

    $('.form .close').on('click', function (e) {
        e.preventDefault();
        $('.banner_model').css({"display":"none"});
    });
    $('.admin_banner table .btn_s').on('click', function (e) {
        e.preventDefault();
        $('.banner_model').css({"display":"block"});
    });






//案例部分

//banner case 切换
$('.nav>ul>li').click(function () {
    $(this).addClass('active').siblings()
        .removeClass('active');
    var i=$(this).attr('data-index');
    //i++;
    $('section>div').css('display','none');
    $('section>div:nth-child('+i+')').css('display','block');
});

//模态框弹出关闭

$('.admin_case .case_model').on('click','form>a', function (e) {
    e.preventDefault();
    $('.case_model').css({"display":"none"});
});

$('.admin_case').on('click','.alter', function () {
    $('.case_model').css({'display':'block'});

    var i=$(this).parent().parent().children(':first-child').html();

    $('.case_model .hidden').val(i);

    var name=$(this).parent().parent().children('td:nth-child(2)').html();
    $('.case_model .case_name').val(name);

    var date=$(this).parent().parent().children('td:nth-child(3)').html();
    $(".case_model input[name='case_date']").val(date);

    var content=$(this).parent().parent().children('td:nth-child(4)').children().attr("src");

    $('.case_model .case_img').attr('src',content);

    var text=$(this).parent().parent().children('td:nth-child(5)').html();
    $('.case_model textarea').val(text);

});

$('#case_imgUpload').change(function(){
    // 获取FileList的第一个元素
    //var file = $(this).val();
    //var str=file.split('\\');
    //f=str[str.length-1];
    var f = document.getElementById('case_imgUpload').files[0];
    var src = window.URL.createObjectURL(f);
    $('.case_img').attr('src',src);
    //if(f){
    //    $('.case_content_btn').attr('disabled',false);
    //}
});



//案例请求

function update_case(){
	$.ajax({
    type:'get',
    url:'../data/case.php',
    success: function (d) {
        var data=d.data;
        var html="";
        for(var i=0;i<data.length;i++){
            var t=new Date(parseInt(data[i].pubTime));
            t=t.getFullYear()+'-'+t.getMonth()+1+'-'+t.getDate();
            html+=`
                <tr>
                    <td>${data[i].cid}</td>
                    <td class="case_name">${data[i].title}</td>
                    <td>${t}</td>
                    <td><img src="../images_case_cover/${data[i].picture}"/></td>
                    <td class="case_content">${data[i].content}</td>
                    <td>
                        <button class="alter">修改</button>
                        <button class="delete">删除</button>
                        <button class="case_detail">查看详情</button>
                    </td>
                </tr>
            `;
        }
        $('.admin_case>table>tbody').html(html);
    }
	});
}

update_case();

//案例修改


$('.case_content_btn').click(function(){

    //var i=$('.case_model .hidden').val();
    //
    //var name=$('.case_model .case_name').val();
    //
    //var date=$(".case_model input[name='case_date']").val();
    //
    //var img=$('.case_model .case_img').attr('src');
    //
    //var text=$('.case_model textarea').val();

    var data=new FormData($('.case_model>form')[0]);

    $.ajax({
        type:"post",
        url:"../data/updatecase.php",
        data: data,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            console.log(result);
            if(result=='exist'){
                alert("图片已存在，请换一张，或者修改文件名！");
            }else if(result=='succ'){
                alert("上传成功！");
                update_case();
            }else{
                alert("上传失败，请重试！");
            }
        },
        error: function (result) {
            console.log(result);
            console.log("报错");
        }
    });
});

//案例删除



