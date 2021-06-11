<?php
include "./datas.php";
//获取传入的参数
$id=$_GET['id'];
//编写SQL
$sql="select * from complete where id=$id";
//执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
//获取结果集中的数据
$row=mysqli_fetch_assoc($result);
//把数组转为字符串，并响应给浏览器
echo json_encode($row);
//关闭数据库连接
mysqli_close($link);


?>