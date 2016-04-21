
var data = require('./data');

//Function to createNew User
//Accepts  id, name
var createNewUser = function(id, name){
  data.push({id:id, name:name, totalscore:0});
};

//Function to check user id existence
//Accepts array, id
//Returns index
var checkIdExistence = function(id){
  var index = -1;
  for(var i=0;i<data.length;i++){
   if(data[i].id == id || (typeof data[i].id === "string" &&  data[i].id.equals(id))){
 	 index =  i;
     break;
   }
  }
  return index;
};
//Function to delete user id
//Accepts array, id
//Returns true or false
var deleteUserById = function(id){
  var index = checkIdExistence(id);
  if(index !== -1 && (typeof data.splice(index,1) == "object"))
    return true;
  else
    return false;
};

//Function to delete user id
//Accepts array, id, playThrows/singleThrow/undefined
//Returns true or false
var getPlayScore = function(id,playThrows){
  var index = checkIdExistence(id);
  if(playThrows){
    // For singleThrow for /RealTimePlay
    if(playThrows.length == 1){
      data[index].playThrows = data[index].playThrows || "";
      playThrows = data[index].playThrows = data[index].playThrows.concat(playThrows);
    }
    else{
      if(playThrows === data[index].playThrows) return {totalscore: data[index].totalscore, name: data[index].name};
      data[index].playThrows = playThrows;
    }
  }
  else playThrows = data[index].playThrows || "";
  var allThrows = playThrows.split(''); // Splitting String into characters
  var strikePositions = []; // Strike positions
  var totalscore = 0;
  var i=0;
  var isPreviousThrowSpare = false;
  var frame = 0;
  var frameCounter = 0;
  while(i<allThrows.length){
    if(isPreviousThrowSpare && i!== allThrows.length-1){ // Previous throw is a spare
      totalscore+=parseInt(allThrows[i] === 'X'? "10":allThrows[i]);
      isPreviousThrowSpare = false;
    }
    if(allThrows[i] === '/'){ // It is a spare
      totalscore+=(10-parseInt(allThrows[i-1]));
      allThrows[i] = 10-parseInt(allThrows[i-1]);
      isPreviousThrowSpare = true;
    }
    else{
      var score = 0;
      if(allThrows[i] === 'X'){ // It is a strike
    	score = 10;
    	allThrows[i] = "10";
    	frameCounter+=1;
    	if(frame < 9 && (i+2) < allThrows.length) strikePositions.push(i); // Check for total number of frames is it the last frame.
      }else{
        score = parseInt(allThrows[i]);
      }
      totalscore+=score;
    }
    i+=1;
    frameCounter+=1;
    if(frameCounter%2==0){ // Increment the frame
      frame+=1;
    }
  }
  // Calculating score for strike positions
  for(var j=0;j<strikePositions.length;j++){
    totalscore+=parseInt(allThrows[strikePositions[j]+1] || "0") + parseInt(allThrows[strikePositions[j]+2] || "0")
  }
  data[index].totalscore = totalscore;
  return {totalscore: totalscore, name: data[index].name};
};

// Module exports
module.exports = {
  checkIdExistence: checkIdExistence,
  createNewUser: createNewUser,
  deleteUserById: deleteUserById,
  getPlayScore: getPlayScore
};