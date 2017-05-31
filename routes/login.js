var express = require('express');
var router = express.Router();
var assert = require('assert');

router.route("/test").get(function(req,res){    // 到达此路径则渲染login文件，并传出title值供 login.html使用
    res.render("login",{title:'User Login'});
}).post(function(req,res){
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    var upwd = req.body.upwd;
    if(uname == 'sjtu' && upwd == '4a') {
        console.log(upwd);
        res.send(200);
        res.session.user = 'sjtu';
    }
    else{
        res.send(404);
    }
});

module.exports = router;