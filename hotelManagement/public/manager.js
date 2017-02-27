var manager_user = sessionStorage.getItem("manag");
if(manager_user == null){
	location.href = 'register.html';
}
$(function(){
	// 显示头像
	$("#head").attr('src',"../img/"+JSON.parse(manager_user)[0].image);
	$("#preuser").html(JSON.parse(manager_user)[0].name);
	
	// 去除右侧sider  a链接点击时的下划线
	$(".sider_all").on("click","a",function(){
		$(this).css('text-decoration','none')
	})

	if( location.href.indexOf('#') != -1 ){
		$("#search").load(location.href.substr(location.href.indexOf('#')+1))
	}
	
	var hhh = 0
	setInterval(function(){
 	hhh =	hhh + 1;
 	$(".bjtp").css({'background-image':'url(img/55.png)',
				'background-position-y':hhh + 'px'})
 	},50)
	//给右侧导航栏的导航链接赋予load
	$(".mana").on('click','a',function(e){
		e.preventDefault();
		var loadSrc = $(this).attr('href');
		$("#search").load(loadSrc);
		if (location.href.indexOf('#') != -1) {
			location.href = location.href.replace(location.href.substr(location.href.indexOf('#')+1),loadSrc)
		}else{
			location.href = location.href + '#' + loadSrc;
		}
	})

	//注销
	$("#cancel").click(function(){
		sessionStorage.clear();
		location.href = 'register.html';
	})

	$("#welcome").click(function(){
		location.href = 'shou.html';
	})

	$("#host").click(function(){
		$('a[href="#collapseOne"]').trigger('click');
		$('a[href="search.html"]').trigger('click');
	})

	$("#information").click(function(){
		$('a[href="#collapseTwo"]').trigger('click');
		$('a[href="vacancy.html"]').trigger('click');
	})
	
	$("#floor").click(function(){
		$('a[href="#collapseFive"]').trigger('click');
		$('a[href="roomstatus.html"]').trigger('click');
	})

	$("#sys").click(function(){
		$('a[href="#collapseFour"]').trigger('click');
		$('a[href="new.html"]').trigger('click');
	})

	
	$("#changepw").click(function(){
		$('a[href="#collapseFour"]').trigger('click');
		$('a[href="change.html"]').trigger('click');
	})
	// $("#search").load('spend.html');
	// location.href = location.href + "#" + 'spend.html'
})
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}