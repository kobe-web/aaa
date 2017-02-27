$(function(){
	var datas = JSON.parse(sessionStorage.getItem("getzdata"));
	$("#name").html(datas[0].name);
	$("#pdd").html("00000"+datas[0].id);
	$("#tel").html(datas[0].tel);
	$("#psd").html(datas[0].psd);
})
// var getuser = function(){
// 	var datas = JSON.parse(sessionStorage.getItem("getzdata"));
// 	console.log(datas);
// 	$("#name").html(datas[0].name);
// 	$("#pdd").html("00000"+datas[0].id);
// 	$("#tel").html(datas[0].tel);
// 	$("#psd").html(datas[0].psd);
// }