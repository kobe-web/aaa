$(function(){
	function priceUp(){
		$.get("findAll",function(data){
			var tbodyHtml = "";
			for (var i = 0; i < data.length; i=i+6) {
				tbodyHtml = tbodyHtml +'<tr class = ' + data[i].typeone + '><td>'+data[i].type + '</td><td><input type="number" class = "form-control input_css price" value = "'+data[i].price+ '"">' +'</td><td><input type="number" class = "form-control input_css discount" value = "'+data[i].discount + '"">'+'</td>'+'<td>'+'<button type="button" class="btn_confir btn btn-info" sid = '+ data[i].typeone +'>确定</button>'+'</td>'+'</tr>'
			}
			$("#tbody").html(tbodyHtml)
		})
	}

	priceUp();

	$("#tbody").on('click','.btn_confir',function(){
		var trclass = this.getAttribute('sid');
		var price = $("." + trclass + " .price").val();
		var discount = $("." + trclass + " .discount").val();
		$.post("updateprice",{'price':price,'discount':discount,'typeone':trclass},function(data){
				console.log(data)
				if(data.changedRows>0){
					$('.fish').fadeIn(500);
					$('.fish').fadeOut(1500);
				}else{
					priceUp();
				}
		})
	})
})