var express=require('express');
var app=express();
app.use(function fun1(req,res,next) {
  console.log("1");
  next();
});
app.all('*',function (req,res,next) {
  console.log('2');
  next();
});
app.all('/hello',function (req,res,next) {
  console.log('3');
  next();
});
app.use(function fun2(req,res) {
  console.log('4');

});
app.listen(8080);
