<?php

//require('init.php');

$pic=$_FILES["file"]["name"];
$i=$_POST['hidden'];
$name=$_POST['case_name'];
$date=$_POST['case_date'];
$text=$_POST['text'];

$url="../images_case_cover/";
//if (file_exists($url.$_FILES["file"]["name"])){
//        echo 'exist';
//    }else{
        move_uploaded_file($_FILES["file"]["tmp_name"],$url. $_FILES["file"]["name"]);


        //header('Content-Type:text/plain;charset=UTF-8');

        $conn=mysqli_connect('localhost','root','','lando',3306);
        $sql="SET NAMES UTF8";
        mysqli_query($conn,$sql);

        if($pic==''){
            $sql="UPDATE lando_case SET title='$name',pubTime='$date',content='$text' WHERE cid='$i'";
        }else{
            $sql="UPDATE lando_case SET title='$name',pubTime='$date',picture='$pic',content='$text' WHERE cid='$i'";
        }
        $result=mysqli_query($conn,$sql);

        if($result==true){
            echo "succ";
        }else{
            echo "err";
        }
//    }
