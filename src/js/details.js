;(function(){
    class Magnifier{
        constructor(){
            this.sBox = document.querySelector(".sBox");
            this.ct=document.querySelector(".c-t-l")
            this.sSpan = document.querySelector(".sBox span");
            this.bBox = document.querySelector(".bBox");
            this.bImg = document.querySelector(".bBox img");

            this.init()
        }
        init(){
            var that = this;
            this.sBox.onmouseover = function(){

                that.over()
            }

            this.sBox.onmousemove = function(eve){
                var e = eve || window.event;

                that.move(e)
            }

            this.sBox.onmouseout = function(){

                that.out()
            }
        }
        over(){

            this.sSpan.style.display = "block";
            this.bBox.style.display = "block";

            this.sSpanW = (this.bBox.offsetWidth / this.bImg.offsetWidth * this.sBox.offsetWidth);
            this.sSpanH = (this.bBox.offsetHeight / this.bImg.offsetHeight * this.sBox.offsetHeight);

            this.sSpan.style.width = this.sSpanW + "px";
            this.sSpan.style.height = this.sSpanH + "px";
            

            this.sW = this.sBox.offsetWidth;
            this.sH = this.sBox.offsetHeight;

            this.bW = this.bBox.offsetWidth;
            this.bH = this.bBox.offsetHeight;

            this.bImgW = this.bImg.offsetWidth;
            this.bImgH = this.bImg.offsetHeight;
        }
        move(e){
            var l = e.clientX - this.ct.offsetLeft - this.sSpan.offsetWidth/2;
            var t = e.clientY - this.ct.offsetTop;
            // console.log(this.ct.offsetTop)

            if(l<0) l=0;
            if(t<0) t=0;
            if(l>this.sW - this.sSpanW){
                l = this.sW - this.sSpanW;
            }
            if(t>this.sH - this.sSpanH){
                t = this.sH - this.sSpanH;
            }

            this.sSpan.style.left = l + "px";
            this.sSpan.style.top = t + "px";

            this.bImg.style.left = l / (this.sW - this.sSpanW) * (this.bW - this.bImgW) + "px";
            this.bImg.style.top = t / (this.sH - this.sSpanH) * (this.bH - this.bImgH) + "px";
        }
        out(){

            this.sSpan.style.display = "none";
            this.bBox.style.display = "none";
        }
    }
    new Magnifier();
    
    class List{
        constructor(){
            this.cont=document.getElementById("main");
            this.url="http://localhost/json/details.json";
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
                str +=`<div class="box" index="${this.res[i].sId}">
                    <img src="${this.res[i].img}" alt="">
                    <p>${this.res[i].name}</p>
                    <span>${this.res[i].price}</span>
                    <em class="addcar">加入购物车</em></div>
                    `
            }
            this.cont.innerHTML=str;
        }
        addEvent(){
            var that=this
            this.cont.addEventListener("click",function(eve){
                var e=eve||window.event;
                var target=e.target||e.srcElement;
                if(target.className=="addcar"){
                    that.id=target.parentNode.getAttribute("index");
                    that.setCookie()
                }
            })
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