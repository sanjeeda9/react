var express=require('express');
var app=express.Router();
var movie=require('../models/movieSchema');
//Create
var obj={"Title":"Ice Age","Year":"2002","Rated":"PG","Released":"15 Mar 2002","Runtime":"81 min","Genre":"Animation, Adventure, Comedy","Director":"Chris Wedge, Carlos Saldanha","Writer":"Michael J. Wilson (story), Michael Berg (screenplay), Michael J. Wilson (screenplay), Peter Ackerman (screenplay), James Bresnahan (additional story), Doug Compton (additional story), Mike Thurmeier (additional story), Jeff Siergey (additional story), Galen T. Chu (additional story), Xeth Feinberg (additional story)","Actors":"Ray Romano, John Leguizamo, Denis Leary, Goran Visnjic","Plot":"Set during the Ice Age, a sabertooth tiger, a sloth, and a wooly mammoth find a lost human infant, and they try to return him to his tribe.","Language":"English, Croatian","Country":"USA","Awards":"Nominated for 1 Oscar. Another 5 wins & 28 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjEyNzI1ODA0MF5BMl5BanBnXkFtZTYwODIxODY3._V1_SX300.jpg","Metascore":"60","imdbRating":"7.6","imdbVotes":"322,565","imdbID":"tt0268380","Type":"movie","Response":"True"};
app.post('/create',function (req,res) {
  console.log("enter");
  var id=obj;
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
//Read
app.get('/read/:id',function (req,res) {
  var id=req.params.id;
  console.log(id);
  movie.findById(id,function (err,data) {
      if(err) throw err;
      else{
        res.json(data);
      }
  });
});
//delete
app.delete('/delete/?id',function (req,res) {
  var id=req.params.id;
  movie.findOneAndRemove({_id:id},function (err) {
    if(err) throw err;
      console.log("deleted");
      res.send("deleted");
  });
});
//update
app.put('/update/:id',function (req,res) {
  var id=req.params.id;
  var obj1={'Title':'Ice Age 2'};
  movie.findByIdAndUpdate(id,obj1,function (err,data) {
    if(err) throw err;
    res.send("modified");
  })
})
module.exports=app;
