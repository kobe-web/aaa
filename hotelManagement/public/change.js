$(function(){
	$("#login_m").click(function(e){
		$("#myform").validate({
			debug:true,
			submitHandler:function(form){
				$.post("changepwd",{tel:$("#tel").val(),pwd:$("#pwd").val()},function(result){
					if (result.affectedRows > 0) {
						$('.fish').fadeIn(500);
						$('.fish').fadeOut(1500);
						$("#myform")[0].reset()
					}
				})
			},
			rules:{
				pwd1:{
	                required:true
	            },
	            pwd:{
	                required:true,
	                minlength:6
	            },
	            spwd:{
	                equalTo: "#pwd"
	            },
	            tel:{
	            	number: "true",
	            	required:true,
	                minlength:11,
	                maxlength:11
	            }
	        },
			messages:{
				pwd1:{
					required:"不能为空"
				},
				pwd:{
					required:"不能为空",
					minlength:'密码长度不小于6个字符'
				},
				spwd:{
					equalTo: "两次密码输入不一致"
				},
				tel:{
					number: "请输入有效的数字",
					required:"不能为空",
					minlength:'请输入有效的手机号码',
					maxlength:'请输入有效的手机号码'
				}
			}
		})
	})
	$("#pwd1").keyup(function(){
		$.get('checkpwd1',{tel:$("#tel").val(),pwd:$('#pwd1').val()},function(result){
			if(result.length == 0){
				$(".dip").show();
				$("#login_m")[0].disabled = true;
			}else{
				$(".dip").hide();
				$("#login_m")[0].disabled = false;
			}
		})
	})
})