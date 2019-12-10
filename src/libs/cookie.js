//cookie的设置
function cookieSet(key,val,options){
    options=options||{}
    if(options.path){
        var p=";path="+options.path;
    }else{
        var p="";
    }
    if(options.expires){
        var d=new Date();
        d.setDate(d.getDate()+options.expires)
        var e=";expires="+d;
    }else{
        var e="";
    }
        document.cookie=key+"="+val+p+e;
}


// cookie删除功能的封装
        function cookieRemove(key,options){
            options=options||{}

            cookieSet(key,null,{
                expires:-1,
                path:options.path
            }
        )
        }


//cookie的获取（查询）
        function cookieGet(key){
            this.arr=document.cookie.split("; ");
            for(var i=0;i<arr.length;i++){
                if(arr[i].split("=")[0]==key){
                    return arr[i].split("=")[1];
                }
            }
            return "";
        }