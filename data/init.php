<?php
header('Content-Type:application/json;charset=UTF-8');

$conn=mysqli_connect('localhost','root','','lando',3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);

$output=[];