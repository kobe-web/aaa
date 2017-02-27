window.onload = function(){
	//取到要改变背景图的div的id
	var imgbg = document.getElementById("BackgroundArea");
	var imglist = document.getElementById('img-list');
    //创建一个定时器用来控制背景图变化的时间
	setInterval(function  sun() {
		//创建一个数组来包裹所有背景图
		var imgArr=["../img/q6.jpg","../img/q7.jpg","../img/q8.jpg",];
		//生成一个随机数
		var index =parseInt(Math.floor(Math.random()*(imgArr.length)));
		//把随机数当做数组的下标索引
		var currentImage=imgArr[index];
		imgbg.style.backgroundImage="url("+currentImage+")";	
	},3000);

    //控制图片
	setInterval(function  box() {
		//创建一个数组来包裹所有背景图
		var imgArr=["../img/q20.png","../img/q21.png","../img/q22.png",];
		//生成一个随机数
		var index =parseInt(Math.floor(Math.random()*(imgArr.length)));
		//把随机数当做数组的下标索引
		var currentImage=imgArr[index];
		imglist.src=currentImage;	
	},2000);

	//用定时器控制
	setInterval(function sum(){
        //获取元素id
		var nav22 = document.getElementById('nav-22');
		var nav11 = document.getElementById('nav-11');
		var index = (Math.random()*(20-10)+10);
		if (index > 15 ) {
        nav22.style.display="inline-block";
        nav11.style.display="none";
		}else if (index < 15){
        nav22.style.display="none";
        nav11.style.display="inline-block";
		};
	},1000);
	// 绑定点击事件使按钮跳转
	var butinput1 = document.getElementById('butinput');
	  butinput1.onclick = function() {
	  	window.location.href="zhucei.html";
	  }
     //第二个点击事件
	 var butinput2 = document.getElementById('butinput1');
	   butinput2.onclick = function(){
	   	window.location.href = 'denglu.html';
	   }
	  //第三个点击事件
	  var butinput3 = document.getElementById('butinput2');
	   butinput3.onclick = function(){
	   	window.location.href='reservation.html';
	   }
	   //第四个点击事件
	   var butinput4 = document.getElementById('butinput3');
	   butinput4.onclick = function(){
	   	window.location.href = 'denglu.html';
	   }


	

   
			
}