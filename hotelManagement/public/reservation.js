$(function(){
	var a,d,c,k,kk;
	$('.yu').click(function(){
		// 点击预定取到预定的房间类型，以及原先价格以及折扣价格：
		a=this.parentNode.firstElementChild.innerHTML;
		d=this.previousElementSibling.firstElementChild.innerHTML;
		d = d.replace("￥","");
		c=this.previousElementSibling.lastElementChild.innerHTML;
		c = c.replace("￥","");
		// 点击预定模态框出现：
		$('#example').modal('show');
	});
	// 取到当前时间：
	var ti = new Date();
	var	ti = ti.toLocaleDateString();
	// 把取到的当前时间放进模态框的入住时间一项：
	$('#ondate').val(ti);
	// 点击确认预定按钮：
	$(".btn-success").click(function(){
		// 把要传输出去的数据放到usery对象里面：
		var usery = {
			roomtype:a,
			onsale:d,
			sale:c,
			name:$('#name').val(),
			tel:$('#tel').val(),
			psd:$('#psd').val(),
			date:$('#ondate').val(),
			zhudate:$("#zhudate").val()
		}
		// 自定义一个函数发送请求，将用户预定信息存入预定表数据库；
		k = function(){
				$.post("saveyuding",usery,function(data){
					console.log(data);
								if(data.affectedRows>0){
									$("#example").modal("hide");
									alert("恭喜你预定成功");
							}
							});
							// 清空用户预定输入框：
							$('#name').val("");
							$('#tel').val("");
							$('#psd').val("");
							$('#ondate').val("");
							$("#zhudate").val("");
		}
		kk = function(){
			$.post("savejifen",usery,function(data){
				// if (data.affectedRows>0) {
				// };
			})
		}
// 做一个原装的表单验证；
		if (usery.name=="") {
			// 填入姓名不能为空；
			$("#name").attr("placeholder","不能为空×");	
		}else{
			// 姓名验证通过进行电话号码验证：要以13，14,15,18开头；
			var re = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
				if(re.test(usery.tel)){
					// 电话号码验证通过进行身份证号码验证；
				var	isIDCard=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
					if (isIDCard.test(usery.psd)) {
						if (usery.date=="") {
							alert("请输入你入住时间")
						}else{
							// 最后用户必须输入入住天数；
						 	if (usery.zhudate=="") {
						 		alert("请输入你入住天数")
						 	}else{
						 		// 执行函数发送请求；
						 		k();
						 		kk();
						 	}
				}						
					}else{alert("请输入正确的身份证格式")}
				}else{
					alert("请输入正确的手机号码格式");
				}
		}			
	});


	});













