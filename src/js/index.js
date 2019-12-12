;(function(){
    class List{
        constructor(){
            this.cont=document.querySelector(".box-ul");
            this.good=document.querySelector(".goods");
            this.bbox=document.querySelector(".bbox-ul");
            this.well=document.querySelector(".well-ul");
            this.url="http://localhost:83/json/index.json";
            this.url1="http://localhost:83/json/index1.json";
            this.url2="http://localhost:83/json/index2.json";
            this.url3="http://localhost:83/json/index3.json";
            this.load();
            this.addEvent()
        }
        load(){
            var that=this
            ajaxGet(this.url,function(res){
                that.res=JSON.parse(res);
                that.display1() 
            })
            ajaxGet(this.url1,function(res){
                that.res=JSON.parse(res);
                that.display2() 
            })
            ajaxGet(this.url2,function(res){
                that.res=JSON.parse(res);
                that.display3() 
            })
            ajaxGet(this.url3,function(res){
                that.res=JSON.parse(res);
                that.display4() 
            })
        }
        display1(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li index="${this.res[i].sId}">
                            <a href="../details.html"><img src="${this.res[i].img}" alt=""></a>
                            <div>
                                <p><a href="../details.html">${this.res[i].name}</a></p>
                                <span>￥</span><span>${this.res[i].price}</span><i>${this.res[i].except}</i>
                                <em class="qq">立即订购</em>
                            </div>
                        </li>`
            }
            this.cont.innerHTML=str;   
            
        }
        display2(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li index="${this.res[i].sId}">
                            <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            <div>
                                <em>${this.res[i].reffal}</em>
                                <p><a href="#">${this.res[i].name}</a></p>
                            </div>
                            <span>￥</span><span>${this.res[i].price}</span><i>${this.res[i].except}</i>
                        </li>`
            }
            this.good.innerHTML=str;   
        }
        display3(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li  index="${this.res[i].sId}">
                        <a href="#" ><img src="${this.res[i].img}" alt=""></a>
                        <div>
                            <em>${this.res[i].reffal}</em>
                            <p><a href="#">${this.res[i].name}</a></p>
                        </div>
                        <span>￥</span><span>${this.res[i].price}</span><i>￥${this.res[i].except}</i>
                    </li>`
            }
            this.bbox.innerHTML=str;   
        }
        display4(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li index="${this.res[i].sId}">  
                            <a href="#" class="well-i"><img src="${this.res[i].img}" alt=""></a>
                                <div>
                                    <em>${this.res[i].reffal}</em>
                                    <p><a href="#">${this.res[i].name}</a></p>
                                </div>
                                    <span>￥</span><span>${this.res[i].price}</span><i>${this.res[i].except}</i>
                        </li>`
            }
            this.well.innerHTML=str;   
        }
        addEvent(){
            var that=this
            this.cont.addEventListener("click",function(eve){
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                // console.log(1);
                // console.log(target);
                
                if(target.className == "qq"){
                    // console.log(target.className)
                    
                    that.id=target.parentNode.parentNode.getAttribute("index");
                    // console.log(that.id);
                    // console.log(1)
                    
                    
                    that.setCookie()
                    
                }
            })
        }
        setCookie(){
            //读取cookie
            // console.log(cookieGet("goodsDEcookie"))
            this.goods=cookieGet("goodsDEcookie") ? 
                         JSON.parse(cookieGet("goodsDEcookie")):[];

            if(this.goods.length<1){
                this.goods.push({
                    id:this.id,
                    num:1
                })
            }else{
                var onoff=true;
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id===this.id){
                        this.goods[i].num++;
                        onoff=false
                    }
                }
                if(onoff){
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }
            cookieSet("goodsDEcookie",JSON.stringify(this.goods) )
        }
    }
    new List;

    class Index{
        constructor(){
            this.login = document.querySelector(".t-l");
            this.welcome = document.querySelector(".welcome");
            this.user = this.welcome.querySelector(".x");
            this.exit = this.welcome.querySelector(".log");
            
            this.getMsg();
            this.addEvent()
        }
        addEvent(){
            var that = this;
            this.exit.onclick = function(){
                that.msg[that.i].onoff = "0";
                cookieSet("userMsg",JSON.stringify(that.msg));
                location.reload();
            }
        }
        getMsg(){
            this.msg = cookieGet("userMsg") ? JSON.parse(cookieGet("userMsg")) : [];
            
            this.i = null; 
            var type = this.msg.some((val,idx)=>{
                this.i = idx;
                return val.onoff === 1;
            })
            
            if(type){
                this.login.style.display = "none";
                this.welcome.style.display = "block";
                this.user.innerHTML = this.msg[this.i].user;
            }
        }
    }
    
    new Index;
})()