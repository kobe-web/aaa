$(function(){
	// saveData 用于保存发送到数据库的数据
	var saveData = {};
	//每个房间方框内放置一个按钮，用于打开模态框
	$(".deji").html(
			'<button type="button" class="btn btn-primary btn-lg btn_room" data-toggle="modal" >'+'</button>')
	//data-target="#myModal"

	//发送一次get请求,设置房间的状态,也就是颜色
	function setstatus(){
		$.get('findAll',function(data){
			$(".deji").attr('class','deji');
			for (var i = 0; i < data.length; i++) {
			//给房间设置一个sid，对应数据库里面的room里面的id
				$($(".deji")[i]).attr('sid',data[i].id)
				switch (data[i].status){
					case '1':
						$($(".deji")[i]).addClass("squre1");
						$(".deji.squre1 button").attr('data-target','#myModal_2');
						break;
					case '2':
						$($(".deji")[i]).addClass("squre2");
						$(".deji.squre2 button").attr('data-target','#myModal_1');
						break;
					case '3':
						$($(".deji")[i]).addClass("squre3");
						$(".deji.squre3 button").attr('data-target','#myModal');
						break;
					case '4':
						$($(".deji")[i]).addClass("squre4");
						break;
					case '5':
						$($(".deji")[i]).addClass("squre5");
						break;
					default:
						break;
				}
			}
		})
	}

	setstatus();

	// 登记
	$(".deji_all").on('click','.btn_room',function(){
		// 取到方框的sid，即房间的id
		/*var roomId = $(this)[0].parentNode.getAttribute('sid');
		// 给模态框里面的东东赋值
		$.get('findMessage',{sid:roomId},function(data){
			for(var item in data[0]){
				if(item === 'staytime'){
					var time = new Date().format("MM/dd/yyyy");
					$("#"+item).val(time);
					$("#"+item+'1').val(data[0][item]);
				}else{
					$("#"+item).val(data[0][item])
					$("#"+item+'1').val(data[0][item])
				}
			}
		})*/
		var roomId = $(this)[0].parentNode.getAttribute('sid');
		//
		time = new Date();
		//
		$("#day").keyup(function(){
			var day = $("#day").val();
			// 天化毫秒
			var dayms = day*86400000;
			var overdue = new Date(time.getTime()+dayms).format("MM/dd/yyyy");
			$("#overdue").val(overdue);
			var money = $("#discount").val()*day
			$("#roomcost").val(money)
		});
		// 给模态框里面的东东赋值
		$.get('findMessage',{sid:roomId},function(data){
			for(var item in data[0]){
				if(item === 'staytime'){
					var time1 = time.format("MM/dd/yyyy");
					$("#"+item).val(time1);
					$("#"+item+'1').val(data[0][item]);
					$("#"+item+'2').val(data[0][item]);
				}else{
					$("#"+item).val(data[0][item])
					$("#"+item+'1').val(data[0][item]);
					$("#"+item+'2').val(data[0][item]);
				}
			}
		})
	})

	// 登记以后的信息发送到数据库
	$("#login_btn").click(function(){
		var str = transforJSON($("#myform"))
		var strObj = JSON.parse(str);
		for(var item in strObj){
			saveData[item] = strObj[item];
		}
		$.post('addresident',saveData,function(data){
			if(data.changedRows > 0){
				$('#myModal').modal('hide');
				setstatus();
				$('.fish').fadeIn(500);
				$('.fish').fadeOut(1500);
			}
		})
	})

	// 预订的入住后
	$("#login_btn2").click(function(){
		var roomNum = $("#roomNum2").val();
		$.post('confirroom',{'roomNum':roomNum},function(data){
			if(data.changedRows > 0){
				$('#myModal_2').modal('hide');
				setstatus();
				$('.fish').fadeIn(500);
				$('.fish').fadeOut(1500);
			}
		})
	})

	//
	$("#add_btn").click(function(){
		var roomNum = $("#roomNum").val();
		$.post('checkout',{'roomNum':roomNum},function(data){
			if(data.changedRows > 0){
				$('#myModal').modal('hide');
				boxx();
			}
		})
	})
})

function transforJSON(find){
	var str=$(find).serialize();
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
}

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