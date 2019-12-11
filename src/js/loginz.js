
    var ouser = document.getElementById("user_name");

    // 用来记录用户名u，密码p，重复密码p2的状态，false为失败，true为成功


    ouser.onblur = function(){
        var reg = /^1(3|[5-9])\d{9}$/;
        if(reg.test(this.value)){
            this.nextElementSibling.nextElementSibling.innerHTML = "用户名正确";
            // console.log(this.nextElementSibling.nextElementSibling);
            
            u = true;
        }else{
            this.nextElementSibling.nextElementSibling.innerHTML = "用户名不正确";
            u = false;
        }
    }
