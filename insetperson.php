<?php
$Name=$_POST['Name'];
$password=$_POST['password'];
$con=mysql_connect("localhost","test1","test");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
  //链接数据库表
mysql_select_db("businessWeb", $con);
mysql_query("SET NAMES UTF8");
if(mysql_query("INSERT INTO person (name,password) VALUES ('$Name','$password')")){
	echo "创建成功";
}
else{
	echo "创建失败";
}

mysql_close($con);
?>