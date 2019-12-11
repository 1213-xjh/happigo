;(function(){
    class List{
        constructor(){
            this.cont=document.querySelector(".fix-ul");
            this.url="http://localhost:83/json/list.json";
            this.load();
            this.addEvent()
        }
        load(){
            var that=this
            ajaxGet(this.url,function(res){
                that.res=JSON.parse(res);
                that.display() 
            })
        }
        display(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li index="${this.res[i].sId}>
                            <a href="../details.html"><img src="${this.res[i].img}"></a>
                            <span>￥</span><span>${this.res[i].price}</span><i>￥${this.res[i].except}</i>
                            <div class="order">
                                <p><a href="../details.html">${this.res[i].name}</a></p>
                            </div>
                        </li>`
            }
            this.cont.innerHTML=str;   
        }
        addEvent(){
            var that=this
            this.cont.addEventListener("click",function(eve){
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                
                if(target.className == "order"){
                    that.id=target.parentNode.parentNode.getAttribute("index");
                    console.log(that.id);
                    
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
})()