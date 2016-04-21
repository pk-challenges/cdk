/**
* Module dependencies.
*/
var app = require('../app').app;
var api = require('supertest')(app);
var expect = require('chai').expect;
var basePath = '/bowling';

describe('bowling-scoring-test', function(){
  
  before('wait for application to be started.', function(done) {
    /*app.start();
    app.once('started', function(){
      // Application started, calling done
      done();
    });*/
	  done();
  });
  
  describe('AddUser', function(){
    var addUserUrl = basePath + '/AddUser';
    
    // Test case for AddUser when id is passed empty
    it('AddUser - id - empty', function(done){
      var postData = {}; // Posting empty data
      
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Id should not be empty');
          
          done();
        }
        
      });
    });
    
    // Test case for AddUser when name is passed empty
    it('AddUser - name - empty', function(done){
      var postData = {id:1}; // Posting empty name
        
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Name should not be empty');
          
          done();
        }
        
      });
      
    });
    
    // Test case for AddUser - New user - valid data
    it('AddUser - New User', function(done){
      var id = 1;
      var postData = {id:id, name: 'Tom'}; // Posting new user data
        
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.userid).to.be.equal(id);
          expect(resp.body.status).to.be.equal('success');
          expect(resp.body.message).to.be.equal('User added successfully');
          
          done();
        }
        
      });
      
    });
    
    // Test case for AddUser when name is passed empty
    it('AddUser - Already existing user', function(done){
      var id = 1;
      var postData = {id:id, name: 'Tom'}; // Posting new user data
        
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('userid already exists.');
          
          done();
        }
        
      });
      
    });
    
  }); // End of AddUser Describe
  
  describe('DeleteUser', function(){
    var deleteUserUrl = basePath + '/DeleteUser';
    
    //Test case for Delete when id is passed empty
    it('DeleteUser - id - empty', function(done){
      var postData = {}; // Posting empty data
      
      api.del(deleteUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Id should not be empty');
         
          done();
        }
        
      });
      
    });
    
    // Test case for DeleteUser when id is non existent
    it('DeleteUser - id - non existent', function(done){
      var postData = {id:5}; // Non existent Id
      
      api.del(deleteUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('User doesn\'t exist.');
          
          done();
        }
        
      });
      
    });
    
    // Test case for DeleteUser when a valid id is passed
    it('DeleteUser - Valid Id', function(done){
      var postData = {id:1}; // Posting valid user id data
      
      api.del(deleteUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('success');
          expect(resp.body.message).to.be.equal('User deleted successfully.');
          
          done();	
        }
        
      });
      
    });
    
  }); // End of DeleteUser describe
  
  describe('Play', function(){
    before('AddUser', function(done){
      var addUserUrl = basePath + '/AddUser';
      var postData = {id:1, name: 'Tom'}; // Posting new user data
      
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        done();
      });
    });
    var playUrl = basePath + '/Play';
    
    // Test case for Play when userid is passed empty
    it('Play - userid - empty', function(done){
      var postData = {}; // Posting empty data
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Userid should not be empty');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for Play when userid is invalid
    it('Play - userid - invalid', function(done){
      var postData = {userid:2}; // Posting invalid userid data
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('userid doesn\'t exist, try /AddUser to create User');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for Play when playThrows is passed empty
    it('Play - playThrows - empty', function(done){
      var postData = {userid:1}; // Posting empty playThrows data
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('playThrows should not be empty');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for Play when playThrows is passed empty
    it('Play - playThrows - invalid length', function(done){
      var postData = {userid:1, playThrows: "X40"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('invalid playThrows, it should be in between 12 and 21 characters');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - XXXXXXXXXXXX 300', function(done){
      var postData = {userid:1, playThrows: "XXXXXXXXXXXX"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(300);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - 90909090909090909090 90', function(done){
      var postData = {userid:1, playThrows: "90909090909090909090"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(90);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - 5/5/5/5/5/5/5/5/5/5/5 150', function(done){
      var postData = {userid:1, playThrows: "5/5/5/5/5/5/5/5/5/5/5"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(150);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - X7/729/XXX236/7/3 168', function(done){
      var postData = {userid:1, playThrows: "X7/729/XXX236/7/3"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(168);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - 00000000000000000000 0', function(done){
      var postData = {userid:1, playThrows: "00000000000000000000"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(0);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - 01273/X5/7/345400X70 113', function(done){
      var postData = {userid:1, playThrows: "01273/X5/7/345400X70"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(113);
          done();
        }
	        
      });
      
    });
    
    // Test case for Play with Test data
    it('Play - Test Data - X7/90X088/06XXX81 167', function(done){
      var postData = {userid:1, playThrows: "X7/90X088/06XXX81"}; // Posting playThrows with invalid length
      
      api.post(playUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(167);
          done();
        }
	        
      });
      
    });
    
  }); // End of Play describe
  
  
  describe('RealTimePlay', function(){
    before('AddUser', function(done){
      var addUserUrl = basePath + '/AddUser';
      var postData = {id:2, name: 'Jerry'}; // Posting new user data
      
      api.post(addUserUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        done();
      });
    });
    
    var realTimePlayUrl = basePath + '/RealTimePlay';
    
    // Test case for RealTimePlay when userid is passed empty
    it('RealTimePlay - userid - empty', function(done){
      var postData = {}; // Posting empty data
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Userid should not be empty');
          
          done();
        }
		        
      });
      
    });
    
    // Test case for RealTimePlay when userid is invalid
    it('RealTimePlay - userid - invalid', function(done){
      var postData = {userid:5}; // Posting invalid userid data
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('userid doesn\'t exist, try /AddUser to create User');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay when singleThrow is passed empty
    it('RealTimePlay - singleThrow - empty', function(done){
      var postData = {userid:1}; // Posting empty singleThrow data
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('singleThrow should not be empty');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay when singleThrow is passed empty
    it('RealTimePlay - singleThrow - invalid length', function(done){
      var postData = {userid:1, singleThrow: "X40"}; // Posting singleThrow with invalid length
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('invalid singleThrow, it should be in 1 character');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay with valid data
    it('RealTimePlay - Test case - throw X', function(done){
      var postData = {userid:2, singleThrow: "X"}; // Posting playThrows with invalid length
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(10);
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay with valid data
    it('RealTimePlay - Test case - throw 7', function(done){
      var postData = {userid:2, singleThrow: "7"}; // Posting playThrows with invalid length
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(17);
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay with valid data
    it('RealTimePlay - Test case - throw /', function(done){
      var postData = {userid:2, singleThrow: "/"}; // Posting playThrows with invalid length
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(30);
          done();
        }
	        
      });
      
    });
    
    // Test case for RealTimePlay with valid data
    it('RealTimePlay - Test case - throw 7', function(done){
      var postData = {userid:2, singleThrow: "7"}; // Posting playThrows with invalid length
      
      api.post(realTimePlayUrl).
      send(postData).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.score).not.to.be.null;
          expect(resp.body.score).not.to.be.undefined;
          expect(resp.body.score).to.be.equal(37);
          done();
        }
	        
      });
      
    });
    
  }); // End of RealTimePlay describe
  
  describe('Score', function(){
    var scoreUrl = basePath + '/Score';
    
    // Test case for RealTimePlay when userid is passed empty
    it('Score - userid - empty', function(done){
      
      api.get(scoreUrl).
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('Userid should not be empty');
          
          done();
        }
		        
      });
      
    });
    
    // Test case for Score when userid is invalid
    it('Score - userid - invalid', function(done){
      
      api.get(scoreUrl+"?userid=5").
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.status).to.be.equal('failure');
          expect(resp.body.message).to.be.equal('userid doesn\'t exist, try /AddUser to create User');
          
          done();
        }
	        
      });
      
    });
    
    // Test case for Score when userid is invalid
    it('Score - valid data', function(done){
      
      api.get(scoreUrl+"?userid=1").
      expect(200).end(function(err, resp) {
        if(err)
          done(err);
        else{
          expect(resp.body.totalscore).not.to.be.null;
          expect(resp.body.totalscore).not.to.be.undefined;
          expect(resp.body.totalscore).to.be.equal(167);
          expect(resp.body.username).to.be.equal('Tom');
          
          done();
        }
	        
      });
      
    });
  }); // End of Score describe
  
}); // End of Main describe