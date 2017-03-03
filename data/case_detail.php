<?php


require('init.php');

$i=$_REQUEST['i'];


$sql="SELECT * FROM case_detail WHERE caseId='$i'";

$result=mysqli_query($conn,$sql);

$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);