;(function(){
    class car{
        constructor(){
            this.url="http://localhost:83/json/index.json";
            this.tbody=document.querySelector("tbody");
            this.allcheck=document.getElementById("allCheck");
            this.smoney=document.querySelector(".smoney");
            this.snum=document.querySelector(".snum");
            this.num=0;
            this.smon=0;
            this.snumq = 0;
            this.load();
            this.addEvent();
            this.type = 0;
            
        }
        load(){
            ajaxGet(this.url,(res)=>{
                this.res=JSON.parse(res);
                this.getcookie();
                this.checkbox();
            })
        }
        getcookie(){
            this.goods=cookieGet("goodsDEcookie") ? JSON.parse(cookieGet("goodsDEcookie")):[];
            // console.log(cookieGet("goodsDEcookie"))
            this.display();
        }
        display(){
            // console.log(this.allcheck.checked);
            var str="";
            for(var i=0;i<this.res.length;i++){
                for(var j=0;j<this.goods.length;j++){
                    if(this.res[i].sId===this.goods[j].id){
                        if(this.goods[j].check==1){
                            this.check='checked';
                            this.smon += this.goods[j].num*parseInt(this.res[i].price);
                            this.snumq += parseInt(this.goods[j].num)
                        }else{
                            this.check='';
                        }
                        var sub=parseInt(this.res[i].price)*this.goods[j].num
                        str += `<tr index="${this.res[i].sId}">
                                    <td><input class="check" type="checkbox" ${this.check}></td>
                                    <td><img src="${this.res[i].img}" ></td>
                                    <td>${this.res[i].name}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" min="1" value="${this.goods[j].num}" class="int"></td>
                                    <td class="subtotal">${sub}</td>
                                    <td class="delete">删除</td>
                                </tr>`
                    // console.log(str);
                    }
                }
            }
            // console.log(this.smon);
            
            this.smoney.innerHTML=this.smon;
            this.snum.innerHTML=this.snumq;
        
            this.smon=0;
            this.snumq=0;
             this.tbody.innerHTML=str;
        }
        addEvent(){
            var that=this;
            this.tbody.addEventListener("click",function(eve){
                var e=eve || window.eve;
                var target=e.target || e.srcElement;
                if(target.className == "delete"){
                    that.id=target.parentNode.getAttribute("index");
                    target.parentNode.remove();
                    that.changCookie(function(i){
                        that.goods.splice(i,1);
                    });
                }
                if(target.className=="check"){
                    that.id=target.parentNode.parentNode.getAttribute("index");
                    // console.log(that.id);
                    that.bcheck(target);
                }
            })
            this.tbody.addEventListener("input",function(eve){
                var e=eve || window.eve;
                var target=e.target || e.srcElement;
                if(target.className == "int"){
                    that.id=target.parentNode.parentNode.getAttribute("index")
                    target.parentNode.parentNode.lastElementChild.previousElementSibling.innerHTML=
                    target.value*target.parentNode.parentNode.lastElementChild.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
                    console.log(target.value);
                    
                    that.changCookie(function(i){
                        that.goods[i].num=target.value;
                    });
                }
            })
            this.allcheck.onclick=function(){
                var acheck=document.querySelectorAll(".check");
                // console.log(acheck);
                    for(var i=0;i<acheck.length;i++){
                        if(this.checked==true){
                            acheck[i].checked=true;
                            that.goods[i].check=1;
                        }else{
                            acheck[i].checked=false;
                            that.goods[i].check=0;
                        }
                    }
                
                cookieSet("goodsDEcookie",JSON.stringify(that.goods));
            } 
        }
        changCookie(cb){
            for(var i=0;i<this.goods.length;i++){
                if(this.id==this.goods[i].id){
                    cb(i);
                    break;
                }
            }
            cookieSet("goodsDEcookie",JSON.stringify(this.goods));
        }
        bcheck(b){
            // console.log(this.goods);
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].id==this.id){
                    if(this.goods[i].check==1){
                        this.goods[i].check=0;
                        b.checked=false;  
                        // console.log(b);
                    }else{
                        this.goods[i].check=1;
                        b.checked=true;
                    }
                }
            }
            this.checkbox();
            cookieSet("goodsDEcookie",JSON.stringify(this.goods));
            this.display();
        }
        checkbox(){
            var that=this;
            var p=this.goods.every(function(a,index){
                    if(that.goods[index].check!=1){
                        return false;
                    }else{
                        return true;
                    }
            });
            if(p){
                this.allcheck.checked=true;
            }else{
                this.allcheck.checked=false;
            }
        }
    }
    new car()
})()