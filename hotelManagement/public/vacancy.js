$(function(){
	var saveData = {};
	// 去掉点击时的边框
	$("ul.ul_border li").on('click','a.btn',function(){
		$("ul li a.btn").removeClass('click_bk')
		$(this).css('border','none');
		$(this).addClass('click_bk')
	})
	
	// 渲染所有房间
	function allSpare(){
		$.get('spareRoom',function(data){
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

	//*******
	allSpare();
	
	$("#two").click(function(){
		$.get("spareRoomOne",function(data){
			var pageNum = Math.ceil(data.length/7);        //4

			//生成分页
			if(pageNum>1){
				var pageHtml = '<li><a href="#" class = "pre_page">&laquo;</a></li>';
				for (var i = 1; i < pageNum+1; i++) {
					pageHtml = pageHtml + '<li><a href="#" class = "page_btn" sid ="'+i+'">'+i+'</a></li>';
				}
				pageHtml = pageHtml + '<li><a href="#" class = "next_page">&raquo;</a></li>';
				$(".div_foot2 .pagination").html(pageHtml);
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
			$("#tbody2").html(ar1)
			$("#tbody2").attr('sid',0)

			//给每个数字分页按钮绑定一个事件
			$(".div_foot2").on('click','.page_btn',function(e){
				e.preventDefault();
				for (var i = 0; i < array.length; i++) {
					if($(this).attr('sid') == i+1){
						$("#tbody2").html(array[i]);
						$("#tbody2").attr('sid',i)
					}
				}

			})

			//上一页
			$(".pre_page").click(function(e){
				e.preventDefault();
				if ($("#tbody2").attr('sid') > 0) {
					$("#tbody2").html(array[$("#tbody2").attr('sid')-1]);
					$("#tbody2").attr('sid',$("#tbody2").attr('sid')-1);
				}
			})

			//下一页
			$(".next_page").click(function(e){
				e.preventDefault();
				if ($("#tbody2").attr('sid') < array.length-1) {
					$("#tbody2").html(array[+$("#tbody2").attr('sid')+1]);
					$("#tbody2").attr('sid',+$("#tbody2").attr('sid')+1);
				}
			})
		})
	})

	$("#three").click(function(){
		$.get("spareRoomTwo",function(data){
			var pageNum = Math.ceil(data.length/7);        //4

			//生成分页
			if(pageNum>1){
				var pageHtml = '<li><a href="#" class = "pre_page">&laquo;</a></li>';
				for (var i = 1; i < pageNum+1; i++) {
					pageHtml = pageHtml + '<li><a href="#" class = "page_btn" sid ="'+i+'">'+i+'</a></li>';
				}
				pageHtml = pageHtml + '<li><a href="#" class = "next_page">&raquo;</a></li>';
				$(".div_foot3 .pagination").html(pageHtml);
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
			$("#tbody3").html(ar1)
			$("#tbody3").attr('sid',0)

			//给每个数字分页按钮绑定一个事件
			$(".div_foot3").on('click','.page_btn',function(e){
				e.preventDefault();
				for (var i = 0; i < array.length; i++) {
					if($(this).attr('sid') == i+1){
						$("#tbody3").html(array[i]);
						$("#tbody3").attr('sid',i)
					}
				}
			})

			//上一页
			$(".pre_page").click(function(e){
				e.preventDefault();
				if ($("#tbody3").attr('sid') > 0) {
					$("#tbody3").html(array[$("#tbody3").attr('sid')-1]);
					$("#tbody3").attr('sid',$("#tbody3").attr('sid')-1);
				}
			})

			//下一页
			$(".next_page").click(function(e){
				e.preventDefault();
				if ($("#tbody3").attr('sid') < array.length-1) {
					$("#tbody3").html(array[+$("#tbody3").attr('sid')+1]);
					$("#tbody3").attr('sid',+$("#tbody3").attr('sid')+1);
				}
			})
		})
	})

	$("#four").click(function(){
		$.get("spareRoomThree",function(data){
			var pageNum = Math.ceil(data.length/7);        //4

			//生成分页
			if(pageNum>1){
				var pageHtml = '<li><a href="#" class = "pre_page">&laquo;</a></li>';
				for (var i = 1; i < pageNum+1; i++) {
					pageHtml = pageHtml + '<li><a href="#" class = "page_btn" sid ="'+i+'">'+i+'</a></li>';
				}
				pageHtml = pageHtml + '<li><a href="#" class = "next_page">&raquo;</a></li>';
				$(".div_foot4 .pagination").html(pageHtml);
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
			$("#tbody4").html(ar1)
			$("#tbody4").attr('sid',0)

			//给每个数字分页按钮绑定一个事件
			$(".div_foot4").on('click','.page_btn',function(e){
				e.preventDefault();
				for (var i = 0; i < array.length; i++) {
					if($(this).attr('sid') == i+1){
						$("#tbody4").html(array[i]);
						$("#tbody4").attr('sid',i)
					}
				}
			})

			//上一页
			$(".pre_page").click(function(e){
				e.preventDefault();
				if ($("#tbody4").attr('sid') > 0) {
					$("#tbody4").html(array[$("#tbody4").attr('sid')-1]);
					$("#tbody4").attr('sid',$("#tbody4").attr('sid')-1);
				}
			})

			//下一页
			$(".next_page").click(function(e){
				e.preventDefault();
				if ($("#tbody4").attr('sid') < array.length-1) {
					$("#tbody4").html(array[+$("#tbody4").attr('sid')+1]);
					$("#tbody4").attr('sid',+$("#tbody4").attr('sid')+1);
				}
			})
		})
	})
	
	$(".tab_pos").on('click','.add_btn',function(){
		// 取到方框的sid，即房间的id
		var roomId = $(this).attr('sid');
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
				}else{
					$("#"+item).val(data[0][item])
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
				setTimeout(function(){
				$('.fish').fadeIn(500);
				$('.fish').fadeOut(1500);
				},300)
				$("#search").load('vacancy.html');

				$(".modal-backdrop.fade").css('display','none');
				
			}
		})
	})

	// 把数组生成为html
	function box(data){
		var tbodyHtml = "";
		for (var i = 0; i < data.length; i++) {
			tbodyHtml = tbodyHtml +'<tr><td>'+data[i].roomNum + '</td><td>' + data[i].type +
			'</td><td>'+data[i].price +'</td>'+'<td>'+data[i].discount+'</td>'
	  			+'<td>'+'<button type="button" class="btn btn-info add_btn" data-toggle="modal" data-target="#myModal" sid= "' + data[i].id + '">入住登记'+'</button>'+'</td>'+'</tr>'

		}
		return tbodyHtml;
	}	
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