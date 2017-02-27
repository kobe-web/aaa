$(function(){
	var save = {};
	$("#login_m").click(function(e){
		$("#myform").validate({
			debug:true,
			submitHandler:function(form){
				var serForm = JSON.parse(transforJSON("#myform"));
				for(var item in serForm){
					save[item]=serForm[item]
				}
				$.post("addmanager",save,function(result){
					console.log(result)
					if (result.affectedRows > 0) {
						$('.fish').fadeIn(500);
						$('.fish').fadeOut(1500);
						$("#myform")[0].reset()
						setTimeout(function(){
							$('a[href="#collapseOne"]').trigger('click');
							$('a[href="search.html"]').trigger('click');
						},1500)
					}
				})
			},
			rules:{
				nickname:{
	                required:true,
	                minlength:3
	            },
	            username:{
	                required:true,
	                minlength:3
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
				nickname:{
					required:"不能为空",
					minlength:'账号长度不小于5个字符'
				},
				username:{
					required:"不能为空",
					minlength:'账号长度不小于5个字符'
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
	$("#tel").keyup(function(){
		$.get('check',{tel:$("#tel").val()},function(result){
			if(result.length>0){
				$("#login_m")[0].disabled = true;
				$(".dip").show()
			}else{
				$("#login_m")[0].disabled = false;
				$(".dip").hide()
			}
		})
	})
	$("#username").keyup(function(){
		$.get('checkname',{username:$("#username").val()},function(result){
			if(result.length>0){
				$(".dip1").show()
			}else{
				$(".dip1").hide()
			}
		})
	})
	$("#file").change(function(){
		save.img = this.files[0].name;
		$("#simg").attr('src',"../img/"+this.files[0].name)
	})
	function transforJSON(find){
		var str = $(find).serialize();
		str = decodeURIComponent(str,true);
		var arr=str.split("&");
		var json="{"
		for(var i=0;i<arr.length;i++){
			//[name,wenber]
			var temp=arr[i].split("=");
			//
			if(i==arr.length-1){
				json=json+"\""+temp[0]+"\":\""+temp[1]+"\"";
			}else{
				json=json+"\""+temp[0]+"\":\""+temp[1]+"\",";
			}
		}
		json=json+"}";
		return json;
	};
})
