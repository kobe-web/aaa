$(function(){
	var jifeng;
	var datas = JSON.parse(sessionStorage.getItem("getzdata"))
	var dat={tel:(datas[datas.length-1]).tel};
	$.get("getjifen",dat,function(data){
		if (data.length>0) {
			console.log(data);
			$(".jifeng").html(data[0].jifen);
			}
			jifeng = data[0].jifen;
			// $(".jifeng").html(data[0].jifen);
});
	
	console.log(jifeng);
	$("#bt1").click(function(){
		if (jifeng-0<1200) {
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为ASJIDO60S2D");
			jifeng = jifeng-1200;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){
				console.log(data);
			})
			return jifeng;

		}
	});
	$("#bt2").click(function(){
		if(jifeng-0<1500){
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为KFJSDLKJ263");
			jifeng = jifeng-1500;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){
				console.log(data);
			})
			return jifeng;
		}
	});
	$("#bt3").click(function(){
		if (jifeng-0<2600) {
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为SDFSD20S2DF");
			jifeng = jifeng-2600;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
	$("#bt4").click(function(){
		if(jifeng-0<6000){
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为RFSFSGDSDWE");
			jifeng = jifeng-6000;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
	$("#bt5").click(function(){
		if (jifeng-0<9500) {
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为GDF6FDGDF25");
			jifeng = jifeng-9500;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
	$("#bt6").click(function(){
		if(jifeng-0<6500){
			alert("亲，你的积分不足")
		}else{
			alert("恭喜你兑换成功，兑奖码为TRHRFG32DLD");
			jifeng = jifeng-6500;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
	$("#bt7").click(function(){
		if (jifeng-0<8800) {
			alert("亲，你的积分不足");
		}else{
			alert("恭喜你兑换成功，兑奖码为OKDCXMN69D6");
			jifeng = jifeng-8800;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
	$("#bt8").click(function(){
		if(jifeng-0<10000){
			alert("亲，你的积分不足");
		}else{
			alert("恭喜你兑换成功，兑奖码为6SDAAWQQRBZ");
			jifeng = jifeng-10000;
			$(".jifeng").html(jifeng);
			$.post("movejifen",{jifen:jifeng,tel:(datas[datas.length-1]).tel},function(data){});
			return jifeng;
		}
	});
})
