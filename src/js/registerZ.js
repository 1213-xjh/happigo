    var ouser = document.getElementById("user_name");
    var opass = document.getElementById("pass1");
    var opass2 = document.getElementById("pass2");


    // 用来记录用户名u，密码p，重复密码p2的状态，false为失败，true为成功
    var u=p=p2=false;

    ouser.onblur = function(){
        var reg = /^1(3|[5-9])\d{9}$/;
        if(reg.test(this.value)){
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "手机号正确";
            u = true;
        }else{
            this.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "手机号不正确";
            u = false;
        }
    }

    opass.oninput = function(){
        // 不允许为空，为空的话，验证就不验证
        if(this.value == ""){
            this.nextElementSibling.innerHTML = "不允许为空";
            p = false
            return;
        }
        // 用来记录是否出现数字n，字母a，特殊t的状态变量
        var n=a=t=0;
        
        // 单独验证，查询是否存在，而不需要整体验证
        var numReg = /\d/;
        var azReg = /[a-z]/i;
        var tsReg = /[^\da-z]/i;
        if(numReg.test(this.value)){
            n=1
        }
        if(azReg.test(this.value)){
            a=1
        }
        if(tsReg.test(this.value)){
            t=1
        }

        switch(n+a+t){
            case 1:
                this.nextElementSibling.nextElementSibling.innerHTML = "简单";break;
                
                
            case 2:
                this.nextElementSibling.nextElementSibling.innerHTML = "一般";break;
            case 3:
                this.nextElementSibling.nextElementSibling.innerHTML = "困难";break;
        }
        p = true;

        if(opass2.value == "") return;
        if(this.value == opass2.value){
            opass2.nextElementSibling.nextElementSibling.innerHTML = "一致";
            p2 = true;
        }else{
            opass2.nextElementSibling.nextElementSibling.innerHTML = "不一致";
            p2 = false;
        }
    }

    opass2.oninput = function(){
        if(this.value == opass.value){
            this.nextElementSibling.nextElementSibling.innerHTML = "一致";
            p2 = true;
        }else{
            this.nextElementSibling.nextElementSibling.innerHTML = "不一致";
            p2 = false;
        }
    }