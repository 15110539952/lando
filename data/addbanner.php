<?php

@$pic='images/'.$_FILES["file"]["name"] or die('id required');

$burl=$_POST["burl"];


if($burl==''){
    $burl='javascript:void(0)';
}

if (!is_dir("../images/"))
            {
                mkdir("../images/");
            }


$url="../images/";
if (file_exists($url.$_FILES["file"]["name"])){
        echo 'exist';
    }else{
        move_uploaded_file($_FILES["file"]["tmp_name"],$url. $_FILES["file"]["name"]);


        //header('Content-Type:text/plain;charset=UTF-8');

        $conn=mysqli_connect('localhost','root','','lando',3306);
        $sql="SET NAMES UTF8";
        mysqli_query($conn,$sql);

        $sql="INSERT INTO banner VALUES(NULL,'$pic','$burl')";
        $result=mysqli_query($conn,$sql);

        if($result==true){
            echo "succ";
        }else{
            echo "err";
        }
    }


