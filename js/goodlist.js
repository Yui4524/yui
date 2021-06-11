var row=document.querySelector(".all-list")
var pagination=document.querySelector(".pagination");

(async function(){
    var arr=await promiseAjax({
        url:'./php/list.php'
    })
    //把字符串转为对象
    arr=eval('('+arr+')')
    var o1={
        pageInfo:{
            pagenum:1,
            pagesize:12,
            totalsize:arr.length,
            totalpage:Math.ceil(arr.length/12)
        },
        textInfo:{
            first:"首页",
            prev:"上一页",
            next:"下一页",
            last:"尾页"
        }
    }
    new Pagination(pagination,o1,(m)=>{
        console.log(m);
        var arr2=arr.slice((m-1)*12,m*12)
        console.log(arr2);
        //创建字符串，拼接所有内容
        var str=''
        arr2.forEach(item=>{
            str+=`
            <div class="all-list clear">
                <div class="list1">
                    <a href="./xiangqing.html?id=${item.id}"><img src="${item.img1}"></a>
                    <p class="goods-name"><a href="./xiangqing.html?id=${item.id}">${item.name}</a></p>
                    <p class="goods-num"><a href="./xiangqing.html?id=${item.id}">${item.num}</a></p>
                    <p class="goods-price"><a href="./xiangqing.html?id=${item.id}">${item.pric}</a></p>
                </div>
            </div>
            `
        })
        //把拼接好的内容渲染到页面中
        row.innerHTML=str
    })
})()
