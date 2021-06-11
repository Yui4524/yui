var a=0,b=0,dsq


//创建运动函数
function move(){
    a++
    if(a>3){
        a=0
    }
    //给将要显示的图片设置位置
    $('.bp1').eq(b).show().siblings().hide()
    $('.banner1>li').eq(b).css('background-color','grey').siblings().css('background-color','')
    b=a
    console.log();
}
move()
var dsq=setInterval(move,3000)