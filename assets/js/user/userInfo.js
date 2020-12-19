$(function(){
    getUser();
    let form=layui.form;
    let layer=layui.layer;
    function getUser(){
    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            form.val("form",res.data);
        }
    })
    }
    $('#restBtn').on('click',function(e){
        e.preventDefault();
        getUser();
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        let data=$(this).serialize();
        $.ajax({
            url:'/my/userinfo',
            type:'POST',
            data,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                window.parent.getUserinfo();  
            }
        })
    })
})