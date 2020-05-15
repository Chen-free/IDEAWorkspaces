/**
 * 声明全局变量
 */
var index = 0 ,//当前显示图片的索引，默认值为0
    timer =null,//定时器
    main=byId("main"),
    menuContent =byId("menu-content"),
    menuItems=menuContent.getElementsByTagName("div"),
    banner =byId("banner"),
    pics  =banner.getElementsByTagName("div"),
    size =menuItems.length;

//封装getElementById(）
function byId(id) {
    return typeof(id) == "string" ? document.getElementById(id):id;
}
//兼容浏览器的监听事件
var EventUtil={
    addHandler:function(ele,type,handler){
//绑定事件
//ChromeFirefoxIE9等
//IE8以及以下的浏览器attachEvent
        if(ele.addEventListener){
            ele.addEventListener(type,handler,true);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,handler);
        }else{
            ele["on"+type]=null;
        }
    },
    removeHandler:function(ele,type,handler){
//绑定事件
//ChromeFirefoxIE9等
//IE8以及以下的浏览器detachEvent
        if(ele.removeEventListener){
            ele.removeEventListener(type,handler,false);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,handler);
        }else{
            ele["on"+type]=null;
        }
    },
    getTarget:function(event){
        returnevent.target||event.srcElement;
    },
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue=false;
        }
    },
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble=true;
        }
    }
}

//添加定时器自动轮播
function startAutoPlag() {
    timer = setInterval(function () {
        index++;
        if (index >= size) index =0;
        changeImg();
    },1000);
}

//清除定时器
function stopAutoPlay() {
    if (timer) {
        clearInterval(timer);
    }
}
//切换图片和选项卡的背景颜色
function changeImg() {
    //便利所有图片，让所有的都先隐藏，之后的再显示
    for (var i = 0; i < size; i++) {
        pics[i].style.display = "none";
        menuItems[i].className ="menu-items";
    }
    //显示当前图片
    pics[index].style.display = "block";
    menuItems[index].className ="menu-items itemActive";
}

//给给选项卡添加事件
for (var i=0;i<size;i++){
    //给所有选项卡添加事件，需要获取每个选项卡的索引值
    menuItems[i].setAttribute("data-id",i);
    EventUtil.addHandler(menuItems[i],"click",function () {
        index =this.getAttribute("data-id");
        changeImg();
    })
}

window.onload =function (ev) {
    //鼠标滑入main，停止轮播
    EventUtil.addHandler(main,"mouseover",stopAutoPlay);//引用时不需要添加（），notice

//鼠标离开main，继续轮播
    EventUtil.addHandler(main,"mouseout",startAutoPlag);
}
//自动轮播
startAutoPlag();

