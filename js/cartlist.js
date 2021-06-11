//获取操作对象
var box=document.querySelector(".cart")
var items = document.getElementsByName('xuan')
var quan1 = document.getElementsByName('quan')[0]
var quan2 = document.getElementsByName('quan')[1]
var numSelect = document.querySelector('.num_select') 
var sumSelect = document.querySelector('.sum_select')
//获取localStorage中是否有cartList4
var cartList4=localStorage.getItem("cartList4")
//获取cookie
var name1=getCookie("name")

//判断姓名是否存在
if(name1){
    //转为对象
    cartList4=eval('('+cartList4+')')
    show1()
}else{
    alert("尚未登录，请登录")
    //获取当前地址栏信息
    var url=location.href
    location.href='./login.html?newUrl='+url
}
function show1(){
    //判断当前是否有数据
    if(cartList4.length>0){
        var str2=''
        //判断是否所有的商品中is_select都为1
        var bool=cartList4.every(item=>{
            return item.is_select==1
        })
        //拼接字符串
        cartList4.forEach(item=>{
            str2+=`
            <div class="panel panel-default">
                <div class="list clear">
                    <ul>
                        <li><input type="checkbox" name="xuan" ${item.is_select==1?"checked":''} data-id=${item.id}></li>
                        <li class="pho"><img src="${item.img1}"></li>
                        <li class="name1">${item.name}</li>
                        <li class="pri1">${item.pric}</li>
                        <li class="num1">
                            <button  type="button" class="btn btn-default"${item.cart_number<=1?"disabled":''}data-id=${item.id}>-</button>
                            <button type="button" class="btn btn-default">${item.cart_number}</button>
                            <button type="button" class="btn btn-default" ${item.cart_number>=999?"disabled":''}data-id=${item.id}>+</button>
                        </li>
                        
                        <li><button class="del1 btn btn-info" data-id=${item.id}>删除</button></li>
                    </ul>
                </div>
            <div class="panel-body">
            `
        })
        //遍历数组中所有元素        
        str2+=`
            <div class="media">
                <div class="choo">
                    <input type="checkbox" name="quan" ${bool?"checked":''}>全选
                </div>
                <div class="cont">
                    <p><span class="num_select">${total()[0]}</span>件商品</p>
                    <p>商品金额¥<span class="sum_select">${total()[1]}</span>元</p>
                    <p><a href="./goodlist.html">继续购物</a><button type="button" class="btn btn-xs btn-info">提交订单</button></p>
                </div>
            </div>
        `
        str2+=`
            </div>
        </div>
        `
        //把所有拼接好的内容，渲染到页面中
        box.innerHTML=str2
    }else{
        var str=`
        <div class="jumbotron">
            <h1>您的购物车空空如也</h1>
            <p>点击下方按钮快去选购吧! ^_^</p>
            <p><a class="btn btn-primary btn-lg" href="./goodlist.html" role="button">赶紧去逛逛吧</a></p>
        </div>
        `
        //把当前字符串渲染到页面中
        box.innerHTML=str
    }
}
//给box大盒子对象绑定点击事件
box.onclick=function(e){
    //事件对象兼容
    var e = e || window.event
    //目标对象兼容
    var target=e.target || e.srcElement
    //判断点击的是否为加法按钮
    if(target.innerHTML=='+'){
        //获取当前操作对的id属性值
        var id=target.getAttribute("data-id")
        //操作cartList4中指定的数据
        cartList4.forEach(item=>{
            //判断是否为当前要操作的商品
            if(item.id==id){
                item.cart_number++
            }
        })
        //把修改完毕的cartList4重新存储在localStorage中
        localStorage.setItem("cartList4",JSON.stringify(cartList4))
        show1()
    }
    //减法
    if(target.innerHTML=='-'){
        //获取id
        var id=target.getAttribute("data-id")
         //操作cartList4中指定的数据
         cartList4.forEach(item=>{
            //判断是否为当前要操作的商品
            if(item.id==id){
                item.cart_number--
            }
        })
        //把修改完毕的cartList4重新存储在localStorage中
        localStorage.setItem("cartList4",JSON.stringify(cartList4))
        show1()
    }
    //删除
    if(target.innerHTML=="删除"){
        //获取id属性值
        var id=target.getAttribute("data-id")
        cartList4=cartList4.filter(item=>{
            return item.id!=id
        })
        //把修改完毕的cartList4重新存储在localStorage中
        localStorage.setItem("cartList4",JSON.stringify(cartList4))
        show1()
    }
    //判断是否为全选框
    if(target.name=="quan"){
        //遍历所有商品
        cartList4.forEach(item=>{
            //判断当前全选框是否被选中
            if(target.checked){
                item.is_select=1
            }else{
                item.is_select=0
            }
        })
        //把修改完毕的cartList4重新存储在localStorage中
        localStorage.setItem("cartList4",JSON.stringify(cartList4))
        show1()
    }
    //判断点击的是否为选中框对象
    if(target.name=="xuan"){
        //获取当前选中框对象的id属性
        var id=target.getAttribute('data-id')
        //遍历数组元素
        //遍历所有商品
        cartList4.forEach(item=>{
           //判断是否为当前要操作的商品
           if(item.id==id){
               //判断当前商品中is_select是否等于1
               if(item.is_select==1){
                    item.is_select=0
               }else{
                    item.is_select=1
               }
           }
        })
        //把修改完毕的cartList4重新存储在localStorage中
        localStorage.setItem("cartList4",JSON.stringify(cartList4))
        show1()
    }
    
    //清空购物车
    if(target.innerHTML=="提交订单"){
         cartList4=[]
         //把修改完毕的cartList4重新存储在localStorage中
         localStorage.setItem("cartList4",JSON.stringify(cartList4))
         show1()
    }
}

//计算所选商品价格和数量
function total(){
    var nums=0 //所选商品数量
    var prices=0 //所选商品价格
    //遍历所有商品
    cartList4.forEach(item=>{
        //判断当前商品是否被选中
        if(item.is_select==1){
            nums+=item.cart_number
            prices+=parseFloat(item.pric)*parseInt(item.cart_number)
                    
        }
    })
    return [nums,prices]
}
