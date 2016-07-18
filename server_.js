var express=require('express');
var app=express();
var port=9000;
app.use(log);
app.get('/',log,hello);
function log(req,res,next) {
  console.log(new Date(),req.method,req.url);
  next();
  }
  function hello(req,res,next) {
    res.write("hello");
    res.end();
    next();
  }
app.listen(port,function(err,res){
  if(err){console.log("err");}
  else{console.log('server started '+port);}
});
