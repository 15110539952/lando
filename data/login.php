<?php
header("Content-Type:text/plain;charset='utf-8'");

@$aid=$_REQUEST['uid'] or die('id require');
@$apwd=$_REQUEST['upwd'] or die('pwd require');


$conn=mysqli_connect('127.0.0.1','root','','lando',3306);

$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$sql="SELECT * FROM lando_admin WHERE aname='$aid' AND apwd='$apwd'";
$result=mysqli_query($conn,$sql);

if($result===false){
    echo 'ERR'.$sql;
}else{
    $row=mysqli_fetch_array($result);
    if($row){
        echo 'succ';
    }else{
        echo 'err';
    }
}


