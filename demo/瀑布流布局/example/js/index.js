/**
 * Created by tangqin on 2016/9/13.
 */
window.onload=function(){
    waterfall("main","box");
    var dataInt={"data":[{"src":"images/28.jpg"},{"src":"images/29.jpg"},{"src":"images/30.jpg"},{"src":"images/31.jpg"},{"src":"images/32.jpg"}]};  //模拟后台数据
    window.onscroll=function(){
        if(checkScrollSlide){
         //将数据块渲染到页面中
            var oParent=document.getElementById("main");
            for(var i=0;i<dataInt.data.length;i++){
               //创建盒子
                var oBox=document.createElement("div"),
                    oPic=document.createElement("div"),
                    img=document.createElement("img");
                oBox.className="box";
                oPic.className="pic";
                img.src=dataInt.data[i].src;
                oPic.appendChild(img);
                oBox.appendChild(oPic);
                oParent.appendChild(oBox);
            }
            waterfall("main","box");
        }
    }
};

function waterfall(parent,box){
    //将main下所有class为box的元素取出来
    var oParent=document.getElementById(parent),
        boxs=getByClass(oParent,box),
    //计算整个页面显示的列数（页面宽度/box宽度）
        oboxW=boxs[0].offsetWidth,
        oSceenW=document.documentElement.clientWidth || document.body.clientWidth,
        cols=Math.floor(oSceenW/oboxW),
        strCss="width:"+cols*oboxW+"px;",
        hArr=[]; //初始为第一行所有box的高度,最后为每一列高度
    //设置main的宽度
    setStyle(oParent,strCss);
    for(var i=0;i<boxs.length;i++){
           if(i<cols){
               hArr.push(boxs[i].offsetHeight);
           }else{
               var minH=Math.min.apply(null,hArr);
               var index=getMinIndex(hArr,minH);   //获取最小宽度box的索引
               boxs[i].style.position="absolute";
               boxs[i].style.top=minH+"px";
               boxs[i].style.left=boxs[index].offsetLeft+"px";
               hArr[index]+=boxs[i].offsetHeight;   //最小高度累加
               /*console.log(boxs[i].offsetHeight);*/
           }
    }
    //理解
console.log("一共："+cols+"列");
console.log("每列的高度分别为："+hArr);
var fminH=Math.min.apply(null,hArr);
console.log("最矮一列的高度为："+fminH);
console.log("最后一张图片的left值："+boxs[index].offsetLeft);



}

//获得class
function getByClass(oParent,clsName){
    oParent=oParent || document;
    var alls=oParent.getElementsByTagName("*"),
        results=[];
    for(var i=0;i<alls.length;i++){
        if(alls[i].className==clsName){
            results.push(alls[i]);
        }
    }
   return results;
}

//添加样式,不兼容ie6/7/8
function setStyle(el,strCss){
  return el.style.cssText+=strCss;
}

function getMinIndex(arr,val){
    for( var i in arr){
    if( arr[i] == val){
        return i;
    }
    }
}

//判断是否具备加载数据块的条件
function checkScrollSlide(){
    var oParent = document.getElementById("main");
    var boxs = getByClass(oParent,"box");
    var lastBoxH = boxs[boxs.length-1].offsetTop+Math.ceil(boxs[boxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (scrollTop+height) > lastBoxH;
}