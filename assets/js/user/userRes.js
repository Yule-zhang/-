$(function(){
    let form=layui.form;
    let layer=layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        oldpwd:function(value,item){
            let oldPwd= $('[name=oldPwd]').val();
            if(value===oldPwd){
                return '新旧密码不能相同'
            }
        },
        rePwd:function(value){
            let newpwd=$('[name=newPwd]').val();
            if(value!==newpwd){
                return '两次新密码不一致'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        let data=$(this).serialize();
        $.ajax({
            url:'/my/updatepwd',
            type:'POST',
            data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset();
            }
        })
    })

})