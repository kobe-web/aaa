var mysql = require("mysql");
var db = {};
db.query = function sqlback(sql,fn){
	var connection = mysql.createConnection({    
	  	host:'127.0.0.1',  
	  	user:'root',  
	  	password: '427425', 
	  	port:'3306',   
	  	database:'test',
	});
	connection.connect(function(err){
		if(err){   
			console.log(err);
			return;
		}
	});
	if(!sql) return;
	connection.query(sql,function(err,rows,fields){
		if(err){   
			console.log(err);
			return;
		}
		fn(rows);
	});
	connection.end(function(err){
		if(err){
			return
		}else{
			console.log("连接关闭");
		}
	});
}
db.queryso = function sqlback(sql,sql1,fn){
	var connection = mysql.createConnection({    
	  	host:'127.0.0.1',  
	  	user:'root',  
	  	password: '427425', 
	  	port:'3306',   
	  	database:'test',
	});
	connection.connect(function(err){
		if(err){   
			console.log(err);
			return;
		}
	});
	if(!sql) return;
	connection.query(sql,sql1,function(err,rows,fields){
		if(err){   
			console.log(err);
			return;
		}
		fn(rows);
	});
	connection.end(function(err){
		if(err){
			return
		}else{
			console.log("连接关闭");
		}
	});
};
db.queryPrame = function sqlback(sql,sqlprame,fn){
	// 创建连接
	var connection = mysql.createConnection({    
	  	// 所访问数据库的主机名
	  	host:'127.0.0.1',  
	    // 数据库账号
	  	user:'root',  
	  	// 数据库密码
	  	password: '427425', 
	  	// 数据库服务所在端口号   mysql默认就是3306
	  	port:'3306',   
	  	// 数据库名称
	  	database:'test',
	});
	// 检测连接是否成功
	connection.connect(function(err){
		if(err){   
			console.log(err);
			return;
		}
	});
	// 判断是否存在sql语句
	if(!sql) return;
	// 执行查询语句
	// rows保存的是查询结果
	connection.query(sql,sqlprame,function(err,rows,fields){
		if(err){   
			console.log(err);
			return;
		}
		// 执行回调
		fn(rows);
	});
	// 关闭连接
	connection.end(function(err){
		if(err){
			return
		}else{
			console.log("连接关闭");
		}
	});
}
module.exports = db;