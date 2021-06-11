//获取操作对象
var box=document.querySelector(".detail")
//获取地址栏中的参数信息
var search1=location.search
var dt
//判断当前地址栏中是否有参数
if(search1){
    //分割字符串
    var ar1=search1.split("=")
    //判断当前参数是否为id
    if(ar1[0]=="?id"){
        //获取当前参数的值
        var id=ar1[1];
        (async function(){
            //发送请求，并获取响应结果
            dt=await promiseAjax({
                url:'./php/xiangqing.php',
                data:'id='+id
            })
            //把字符串转为对象
            dt=eval('('+dt+')')
            //把数据渲染到页面中
            var str=`
            <div class="detail">
        <div class="detail-top">
            <div class="pho-mid">
                <img src="${dt.img1}">
                <div class="mask"></div>
            </div>
            <div id="rightBox">
                <img src="${dt.img1}">
            </div>
            <div class="inform">
                <p>${dt.name}</p>
                <p>${dt.num}</p>
                <p>${dt.pric}</p>
                <div class="mes clear">
                    <p>详情信息</p>
                    <ul>
                        <li>
                            <span class="li1">COLOUR</span>
                            <span class="li2">${dt.color}</span>
                        </li>
                        <li>
                            <span class="li1">材质</span>
                            <span class="li2">${dt.material}</span>
                        </li>
                        <li>
                            <span class="li1">规格（CM）</span>
                            <span class="li2">${dt.size}</span>
                        </li>
                        <li>
                            <span class="li1">款式</span>
                            <span class="li2">${dt.style}</span>
                        </li>
                    </ul>
                </div>
                <button class="add">加入购物车</button>
            </div>
        </div>
        <div class="detail-bottom">
            <p>相关推荐</p>
            <p>图文内容</p>
            <div class="pho-big">
                <img src="${dt.img2}">
            </div>
        </div>
    </div>
            `
            box.innerHTML=str
        })()
    }else{
        alert("参数有误")
        location.href="./goodlist.html"
    }
}else{
    alert("非法进入，请选择商品")
    location.href="./goodlist.html"
}



//给大盒子对象绑定点击事件
box.onclick=function(e){
    //事件对象兼容
    var e = e || window.event
    //事件目标的兼容
    var target=e.target || e.srcElement
    //判断当前点击的是否为加入购物车
    if(target.innerHTML=="加入购物车"){
        //获取localStorage中cartList4
        var cartList4=localStorage.getItem("cartList4")||[]
        //判断当前cartList4是否存在
        if(cartList4.length>0){
            //把cartList4转为数组对象
            cartList4=eval('('+cartList4+')')
            var bool=true //是否有相同的商品
            //遍历数组
            cartList4.forEach(item=>{
                //判断当前遍历的商品是否跟添加的商品相同
                if(dt.id==item.id){
                    bool=false
                    //让当前的商品数量加1
                    item.cart_number++
                    //重新给localStorage设置键值对
                    localStorage.setItem("cartList4",JSON.stringify(cartList4))
                }
            })
            //判断bool是否为true
            if(bool){
                 //修改dt对象中的数量
                dt.cart_number=1
                //把当前商品追加到cartList4中
                cartList4.push(dt)
                //重新给localStorage设置键值对
                localStorage.setItem("cartList4",JSON.stringify(cartList4))
            }
        }else{
            //修改dt对象中的数量
            dt.cart_number=1
            //把当前商品追加到cartList4中
            cartList4.push(dt)
            //重新给localStorage设置键值对
            localStorage.setItem("cartList4",JSON.stringify(cartList4))
        }
    }
}


var dsq=setInterval(function(){
var leftBox=document.querySelector(".pho-mid")
var mark=document.querySelector(".mask")
var rightBox=document.querySelector("#rightBox")
//给左边大盒子对象绑定事件
leftBox.onmouseover=function(){
    //显示隐藏的盒子
    mark.style.display='block'
    rightBox.style.display='block'
}

leftBox.onmouseout=function(){
    //隐藏指定盒子
    mark.style.display='none'
    rightBox.style.display='none'
}
leftBox.onmousemove=function(e){
    //兼容事件对象
    var e = e || window.event
    //获取移动距离
    var left1=e.clientX-leftBox.offsetLeft-parseInt(mark.offsetWidth/2)-250
    var top1=e.clientY-leftBox.offsetTop-parseInt(mark.offsetHeight/2)-25
    //设置边界条件
    var maxX=leftBox.offsetWidth-mark.offsetWidth
    var maxY=leftBox.offsetHeight-mark.offsetHeight
    //右边图片移动的距离
    var imgLeft,imgTop
    //水平方向的判断
    if(left1<=0){
        mark.style.left="0px"
        imgLeft=0
    }else if(left1>=maxX){
        mark.style.left=maxX+'px'
        imgLeft=maxX
    }else{
        mark.style.left=left1+'px'
        imgLeft=left1
    }

    //垂直方向
    if(top1<=0){
        mark.style.top="0px"
        imgTop=0
    }else if(top1>=maxY){
        mark.style.top=maxY+'px'
        imgTop=maxY
    }else{
        mark.style.top=top1+'px'
        imgTop=top1
    }

    //获取右边盒子中的图片
    var img=rightBox.querySelector("img")
    //给右边图片设置偏移量
    img.style.left=-2*imgLeft+'px'
    img.style.top=-2*imgTop+'px'
}
},500)