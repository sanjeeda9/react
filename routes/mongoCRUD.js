var express=require('express');
var app=express.Router();
var movie=require('../models/movieSchema');
var bodyParser=require('body-parser');
//Create
app.use(bodyParser.urlencoded());
app.post('/create',function (req,res) {
  console.log("enter");
  var id=req.body;
  console.log(id);
    var m1=new movie(id);
  m1.save(function (err,data) {
    if(err) throw err;
    else{
      console.log(data.title);
      console.log("inserted");}
    res.send("success");
  });
});
//find all
app.get('/list',function(req,res){
  movie.find({},function(err,data){
    if(err) throw err;
    else{
      res.json(data);
    }
  });
});
//Read
app.get('/read/:id',function (req,res) {
  var id=req.params.id;
  console.log(id);
  movie.find({Title:id},function (err,data) {
      if(err) throw err;
      else{
        res.json(data);
      }
  });
});
//delete
app.delete('/delete/:id',function (req,res) {
  console.log("inside delete");
  var id=req.params.id;
  //id=req.body;
  movie.findOneAndRemove({_id:id},function (err) {
    if(err) throw err;
      console.log("deleted");
      res.send("deleted")
  });
});
//update
app.put('/update/:id',function (req,res) {
  var id=req.params.id;
  movie.findByIdAndUpdate(id,req.body,function (err,data) {
    if(err) throw err;
    res.json(req.body);
  })
})
module.exports=app;
