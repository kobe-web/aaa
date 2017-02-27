var express = require('express');
var app = express();
var mysql = require('./db.js');
app.use(express.static('public'));
app.use(express.static('view'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var sql = '';
var sql1 = '';

//查询管理员
app.post("/findManager",urlencodedParser,function(req, res){
	sql = "select * from user where username='"+req.body.user+"' and pwd='"+req.body.pwd+"'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//查询所有房间
app.get("/findAll",function(req,res){
	sql = "select * from room";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

// 根据id查询房间信息
app.get("/findMessage",function(req,res){
	sql = "select * from room where id=" + req.query.sid;
	mysql.query(sql,function(result){
		res.send(result)
	})
})

// 根据房号查询房间信息
app.get("/findRoomAll",function(req,res){
	sql = "select * from room where roomNum='" + req.query.roomNum+"'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//查询所有已入住的房间
app.get("/fullRoom",function(req,res){
	sql = "select * from room where status = '2'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//根据房号查询已入住的房间
app.get("/findRoom",function(req,res){
	sql = "select * from room where status = '2' and roomNum = '" + req.query.roomNum + "'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//查询所有未入住的房间（所有空房）
app.get("/spareRoom",function(req,res){
	sql = "select * from room where status = '3'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//查询未入住（空房）单人间
app.get("/spareRoomOne",function(req,res){
	sql = "select * from room where status = '3' and typetwo = '1'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//查询未入住（空房）双人间的信息
app.get("/spareRoomTwo",function(req,res){
	sql = "select * from room where status = '3' and typetwo = '2'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//查询未入住的套房（空房）的信息，
app.get("/spareRoomThree",function(req,res){
	sql = "select * from room where status = '3' and typetwo = '3'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//根据六种房间类型设置房间的门市价(price),以及押金
app.post("/updateprice",urlencodedParser,function(req, res){
	sql = "update room set price = '" + req.body.price + "',discount = '"+req.body.discount+"'" + " where typeone = '" + req.body.typeone + "'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//追加押金
app.post("/addDepos",urlencodedParser,function(req, res){
	sql = "update room set deposit = '" + req.body.deposit +"',overdue ='"+ req.body.overdue +"'" + " where roomNum = '" + req.body.roomNum + "'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//退房
app.post("/checkout",urlencodedParser,function(req, res){
	sql = "update room set status='5',resident='',deposit='',overdue='',staytime='',tel='',idcard='' where roomNum = '" + req.body.roomNum + "'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//入住登记
app.post("/addresident",urlencodedParser,function(req, res){
	sql = "update room set discount = '" + req.body.discount + "',status = '2',resident='" +req.body.resident + "',deposit = '" +req.body.deposit+"',staytime='"+req.body.staytime+"',tel='"+req.body.tel+"',overdue='"+req.body.overdue+"',idcard='"+req.body.idcard+"' where roomNum ='"+req.body.roomNum+"'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//查询用户表
app.get("/resetpsw",function(req,res){
	sql = "select * from skt";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//重置密码
app.post("/reset",urlencodedParser,function(req, res){
	sql = "update skt set pwd = '666666' where id ='"+req.body.sid+"'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//根据身份证号查询用户
app.get("/finduser",function(req,res){
	sql = "select * from skt where psd = '" + req.query.psd + "'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//验证手机号
app.get("/check",function(req,res){
	sql = "select * from user where tel = '" + req.query.tel + "'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//验证用户名
app.get("/checkname",function(req,res){
	sql = "select * from user where username = '" + req.query.username + "'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//验证旧密码
app.get("/checkpwd1",function(req,res){
	sql = "select * from user where tel = '" + req.query.tel + "' and pwd = '" + req.query.pwd + "'";
	mysql.query(sql,function(result){
		res.send(result)
	})
})

//设置房态
app.post("/setstatus",urlencodedParser,function(req, res){
	sql = "update room set status = '" +req.body.status+"' where id ='"+req.body.sid+"'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});

//预订的房间确定入住
app.post("/confirroom",urlencodedParser,function(req, res){
	sql = "update room set status = '2' where roomNum ='"+req.body.roomNum+"'";
	mysql.query(sql,function(result){
		res.send(result);
	});
});
//新增管理员
app.post("/addmanager",urlencodedParser,function(req, res){
	// where 后面跟查询条件
	sql = "insert into user (image,name,username,pwd,tel) values (?,?,?,?,?)";
	var sqlprame = [req.body.img,req.body.nickname,req.body.username,req.body.pwd,req.body.tel];
	mysql.queryso(sql,sqlprame,function(result){
		// 响应发送数据
		res.send(result);
	});
});
//修改管理员密码
app.post("/changepwd",urlencodedParser,function(req, res){
	// where 后面跟查询条件
	sql = "update user set pwd = '"+req.body.pwd+"' where tel ='"+req.body.tel+"'";
	mysql.query(sql,function(result){
		// 响应发送数据
		res.send(result);
	});
});

sql = "insert into shop (sname,price,descs,num,stoprive,image,state) values (?,?,?,?,?,?,?)";
var server = app.listen(8087, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

// -------------------------------------------------------
app.post("/savezdata",urlencodedParser,function(req, res){
	// where 后面跟查询条件
	sql = "insert into skt (name,username,tel,psd,pwd,jifen) values (?,?,?,?,?,?)";
	var sqlprame = [req.body.relname,req.body.tel,req.body.tel,req.body.psd,req.body.pwd,5000];
	mysql.queryPrame(sql,sqlprame,function(result){
		// 响应发送数据
		res.send(result);
	});
});
// 储存预定信息
app.post("/saveyuding",urlencodedParser,function(req, res){
	// where 后面跟查询条件
	sql = "insert into yuding (roomtype,onsale,sale,name,tel,psd,date,zhudate) values (?,?,?,?,?,?,?,?)";
	var sqlprame = [req.body.roomtype,req.body.onsale,(+req.body.sale)*(+req.body.zhudate),req.body.name,req.body.tel,
	req.body.psd,req.body.date,req.body.zhudate];
	mysql.queryPrame(sql,sqlprame,function(result){
		// 响应发送数据
		res.send(result);
	});
});
// 预定成功增加积分；
app.post("/savejifen",urlencodedParser,function(req,res){
	sql = "update skt set jifen = jifen + 500 where tel=" + req.body.tel;
	mysql.query(sql,function(result){
		// 响应发送数据
		res.send(result);
	});
})
// 用户使用积分积分减少保存至数据库
app.post("/movejifen",urlencodedParser,function(req,res){
	sql = "update skt set jifen ='"+req.body.jifen+"' where tel='" + req.body.tel+"'";
	mysql.query(sql,function(result){
		// 响应发送数据
		res.send(result);
	});
})
// 得到用户的当前积分：
app.get("/getjifen",function(req,res){
	sql = "select * from skt where tel='" + req.query.tel +"'";
	mysql.query(sql,function(result){
		// 响应发送数据
			res.send(result);
		})
});
// 注册时从数据库提取数据进行验证
app.post("/getdata",urlencodedParser,function(req, res) {
	sql = "select * from skt where username='" + req.body.tel +"'";
	mysql.query(sql,function(result){
		// 响应发送数据
			res.send(result);
		});
	});
// 登录验证：
app.get("/getzdata",function (req,res) {
	sql = "select * from skt where username='"+req.query.username+"' and pwd='"+req.query.pwd+"'";
	mysql.query(sql,function (result) {
		res.send(result);
	})
	});
// 登录成功后获取用户消费信息；
app.get("/getsale",function(req,res){
	sql = "select * from yuding where tel='"+req.query.tel+"'";
	mysql.query(sql,function(result){
		res.send(result);
	})
});