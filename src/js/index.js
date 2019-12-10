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
                str +=`<li index="${this.res[i].sId}>
                            <a href="#"><img src="${this.res[i].img}" alt=""></a>
                            <div>
                                <p><a href="#">${this.res[i].name}</a></p>
                                <span>￥</span><span>${this.res[i].price}</span><i>${this.res[i].except}</i>
                                <em class="order"><a href="../details.html" style="color:#fff">立即订购<a></em>
                            </div>
                        </li>`
            }
            this.cont.innerHTML=str;   
        }
        display2(){
            var str=""
            for(var i=0;i<this.res.length;i++){
                str +=`<li index="${this.res[i].sId}>
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
                str +=`<li  index="${this.res[i].sId}>
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
                str +=`<li index="${this.res[i].sId}>
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
        setCookie(){
            //读取cookie
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