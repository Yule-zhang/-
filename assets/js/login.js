$(function(){
    $('#goToRegs').on('click',function(){
        $('.register').show();
        $('.login').hide();
    })
    $('#goTologin').on('click',function(){
        $('.login').show();
        $('.register').hide();
    })

    let form=layui.form; 
    let layer=layui.layer;

    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repass:function(value){
            if(value !== $('.repassinto').val()){
              return "两次输入的密码不一致";  
            }
        }
      }); 
    
    $('#regForm').on('submit',function(e){
        e.preventDefault();
        let data=$(this).serialize();
        $.ajax({
            type:'POST',
            url:"/api/reguser",
            data,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('#regForm')[0].reset();
                $('#goTologin').click();
            }
        })
    })

    $('#logForm').on('submit',function(e){
        e.preventDefault();
        let data=$(this).serialize();
        $.ajax({
            type:'POST',
            url:'/api/login',
            data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }

                localStorage.setItem('token',res.token);
                layer.msg(res.message, {
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                  }, function(){
                    location.href='/home/index.html';
                  });  
            }
        })
    })
      
})