    //计算随机数
    function random(max,min){
        return Math.round(Math.random()*(max-min))+min;
    }



    //输出日期
    function createDate(){
        var d = new Date();     
        var y = d.getFullYear();     //设置年
        var m = d.getMonth();        //设置月，超过11，累加年
        var mydate= d.getDate();         //设置日，超过最大日期，累加月
        var myday = d.getDay();          //设置周几，只能获取数字，例如周四，获取的是4
        var h = d.getHours();        //设置小时，超过24，累加天
        var min = d.getMinutes();      //设置分钟，超过60，累加小时
        var s = d.getSeconds();      //设置秒
        // d.getMilliseconds();    //设置毫秒。超过1000.累加秒
        // d.getTime(10000);       //设置从1997年1月1日过去了多少毫秒
        switch(myday){
            case 0 : day="星期日";break;
            case 1 : day="星期一";break;
            case 2 : day="星期二";break;
            case 3 : day="星期三";break;
            case 4 : day="星期四";break;
            case 5 : day="星期五";break;
            case 6 : day="星期六";break;
        }
        return {
            year:y,
            month:createZero(m+1),
            mydate:createZero(mydate),
            myday:day,
            hours:createZero(h),
            min:createZero(min),
            seconds:createZero(s)
        }  
    }
    function createZero(n){         //补零
            return n<10 ? "0"+n:n;
    }



    //阻止事件冒泡
    function stopBubble(e){
        if(e.stopPropagation){
            e.stopPropagation();        //正常
        }else{
            e.cancelBubble = true;      //IE
        }
    }

    //阻止默认行为
    function stopDefault(e){
        if(e.preventDefault){
            e.preventDefault();     //正常
        }else{
            e.returnValue = false;  //IE
        }
    }


    //事件监听
    function addEvent(ele,myevent,cb){      //(dom,eventtype,fn)
        if(ele.attachEvent){
            ele.attachEvent("on"+myevent,cb)    //ie
        }else{
            ele.addEventListener(myevent,cb,false)  //正常
        }
    }

    //删除监听
    function removeEvent(ele,myevent,cb){
        if(ele.detachEvent){
            ele.detachEvent("on"+myevent,cb)
        }else{
            ele.removeEventListener(myevent,cb,false);
        }
    }



    //获取样式的功能
    function getStyle(ele,attr){
        if(getComputedStyle){
            return getComputedStyle(ele,false)[attr];       //ie
        }else{
            return ele.currentStyle[attr];              //正常
        }
    }




    // 事件委托的封装
    function eveEnt(ele,cb){
        return function(eve){
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            for(var i=0;i<ele.length;i++){
                if(target === ele[i]){
                    cb.bind(target)();
                }
            }
        }
    }

    // 注意：如果使用事件委托，尽量使用监听式绑定事件