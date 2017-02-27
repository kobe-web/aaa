$(function(){
	var datas = JSON.parse(sessionStorage.getItem("getzdata"))
	var dat={tel:(datas[datas.length-1]).tel};
	$.get("getsale",dat,function(data){
		console.log(data);
		if (data.length>0) {
			for (var i = 0; i < data.length; i++) {
		$(".member1_table tbody:last").append("<tr><td>"+data[i].roomtype+"</td><td>"+
		data[i].date+"</td><td>"+data[i].zhudate+"</td><td>"+
		data[i].sale+"</td><td><button>退订</button></td></tr>")
				}		
			};
		});
	$(".member1_table").on("click","button",function(){
		alert("请拨打右上角的热线电话退订");
	})





















})