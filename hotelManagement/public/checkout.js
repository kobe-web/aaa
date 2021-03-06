$(function(){
	function boxx(){
		$.get('fullRoom',function(data){
			console.log(data)
			var pageNum = Math.ceil(data.length/7);        //4

			//生成分页
			if(pageNum>1){
				var pageHtml = '<li><a href="#" class = "pre_page">&laquo;</a></li>';
				for (var i = 1; i < pageNum+1; i++) {
					pageHtml = pageHtml + '<li><a href="#" class = "page_btn" sid ="'+i+'">'+i+'</a></li>';
				}
				pageHtml = pageHtml + '<li><a href="#" class = "next_page">&raquo;</a></li>';
				$(".div_foot1 .pagination").html(pageHtml);
			}
			
			// 把返回回来的数组重新分化数组
			var arr1 = [],arr2 = [],arr3 = [],arr4 = [],arr5 = [],arr6 =[];
			for (var i = 0; i < data.length; i++) {
				var j = i+1;
				var arrNum = Math.ceil(j/7);
				switch(arrNum){
					case 1:
						arr1.push(data[i]);
						break;
					case 2:
						arr2.push(data[i]);
						break;
					case 3:
						arr3.push(data[i]);
						break;
					case 4:
						arr4.push(data[i]);
						break;
					case 5:
						arr5.push(data[i]);
						break;
					case 6:
						arr6.push(data[i]);
						break;
					default:
						break;
				}
			}

			var ar1 = box(arr1);
			var ar2 = box(arr2);
			var ar3 = box(arr3);
			var ar4 = box(arr4);
			var ar5 = box(arr5);
			var ar6 = box(arr6);

			var arry = [ar1,ar2,ar3,ar4,ar5,ar6];
			
			var array = arry.filter(function(item) { 
				if(item){
					return item;
				}
			});

			// 首次显示的样子
			$("#tbody").html(ar1)
			$("#tbody").attr('sid',0)
			$(".pagination li:nth-child(2)").addClass('active')

			//给每个数字分页按钮绑定一个事件
			$(".div_foot1").on('click','.page_btn',function(e){
				e.preventDefault();
				for (var i = 0; i < array.length; i++) {
					if($(this).attr('sid') == i+1){
						$("#tbody").html(array[i]);
						$("#tbody").attr('sid',i)
					}
				}
				$(".pagination li").removeClass('active')
				$(this).parent().addClass('active')
			})

			//上一页
			$(".pre_page").click(function(e){
				e.preventDefault();
				var act = $("#tbody").attr("sid");
				if(act>0){
					$('.pagination li').removeClass('active')
					$(".pagination li a[sid='"+act+"']").parent().addClass('active')
				}
				
				if ($("#tbody").attr('sid') > 0) {
					$("#tbody").html(array[$("#tbody").attr('sid')-1]);
					$("#tbody").attr('sid',$("#tbody").attr('sid')-1);
				}
			})

			//下一页
			$(".next_page").click(function(e){
				e.preventDefault();
				var act = +$("#tbody").attr("sid")+2;
				console.log(act)
				if(act < array.length+1){
					$('.pagination li').removeClass('active')
					$(".pagination li a[sid='"+act+"']").parent().addClass('active')
				}
				if ($("#tbody").attr('sid') < array.length-1) {
					$("#tbody").html(array[+$("#tbody").attr('sid')+1]);
					$("#tbody").attr('sid',+$("#tbody").attr('sid')+1);
				}
			})
		})
	}

	// 把数组生成为html
	function box(data){
		var tbodyHtml = "";
		for (var i = 0; i < data.length; i++) {
				tbodyHtml = tbodyHtml +'<tr><td>'+data[i].roomNum + '</td><td>' + data[i].type +
				'</td><td>'+data[i].discount +'</td>'+'<td>'+data[i].resident+'</td>'+'<td>'+data[i].deposit+'</td><td>'+data[i].overdue +'</td><td>'+'<button type="button" class="btn btn-info add_btn" data-toggle="modal" data-target="#myModal" sid= "' + data[i].id + '">申请退房'+'</button>'+'</td>'+'</tr>'
			}
		return tbodyHtml;
	}

	boxx();

	$("#search_all").click(function(){
		boxx();
	})

	$("#search_btn").click(function(){
		var roomNum = $("#search_input").val();
		$.get("findRoom",{roomNum:$("#search_input").val()},function(data){
			var tbodyHtml = "";
			for (var i = 0; i < data.length; i++) {
				tbodyHtml = tbodyHtml +'<tr><td>'+data[i].roomNum + '</td><td>' + data[i].type +
				'</td><td>'+data[i].discount +'</td>'+'<td>'+data[i].resident+'</td>'+'<td>'+data[i].deposit+'</td>'
		  		+'<td>'+data[i].overdue +'</td><td>'+'<button type="button" class="btn btn-info add_btn" data-toggle="modal" data-target="#myModal" sid= "' + data[i].id + '">申请退房'+'</button>'+'</td>'+'</tr>'
			}
			$("#tbody").html(tbodyHtml);
			$(".div_foot1 .pagination").html("");
		})
	})

	// .add_btn 是'申请退房'按钮
	// 给每一个追加押金的btn添加一个点击事件，点击出现模态框
	$("#tbody").on("click",".add_btn",function(){
		var roomId = this.getAttribute('sid');
		$.get('findMessage',{'sid':roomId},function(data){
			var overdue = new Date().format("MM/dd/yyyy")
			var staytime = data[0].staytime;
			var time = (Date.parse(overdue)-Date.parse(staytime))/86400000
			var cost = time*data[0].discount
			var balance = data[0].deposit - cost;
			for(var item in data[0]){
				$("#"+item).val(data[0][item])
			}
			$("#overdue").val(overdue);
			$("#balance").val(balance);
			$("#cost").val(cost);
			$("#addDeposit").val(-balance)
		})
	})

	
	// #add_btn 是模态框里面的确认按钮
	// 给模态框里面的每一个确定按钮绑定一个click事件
	$("#add_btn").click(function(){
		var roomNum = $("#roomNum").val();
		var add_price = $("#addDeposit").val();
		var deposit = +$("#deposit").val() + (+add_price);
		$.post('checkout',{'roomNum':roomNum,'deposit':deposit},function(data){
			if(data.changedRows > 0){
				$('#myModal').modal('hide');
				boxx();
				$('.fish').fadeIn(500);
				$('.fish').fadeOut(1500);
			}
		})
	})
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