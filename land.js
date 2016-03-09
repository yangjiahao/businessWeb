/**
 * Created by jiahao on 2016/3/7.
 */
(function(){
     function land(){
         self=this;
         this.flag=0;//是否登陆成功
         this.temp1=0;
         this.temp2=0;
         this.temp3=0;
        this.myBody=$(document.body);
         this.mask=$("<div class='mask'>");
         this.landFace=$("<div class='land-face'>");
         this.register=$("<div class='register-face'>");
         //把子元素添加进去
         this.setAllHtml();
         this.myMask=$('.mask');
         this.myLandFace=$('.land-face');
         this.myRegisterFace=$('.register-face');
         this.landClose=$('.close');
         this.registerClose=$('.close-register');
         this.landButton=$(".land-button");
         this.registerButton= $(".register");
         //绑定land和register的点击事件
         this.landClick();
         //注册按钮绑定
         this.registerClick();
         //绑定删除按钮
         this.closeButton();
         //注册验证函数
         this.registerVerification();
         //验证登陆账号密码
         this.landVerification();

     }
    land.prototype={
       landClick:function(){
           var self=this;
           this.landButton.click(function(){
               self.myMask.fadeIn();
               self.myLandFace.css({
                   top:'50%',
                   marginTop:-150
               });
           });
       },
        setAllHtml:function(){
            this.landFace.html("<span class='close'></span> "+
            "<span class='front'>账号</span> <input type='text' "+
            "class='land-input land-face-account'/><span class='land-name'></span></br>"+
            "<span class='front'>密码</span>"+
            "<input type='password' class='land-input land-face-password'/>"+
             "<button  class='land-input-submit'>提交</button>"+
             "<div class='bottom'>"+
             "<a href='javaScript:land.landToRegister();' >注册</a>"+
             "<a href='#'>忘记密码</a>"+
             "</div>");
            this.register.html("<span class='close-register'>"+
            "</span> <span class='front'>账号</span> <input type='text' class='register-name register-input'/> <span  class='verification' id='register-name-verification'></span></br>"+
            "<span class='front'>密码</span>"+
            "<input type='password' class='register-password1 register-input' /> <span class='verification' id='register-pass-verification1'></span>"+
            "</br>"+
            "<span class='input-again front' >再次输入</span>"+
            "<input type='password' class='register-password2 register-input'/> <span class='verification' id='register-pass-verification2'></span>"+
            "</br>"+
            "<button  class='register-submit'>提交</button>"+
            "<div class='bottom'>"+
            "<a href='javaScript:land.registerToLand();'>登陆</a>"+
            "<a href='#'>忘记密码</a>"+
            "</div>");
            this.myBody.append(this.mask,this.landFace,this.register);
        },
        closeButton:function(){
            var self=this;
            this.landClose.click(function(){
                self.myMask.fadeOut();
                self.myLandFace.css({
                    top:-300,
                    marginTop:0
                });
                self.clearLandContent();
            });
            this.registerClose.click(function(){
                self.myMask.fadeOut();
                self.myRegisterFace.css({
                    top:-360,
                    marginTop:0
                });
                self.clearContent();
            });
        },
        registerClick:function(){
            var self=this;
            this.registerButton.click(function(){
                self.myMask.fadeIn();
               self.myRegisterFace.css({
                    top:'50%',
                    marginTop:-150
                });
            });
            return 0;
        },
        landToRegister:function(){
            var timer=0;
            var self=this;
            this.landClose.click();
            timer=setTimeout(function(){
                self.registerButton.click();
                clearTimeout(timer);
            },300);
            return 0;
        },
        registerToLand:function(){
            var timer=0;
            var self=this;
            this.registerClose.click();
            timer=setTimeout(function(){
                self.landButton.click();
                clearTimeout(timer);
            },300);
            return 0;
        },
        clearLandContent:function(){
            $(".land-input ").val('');
            $('.land-name').text('');
        },
        clearContent:function(){
            $(".register-input").val('');
            $('.verification').text('');
            this.temp1=0;
            this.temp2=0;
            this.temp3=0;
        },
        registerVerification:function(){
            //用户名输入后失去焦点
            var name=$('.register-name');
            var nameSpan= $('#register-name-verification');
            var passSpan1= $("#register-pass-verification1");
            var password1=$(".register-password1 ");
            var password2=$(".register-password2");
            var passSpan2=  $("#register-pass-verification2");
            var self=this;
            name.blur(function(){
                if(this.value==''){
                    nameSpan.css({color:"#990033"});
                    nameSpan.text('不能为空');
                    self.temp1= 0;
                }else{
                    $.post("verificationName.php",{Name:name.val()},function(data){
                        if(data==0){
                                    nameSpan.css({color:"#990033"});
                                    nameSpan.text("用户已存在");
                                   self.temp1= 2;
                                }
                        else{
                                    nameSpan.css({color:"#009966"});
                                    nameSpan.text("新用户");
                                    self.temp1=1;
                                }
                    });
                }
            });
            //第一次密码输入框失去焦点
            password1.blur(function(){
                if($(this).val()==""){
                    passSpan1.css({color:"#990033"});
                    passSpan1.text("不能为空");
                    self.temp2= 0;
                }
                else{
                    passSpan1.css({color:"#009966"});
                    passSpan1.text("可用");
                    self.temp2=1;
                }
            });
            //第二次密码输入框失去焦点
            password2.blur(function(){

                if($(this).val()==""){
                    passSpan2.css({color:"#990033"});
                    passSpan2.text("不能为空");
                    self.temp3=0;
                }
               else if($(this).val()!=password1.val()){
                    passSpan2.css({color:"#990033"});
                    passSpan2.text("两次输入不同");
                    self.temp3=2;
                }else{
                    passSpan2.css({color:"#009966"});
                    passSpan2.text("两次输入相同");
                    self.temp3=1;
                }
            });
            //点击提交
            $('.register-submit').click(function(){
                if(self.temp1!=1){
                    if(self.temp1==0){
                        nameSpan.css({color:"#990033"}).text('不能为空');
                    }
                    name.focus();
                    return 0;
                }
                if(self.temp2==0) {
                    passSpan1.css({color: "#990033"}).text("不能为空");
                    password1.focus();
                    return 0;
                }
                if(self.temp3!=1){
                    if(self.temp3==2){
                        passSpan2.css({color:"#990033"}).text("两次输入不同");
                    }else{
                        passSpan2.css({color:"#990033"}).text("不能为空");
                    }
                    password2.focus();
                    return 0;
                }
                $.post("insetperson.php",{Name:name.val(),password:password1.val()},function(data){
                    alert(data);
                    self.registerToLand();
                });
            });
        },
        landVerification:function(){
            var self=this;
            var submitBut=$('.land-input-submit');
            var landname=$('.land-name');
            var myAccount=$(".land-face-account");
            var myPassword=$(".land-face-password");
            submitBut.click(function(){
                $.post('verificationperson.php',{Name:myAccount.val(),password:myPassword.val()},function(data){
                    alert(data);
                    if(data=='登陆成功'){
                        //$('.head-top-nav-span').html("<a class='personCenter' style='color:#f10582;'>"+myAccount.val()+"</a><a href='javaScript:land.signOut();' class='closePersonCenter' >退出</a>");
                        $('.head-top-nav-span2').css({display:'inline'});
                        $('.head-top-nav-span1').css({display:'none'});
                        $('.personCenter').text(myAccount.val());
                        self.landClose.click();
                        self.flag=1;
                    }else{
                        myPassword.focus();
                    }
                });
            });
        },
        signOut:function(){
            this.flag=0;
            //$('.head-top-nav-span').html("<a href='javaScript:void(0);' class='land-button land-button1' >登陆</a> <a style='float:right;'  href='javaScript:void(0);' class='register'>注册</a>");
            $('.head-top-nav-span2').css({display:'none'});
            $('.head-top-nav-span1').css({display:'inline'});
            return 0;
        }
    };
    window['land']=land;
})();