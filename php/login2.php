<?php
include "./datas.php";
//获取传入的参数
$n=$_POST['name'];
$s=$_POST['pass'];

//编写SQL语句
$sql="insert into user(name,pass)values('$n',$s)";
//执行SQL语句
$result=mysqli_query($link,$sql);
//判断当前数据是否添加成功
if($result){
    echo "<script>alert('注册成功');
    location.href='../login.html'</script>";
    // echo "注册成功";
    // header("location:./login.html");
}else{
    echo "<script>alert('注册失败');location.href='../login2.html'</script>";
    // echo "注册失败";
}
//关闭数据库连接
mysqli_close($link);


?>