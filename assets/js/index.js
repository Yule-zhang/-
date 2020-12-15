getUserinfo();
let layer=layui.layer;
function getUserinfo(){
    $.ajax({
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')
        // },
        success:function(res){
            if (res.status !==0) {
                return layer.msg('获取用户信息失败!');
            }
            $('.userInfo').show();
            $('.userInfos').show();
            let name=res.data.nickname || res.data.username;
            $('#tex').text(name);

            if(res.data.user_pic){
                $('.textav').hide();
                $('.layui-nav-img').show().attr('src',res.data.user_pic);
            }else{
                $('.textav').show().text(name[0].toUpperCase());
                $('.layui-nav-img').hide();
            }

        },
        complete:function(res){
            // console.log(res);
            let data=res.responseJSON;
            // console.log(data);
            // console.log( res.message);
            if( data.message==='身份认证失败！' && data.status===1 ){
                location.href='/home/login.html';
                localStorage.removeItem('token');
            }

        }

    })
}

$('#Logout').on('click',function(){
    layer.confirm('确定退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token');
        location.href='/home/login.html';
        layer.close(index);
      });
})