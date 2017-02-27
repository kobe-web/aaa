$(function(){
	$("#btn").click(function(){
		$("#register_form").validate({
			debug:true,
			submitHandler:function(form){
				// 序列化表当
				var serForm = $("#register_form").serialize();
				$.post("findManager",serForm,function(result){
					if (result.length > 0) {
						sessionStorage.setItem('manag',JSON.stringify(result));
						location.href = "manager.html#search.html"
					}else{
						$("#msg").removeClass("hidden")
						$("#msg").addClass("show")
					}
				})
			},
			
			rules:{
	            user:{
	                required:true,
	                minlength:5
	            },
	            pwd:{
	                required:true,
	                minlength:6
	            }
	        },
			messages:{
				user:{
					required:"不能为空",
					minlength:'账号长度不小于5个字符'
				},
				pwd:{
					required:"不能为空",
					minlength:'密码长度不小于6个字符'
				}
			}
		})
	})
})