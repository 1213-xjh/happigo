;(function(){
    class Register{
        constructor(){
            this.user=document.getElementById("user_name");
            this.pass=document.getElementById("pass1");
            this.reg=document.getElementById("reg");
            this.span=document.querySelector(".exist")
            this.addEvent();
        }
        addEvent(){
            var that=this;
            this.reg.onclick=function(){
                that.u=that.user.value;
                that.p=that.pass.value;

                that.setMsg();
            }
            
        }
        setMsg(){
            this.Msg=cookieGet("userMsg") ?JSON.parse(cookieGet("userMsg")) :[];

            if(this.Msg.length<1){
                this.Msg.push({
                    user:this.u,
                    pass:this.p,
                    onoff:0
                })
                this.success();
                location.href="login.html"
            }else{
                var type=this.Msg.some((val,idx)=>{
                    return val.user===this.u;
                });
                if(type){
                    this.span.innerHTML="手机号已注册";
                }else{
                    this.Msg.push({
                        user:this.u,
                        pass:this.p,
                        onoff:0
                    })
                    this.success();
                }
            }
            cookieSet("userMsg",JSON.stringify(this.Msg));
        }
        success(){
            this.span.innerHTML="注册成功，5秒后跳转到<a href='login.html'>登录页面</a>"
            setTimeout(()=>{
                location.href="login.html"
            },5000)

        }
    }
    new Register;
})()