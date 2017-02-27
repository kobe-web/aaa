$(function(){
	var datas = JSON.parse(sessionStorage.getItem("getzdata"))
	var dat={tel:(datas[datas.length-1]).tel};
	$.get("getsale",dat,function(data){
		var all = 0;
		if (data.length>0) {
			for (var i = 0; i < data.length; i++) {
				all+=data[i].sale-0;
			}
			$("#all").html(all);
			$("#cishu").html(data.length);
			$("#pinjun").html("￥"+Math.floor(all/data.length));
			// $("#jiji").html(all*10);
		}
			else{
				}
	});
	$.get("getjifen",dat,function(data){
		console.log(dat);
		if (data.length>0) {
			console.log(data);
			}
			$("#jiji").html(data[0].jifen);
});
})