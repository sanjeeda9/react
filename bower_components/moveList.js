var movList=[];
var Head=React.createClass({
  getInitialState:function () {
  console.log("init");
  return ({name:'',db:"Local DB"});
  },
  setName:function (e) {
    var n=e.target.value;
    this.setState({name:n});
    //console.log(n);
  },
render:function () {
    return (

      <div id="h" >
      <h1 id="title">Search a movie that you like</h1>
        <div className="row form-group" id="search">
        <div className="col-sm-2">
          <button className="btn btn-primary dropdown-toggle" type="button" id="menu1" data-toggle="dropdown" value={this.state.db}>
          {this.state.db} <span className="caret"></span></button>
          <ul className="dropdown-menu" role="menu">
          <li className="dropdown-header"><strong>Select Search From</strong></li>
          <li className="divider"></li>
          <li><a href="#" onClick={this.setDB}>Local DB</a></li>
          <li ><a href="#" onClick={this.setDB}>OMDB</a></li>
          </ul>
      </div>
          <div className="col-sm-3">
          <input
          id="movieName"
          className="form-control"
          type="text"
          placeholder="Type a movie name"
          onChange={this.setName}
          value={this.state.name}
          />
        </div>
        <div className="col-sm-1">
          <button
          className="btn btn-success"
          onClick={this.searchMov}>
          Search <span className="glyphicon glyphicon-search"></span>
          </button>
        </div>

      </div>
    </div>
  );
  },
  searchMov:function () {
    movList=[];
    var name=this.state.name;
    var db=this.state.db;
    console.log(db);
    var url="";
    if(db=="Local DB"){
      console.log("if");
      url = "mongoCRUD/list";
      if(name!=null&&name.trim()!=""){
        url="mongoCRUD/read/"+name;
      }
    }
    else{
      url="http://www.omdbapi.com/?s="+this.state.name
    }
    console. log(url);
    this.setState({name:""});
    $.ajax({
      url:url,
      dataType:'json',
      cache:false,
      async: false,
      success:function (data) {
        if(db=="OMDB"){
          data=data.Search;
        }
        data.map(function (d) {
         console.log(d);
          movList.push(d);
        })
        //  this.setState({name:''});
          //console.log(movList);
      }.bind(this),
      error:function (x,status,err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
        });
    console.log("end");
    ReactDOM.render(<Load db={this.state.db}/>,document.getElementById("displayMov"));
    },
    setDB:function (e) {
      console.log(e.target.text);
      this.setState({db:e.target.text})
    }
  });
var Load=React.createClass({
  getInitialState:function () {
    return ({data:"",arr:"",success:"",rate:""});
  },
  setRate:function (e) {
    this.setState({rate:e.target.value});
  },
  update:function (d,r) {
    console.log(this.state.arr+" \n"+this.state.data);
    this.setState({rate:""});
    console.log(d+" "+r);
    d["Rated"]=r;
    var url="mongoCRUD/update/"+d["_id"];
    $.ajax({
      url:url,
      type:"PUT",
      data:d,
      dataType:'json',
      cache:false,
      async: false,
      success:function (data) {
        console.log(data);
        this.setState({arr:data});
      }.bind(this),
      error:function (x,status,err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
        });
  },
  handleAdd:function (d) {
    var self=this;
    console.log("handleAdd "+d["Title"]);
   this.setState({data:d});
   this.setState({success:""});
   var id=d["imdbID"];
   var url="http://www.omdbapi.com/?t="+d["Title"];
   $.ajax({
     url:url,
     dataType:'json',
     cache:false,
     async: false,
     success:function (data) {
       console.log(data);
       this.setState({arr:data});
     }.bind(this),
     error:function (x,status,err) {
       console.error(this.props.url,status,err.toString());
     }.bind(this)
       });

  },
  insert:function (d) {
    var url="mongoCRUD/create"
    console.log(url);
    console.log("inside insert"+d);
    this.setState({success:""});
$.ajax({
 url:url,
 dataType:'json',
 type:'POST',
 data:d   ,
 cache:false,
 async: false,
 success:function (data) {
   //console.log("inside post"+d);
   this.setState({success:"success"});
 }.bind(this),
 error:function (x,status,err) {
   this.setState({success:"success"});
   console.error(this.props.url,status,err.toString());
 }.bind(this)
   });

 },
 handleView:function (d) {
   this.setState({arr:d});
 },
    handleDelete:function (d) {
      var index=movList.indexOf(d);
      console.log("inside handleDelete "+d["_id"]+" "+index);
      var url="mongoCRUD/delete/"+d["_id"];
        this.setState({success:""});
      $.ajax({
        type:'DELETE',
        data:d["_id"],
       url:url,
       cache:false,
       async: false,
       success:function (data) {
         //console.log("inside post"+d);
        // this.setState({success:"success"});
       }.bind(this),
       error:function (x,status,err) {
         this.setState({success:"successfully deleted"});
         console.error(this.props.url,status,err.toString());
       }.bind(this)
         });
         movList.splice(index, 1);
         //ReactDOM.render(<Head />,document.getElementById("heading"));
         },
    displayDB:function functionName() {
      var self=this;
        var db=this.props.db;
          console.log(db);
          if(db=="OMDB"){
            var count=0;
          return(
            <div>{
        movList.map(function(d){
         //console.log(d);
         return(
           <div className="well row" key={count++}>
            <div className='col-sm-4'><img id="imgs" src={d.Poster} />
            </div>
            <div className="col-sm-8">
              <h2> {d.Title}</h2><h3>Year: {d.Year}</h3>
              <button onClick={(event)=>{self.handleAdd(d)}} className="btn btn-info" data-toggle='modal' data-target="#myModalAdd">Add to DB</button>
            </div>

            <div className="modal fade" id="myModalAdd"  role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog " role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h1 className="modal-title" id="myModalLabel">{self.state.data.Title}</h1>
          </div>
          <div className="modal-body">
          <div className="row">
            <div className="col-md-4">
              <img id="imgs" src={self.state.data.Poster} />
            </div>
            <div className="col-md-8">
                <h4>Year: {self.state.arr.Year}</h4>
                <p>Actors: {self.state.arr.Actors}</p>
                <p>Director: {self.state.arr.Director}</p>
                <p>Plot: {self.state.arr.Plot}</p>
                <p>Released: {self.state.arr.Released}</p>
                <p>Awards: {self.state.arr.Awards}</p>
                <p>Rated: {self.state.arr.Rated}</p>
                <p>Genre: {self.state.arr.Genre}</p>
                <button onClick={(event)=>{self.insert(self.state.arr)}} className="btn btn-success btn-lg">Add</button>
                <p id="success">{self.state.success}</p>
            </div>
          </div>

          </div>
          <div className="modal-footer">
              <button className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        </div>
      </div>
    </div>
    </div>
            );
        })
        }

        </div>
        );
          }
        else{
          var count=0;
        return(<div>{
      movList.map(function(d){
       console.log("inside else "+d);
       return(<div className="well row" key={count++}>
        <div className='col-sm-4'><img id="imgs" src={d.Poster} /></div>
       <div className="col-sm-8"><h2> {d.Title}</h2><h3>Year: {d.Year}</h3>
       <button onClick={(event)=>{self.handleView(d)}} className="btn btn-success gap" data-toggle='modal'
       data-target="#myModalAdd1">
       View
       </button><br />
       <div className="modal fade" id="myModalAdd1"  role="dialog" aria-labelledby="myModalLabel">
 <div className="modal-dialog " role="document">
   <div className="modal-content">
     <div className="modal-header">
       <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       <h1 className="modal-title" id="myModalLabel">{self.state.arr.Title}</h1>
     </div>
     <div className="modal-body">
     <div className="row">
       <div className="col-md-4">
         <img id="imgs" src={self.state.arr.Poster} />
       </div>
       <div className="col-md-8">
           <h4>Year: {self.state.arr.Year}</h4>
           <p>Actors: {self.state.arr.Actors}</p>
           <p>Director: {self.state.arr.Director}</p>
           <p>Plot: {self.state.arr.Plot}</p>
           <p>Released: {self.state.arr.Released}</p>
           <p>Awards: {self.state.arr.Awards}</p>
           <p>Rated: {self.state.arr.Rated}</p>
           <p>Genre: {self.state.arr.Genre}</p>
           <p>Language: {self.state.arr.Language}</p>
           <p>Writer: {self.state.arr.Writer}</p>
           </div>
     </div>
     </div>
     <div className="modal-footer">
         <button className="btn btn-danger" data-dismiss="modal">Close</button>
   </div>
   </div>
 </div>
 </div>
 <button onClick={(event)=>{self.handleView(d)}} className="btn btn-warning gap" data-toggle='modal'
 data-target="#myModalAdd2">
 Update
 </button><br />
       <div className="modal fade" id="myModalAdd2"  role="dialog" aria-labelledby="myModalLabel">
 <div className="modal-dialog " role="document">
   <div className="modal-content">
     <div className="modal-header">
       <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       <h1 className="modal-title" id="myModalLabel">{self.state.arr.Title}</h1>
     </div>
     <div className="modal-body">
     <div className="row">
       <div className="col-md-4">
         <img id="imgs" src={self.state.arr.Poster} />
       </div>
       <div className="col-md-8">
           <h4>Year: {self.state.arr.Year}</h4>
           <p>Actors: {self.state.arr.Actors}</p>
           <p>Director: {self.state.arr.Director}</p>
           <p>Plot: {self.state.arr.Plot}</p>
           <p>Released: {self.state.arr.Released}</p>
           <p>Awards: {self.state.arr.Awards}</p>
           <p>Rated: {self.state.arr.Rated}</p>
           <p>Genre: {self.state.arr.Genre}</p>
           <h4>Rate this Movie</h4>
           <div className="rating">
           <input
           id="rating"
           className="form-control"
           type="text"
           placeholder="Type Your Rating here"
           onChange={self.setRate}
           value={self.state.rate}
           />
           </div>
           <button onClick={(event)=>{self.update(self.state.arr,self.state.rate)}} className="btn btn-success btn-lg">Update</button>
           <p id="success">{self.state.success}</p>
       </div>
     </div>

     </div>
     <div className="modal-footer">
         <button className="btn btn-danger" data-dismiss="modal">Close</button>
   </div>
   </div>
 </div>
 </div>
 <button className="btn btn-danger gap" onClick={(event)=>{self.handleDelete(d)}}>
 Delete
 </button><br />
       </div>
       </div>)
      })
      }</div>
      );
        }
        },

render :function(){
      console.log('load');
      return this.displayDB();

}


});
//var StarRating = require('react-star-rating');
ReactDOM.render(<Head />,document.getElementById("heading"));
