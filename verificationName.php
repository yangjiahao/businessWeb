<?php
// 链接数据库
$val=$_POST["Name"];
$con = mysql_connect("localhost","test1","test");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
//链接数据库表
mysql_select_db("businessWeb", $con);
// 设置数据库的格式
// 设置数据库的格式
mysql_query("SET NAMES UTF8");
$myCount=mysql_query("SELECT * FROM person where name='$val'");
if(mysql_num_rows($myCount)!=0){//用户已经存在
	echo 0;
}
else{//此用户不存在，可用
	echo 1;
}

mysql_close($con);
 ?>