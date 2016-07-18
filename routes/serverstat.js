var express=require('express');
var router=express.Router();
router.get('/errorcount',function(req,res){
  res.send({errorCount:0});
});
router.get('/app1',function(req,res){
  res.send("hello world");
});
router.get('/',function(req,res){
  res.render('index',{
    title:"sanju"
  })
  //console.log(req.query);
});
router.get('/us/:id',function(req,res){
  console.log(req.params);
  //res.send(200);
  res.send(req.params);
})
module.exports=router;
