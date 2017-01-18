/**
 * Created by ganfengbao on 2017/1/18.
 */
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var session = require('express-session');
app.use(session({
   secret:'keyboard cat',
   resave:false,
   saveUninitialized:true
}));


var allUser = [];
var count = 0;

app.use(express.static('./public'));
app.set('view engine','ejs');

app.get('/',function(req,res,next){
   res.render('index');
});
app.get('/check',function(req,res,next){
   var username = req.query.username;
   if(!username){
      res.send('必须填写用户名');
      return;
   }
   if(allUser.indexOf(username) != -1){
         res.send("用户名被占用");
      return;
   }
   allUser.push(username);

   req.session.username = username;
   res.redirect('/chat');

});

app.get('/chat',function(req,res,next){
   if(!req.session.username){
      res.redirect('/');
      return;
   }
   count = allUser.length;
   res.render('chat',{
      "username":req.session.username,
      "count":count
   });
});

io.on("connection",function(socket){
   socket.on("liaotian",function(msg){
      io.emit("liaotian",msg);
   });
});


http.listen(3000);