/**
* Module dependencies.
*/
var router = require('express').Router();
var data =  require('../common/data');
var util = require('../common/util');

// Route for Adding new user
router.route('/AddUser').post(function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  if(id === null || id === undefined){
    // id is null, return error
    res.json({userid: id, status: "failure", message: "Id should not be empty"});
  }
  else if(name === null || name ===  undefined){
    // name is null, return error
	res.json({userid: id, status: "failure", message: "Name should not be empty"});
  }
  else{
    // Checking user existence
    if(util.checkIdExistence(id) === -1){
      // User doesn't exist, making an entry
      util.createNewUser(id,name);
      res.json({userid: id, status: "success", message: "User added successfully"});
    }
    else{
      // User already exists, sending error
      res.json({userid: id, status: "failure", message: "userid already exists."});
    }	
  }
});

// Route for DeleteUser
router.route('/DeleteUser').delete(function(req,res){
  var id = req.body.id;
  if(id === null || id === undefined){
	// id is null, return error
    res.json({status: "failure", message: "Id should not be empty"});
  }
  else{
    if(util.deleteUserById(id)){
      res.json({status: "success", message: "User deleted successfully."});
    }
    else{
      res.json({status: "failure", message: "User doesn't exist."});
    }
  }
}); // End of Route for DeleteUser

// Route for Play
router.route('/Play').post(function(req,res){
  var userid =  req.body.userid;
  var playThrows =  req.body.playThrows;
  if(userid === null || userid === undefined){
    // userid is null, return error
	res.json({status: "failure", message: "Userid should not be empty"});
  }
  else if(util.checkIdExistence(userid) === -1){
    // user doesn't exist
    res.json({status: "failure", message: "userid doesn't exist, try /AddUser to create User"});
  }
  else if(playThrows === null || playThrows === undefined){
    // playThrows is null, return error
    res.json({status: "failure", message: "playThrows should not be empty"});
  }
  else if(playThrows.length < 12 || playThrows.length > 21){
    res.json({status: "failure", message: "invalid playThrows, it should be in between 12 and 21 characters"});
  }
  else{
    var result = util.getPlayScore(userid,playThrows);
    res.json({score: result.totalscore});
  }
}); // End of Route for Play

// Route for RealTimePlay
router.route('/RealTimePlay').post(function(req,res){
  var userid = req.body.userid;
  var singleThrow = req.body.singleThrow;
  if(userid === null || userid === undefined){
    // userid is null, return error
    res.json({status: "failure", message: "Userid should not be empty"});
  }
  else if(util.checkIdExistence(userid) === -1){
    // user does'nt exist
    res.json({status: "failure", message: "userid doesn't exist, try /AddUser to create User"});
  }
  else if(singleThrow === null || singleThrow === undefined){
    // playThrows is null, return error
    res.json({status: "failure", message: "singleThrow should not be empty"});
  }
  else if(singleThrow.length !== 1){
    res.json({status: "failure", message: "invalid singleThrow, it should be in 1 character"});
  }
  else{
    var result = util.getPlayScore(userid,singleThrow);
    res.json({score: result.totalscore});
  }
}); // End of Route for RealTimePlay

// Route for Score
router.route('/Score').get(function(req,res){
  var userid =  req.query.userid;
  if(userid === null || userid === undefined){
	// userid is null, return error
    res.json({status: "failure", message: "Userid should not be empty"});
  }
  else if(util.checkIdExistence(parseInt(userid)) === -1){
    // user does'nt exist
    res.json({status: "failure", message: "userid doesn't exist, try /AddUser to create User"});
  }
  else{
    var result = util.getPlayScore(userid);
    res.json({totalscore: result.totalscore,username: result.name});
  }
});

// Exporting router
module.exports = router;