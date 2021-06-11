<?php
include "./datas.php";

//编写SQL语句
$sql='select * from complete';
//执行SQL，并返回结果集
$result=mysqli_query($link,$sql);
//创建存放所有数据的数组
$arr=[];
//遍历结果集中每条数据
while($row=mysqli_fetch_assoc($result)){
    //把遍历出来的数据，追加到数组中
    array_push($arr,$row);
}
//把数组转为字符串，并响应给客户端
echo json_encode($arr);
//关闭数据库连接
mysqli_close($link);

?>
