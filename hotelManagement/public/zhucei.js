$(function(){
		yanzheng();
	$("#yanzhengma").click(function(){
		$("#yanzheng").val("");
		yanzheng();
	})
	// 注册按钮绑定事件↓
	$("#btn").click(function(){
		debugger
		// 将生成的验证码转化成小写
		gg = gg.toLowerCase();
		// 得到用户输入的验证码
		// var vl = $("#yanzheng").val();
		// // 将用户输入的验证码转化成小写
		// vl=vl.toLowerCase();
		// console.log(vl);
		// 执行表单验证↓
		$("#biao").validate({
			// if ($("#relname").value==123) {
			// 	alert("123")
			// }
			// 验证成功发送请求↓
			submitHandler:function(form){
					// 禁用提交按钮↓
					$("#btn").addClass("disabled");
					// 序列化表单↓
					var biaoData = $("#biao").serialize();
					// 发送post请求↓
					$.post("getdata",biaoData,function(data){
						if(data.length>0){
							alert("此用户已被注册");
						}else{
							vl = $("#yanzheng").val();
							vl = vl.toLowerCase();
					// 判断用户输入的验证码是否和页面的验证码匹配
							if (vl==gg)
								{ak();}else{
								alert("请输入正确的验证码");
								yanzheng();
								$("#yanzheng").val("");
								return false;
							}	
						}
					})
				// 注册成功提交到数据库绑定方法：
				var ak = function(){$.post("savezdata",biaoData,function(data){
						console.log(data);
						if(data.affectedRows>0){
							// zhucei成功，将登录信息存入sessionStorage↓
							sessionStorage.setItem("savezdata",JSON.stringify(data));
							// 跳转页面↓
							alert("恭喜你注册成功");
							location.href = "shou.html";
						}else{
							// 注册失败,显示提示信息，并且按钮重新置为可用状态↓
							$("#btn").removeClass("disabled");
						}
					})};

	        },
			debug:true,
			rules:{
				// 真实姓名验证
				relname:{
					required:true
				},
	            // 密码验证
	            pwd:{
	                required:true,
	                minlength:6
	            },
	            dpwd:{
	            	equalTo:"#pwd"
	            },
	            // 手机号码验证；
	            tel:{
	            	required:true,
	            	rangelength:[11,11],
	            	digits:true 
	            },
	            // 身份证验证：
	            psd:{
	            	required:true,
	            	rangelength:[18,19],
	            	digits:true
	            },
	        },
	        // 验证失败后的提示信息
			messages:{
				relname:{
					required:"不能为空，请输入你的真实姓名"
				},
				pwd:{
					required:"密码不能为空",
					minlength:"密码不能少于5位"
				},
				dpwd:{
					equalTo:"两次输入密码不一致"
				},
				tel:{
					required:"手机号码不能为空",
					rangelength:"请输入正确的手机号码",
					digits:"请输入正确的手机号码"
				},
				psd:{
					required:"为保障权益请输入您的身份证号码",
					rangelength:"请输入正确的身份证号码",
					digits:"请输入正确的身份证号码"
				},
			}
		});
		// 若用户输入的验证码不匹配
		// else{
		// 	alert("请输入正确的验证码");
		// 	yanzheng();
		// 	$("#yanzheng").val("");
		// 	return false;
		// }	
	});
});
// 验证码所需字母数字：
var arry = ['a','b','c','d','e','f','g','h','i','j','k','l','1','2','3','4','5','6','7','8','9','0','m',
'n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','J','G','I','J','K','L','M',
'O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
// 验证码背景图的url地址：
var arrya =['img/yanzheng/yzt0.jpg','img/yanzheng/yzt1.jpg','img/yanzheng/yzt2.jpg',
'img/yanzheng/yzt3.gif','img/yanzheng/yzt4.jpg','img/yanzheng/yzt5.jpg',
'img/yanzheng/yzt6.jpg','img/yanzheng/yzt7.jpg','img/yanzheng/yzt8.gif','img/yanzheng/yzt9.jpg'];
// 给验证码更改绑定方法：
var yanzheng = function() {
		var a = parseInt(Math.random()*70);
		var b = parseInt(Math.random()*70);
		var c = parseInt(Math.random()*70);
		var d = parseInt(Math.random()*70);
		var e = parseInt(Math.random()*9);
		// 点击时生成验证码；
		gg = (arry[a]+arry[b]+arry[c]+arry[d]);
		$("#yanzhengma").html(gg);
	// 点击验证码区域改变验证码背景图：
		$("#yanzhengma").css("background","url("+arrya[e]+")");
	// 变为全局作用域
		return gg;
}