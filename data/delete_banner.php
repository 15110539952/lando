<?php

header('Content-Type:text/plain;charset=UTF-8');

@$pic=$_REQUEST['pic'] or die('id required');
$result=unlink('../images/'.$pic);

if($result){

    @$bid=$_REQUEST['bid'] or die('id required');

    $conn=mysqli_connect('localhost','root','','lando',3306);
    $sql="SET NAMES UTF8";
    mysqli_query($conn,$sql);

    $sql="DELETE FROM banner WHERE bid=$bid";

    $result=mysqli_query($conn,$sql);

    if($result==true){
        echo "succ";
    }else{
        echo "err";
    }
}