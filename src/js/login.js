;(function(){
    class Login{
        constructor(){
            this.user=document.getElementById("user_name");
            this.pass=document.getElementById("password");
            this.log=document.getElementById("log");
            this.span=document.querySelector(".exist");

            this.addEvent();
        }
        addEvent(){
            var that=this;
            this.log.onclick=function(){
                that.u=that.user.value;
                that.p=that.pass.value;

                that.getMsg();
            }
            
        }
        getMsg(){
            this.Msg=cookieGet("userMsg") ?JSON.parse(cookieGet("userMsg")) :[];

            var type=0;
            for(var i=0;i<this.Msg.length;i++){
                if(this.Msg[i].user==this.u && this.Msg[i].pass==this.p){
                    // this.span.innerHTML="登录成功";
                    location.href="index.html";
                    this.Msg[i].onoff=1;
                    cookieSet("userMsg",JSON.stringify(this.Msg));
                    type=1;
                }else if(this.Msg[i].user==this.u && this.Msg[i].pass!=this.p){
                    this.span.innerHTML="密码错误";
                    type=2;
                }
            }
            if(type==0){
                this.span.innerHTML="用户名不存在，请先<a href='register.html'></a>注册";
            }
        }
    }
    new Login;
})()