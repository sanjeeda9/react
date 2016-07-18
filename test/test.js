var should=require("chai").should();
var supertest=require('supertest');
var app=require('../bin/www');
var server=supertest('http://localhost:8080/mochaChaiTesting');
describe('Sample unit test',function () {
  //should return home page
  it("should return home page",function (done) {
    //calling home page api
    server
    .get('/read/5779f8329e1b852907974790')
  //  .expect('content-type',/json/)
    .expect(200)
    .end(function (err,res) {
      if(err)
      throw err;
      var s=JSON.parse(res.text);
      s.Title.should.be.equal("Titanic");
      //res.status.should.equal(200);
      //res.body.error.should.equal(false);
      done();
    });
  });
});
describe('Unit test for post',function () {
  it("should return success message",function (done) {
    server
    .post('/create')
    .expect(200)
    .end(function (err,res) {
      if(err)throw err;
      res.text.should.be.equal("success");
      done();
    });
  });
});
describe('unit test for put',function () {
  it("should return modified",function (done) {
    server
    .put('/update/5783380422ad3fbe04cd3bf5')
    .expect(200)
    .end(function (err,res) {
      if(err)throw err;
      res.text.should.be.equal("modified");
      done();
    });
  });
});
describe('unit test for delete',function () {
  it("should return deleted",function (done) {
  server
  .delete('/delete/5783380422ad3fbe04cd3bf5')
  .expect(200)
  .end(function (err,res) {
    if(err)throw err;
    res.text.should.be.equal('deleted');
    done();
  })
  })
})
