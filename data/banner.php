<?php

require('init.php');

$sql="SELECT * FROM banner";
$result=mysqli_query($conn,$sql);

$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);