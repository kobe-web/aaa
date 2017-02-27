var fsrc = location.href.substring(location.href.indexOf('#')+1);
$(function(){
	// 关闭按钮：
	$("#close").click(function(){
		sessionStorage.clear();
		// 跳到主页：
		location.href = "zhucei.html";
	});
	// 进去页面时是否有#，没有则跳到#member0。html
	if (location.href.indexOf("#")!== -1) {
			$("#cont-f").load(fsrc);
	}else{
			location.href = location.href + "#member0.html";
			$("#cont-f").load("member0.html");
		}
		// 点击a链接时改变正式区板块
	$("#sidbar .list-group-item a").click(function(e){
		e.preventDefault();
		var htmlsrc = $(this).attr("href");
		$("#cont-f").load(htmlsrc);
		// alert(htmlsrc)
		// $("#sidbar .list-group-item").removeClass('active');
		// $(this).parent().addClass("active");
			// var datas = JSON.parse(sessionStorage.getItem("getzdata"));
			// console.log(datas);
			// $("#name").html(datas[0].name);
			// $("#pdd").html("00000"+datas[0].id);
			// $("#tel").html(datas[0].tel);
			// $("#psd").html(datas[0].psd);
		// 判断是否存在#
		if(location.href.indexOf("#") == -1){
			location.href = location.href + "#member0.html";
		}
		else{
			var patten = location.href.substring(location.href.indexOf('#')+1);
			location.href = location.href.replace(patten,htmlsrc);

		}
	});
	$("#ca").click(function() {
		location.href="shou.html";
	});
})