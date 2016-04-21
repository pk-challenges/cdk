# Bowling Scoring Node

# Starting application

```
$ node .
```

or

```
$ node app.js
```

# Using as node-module

```javascript

// Requiring node module and getting util
var bowlingUtil = require('bowling-scoring-node').util;

// For creating New users
bowlingUtil.createNewUser(1, "Tom");
bowlingUtil.createNewUser(2, "Jerry");
bowlingUtil.createNewUser(3, "Mike");

// Deleting user by id
bowlingUtil.deleteUserById(2);

// Getting score for a play
var generateScoreForPlay = bowlingUtil.getPlayScore(1, "XXXXXXXXXXXX");

// Getting score for a real time play

var getRealTimePlay = bowlingUtil.getPlayScore(2, "X");
getRealTimePlay = bowlingUtil.getPlayScore(2, "5");

// Getting score of Existing user
var getScoreForUser = bowlingUtil.getPlayScore(1);

```

# API Documentation

### API - /bowling/AddUser POST

Description - This API adds a new user

Request Body

{ id: < user id >, name: < user name > }

Response

{ userid: < user id >, status: < success or failure >, message: < Error or Sucess Message > }


### API - /bowling/DeleteUser DELETE

Description - This API adds a new user

Request Body

{ id: < user id > }

Response

{ status: < success or failure >, message: < Error or Sucess Message > }

### API - /bowling/Play POST

Description - This API adds a new user

Request Body

{ userid: < user id >, playThrows : < All throws of a Game > }

Response

{ status: < failure >, message: < Error Message > }

or
{ score: < total score of the Play >}

### API - /bowling/RealTimePlay POST

Description - This API adds a new user

Request Body

{ userid: < user id >, singleThrow : < Single throw representing using a character  - X , / , 0-9> }

Response

{ status: < failure >, message: < Error Message > }

or
{ score: < total score of the Real Time Play >}

### API - /bowling/Score GET

Description - This API adds a new user

Request Query Parameters

userid = <user id>

Response

{ status: < failure >, message: < Error Message > }

or
{ totalscore: < total score of the User >, username: < name of the user > }


# Unit Testing

```
$ npm test
```

or if mocha installed globally "npm install -g mocha"

```
$ mocha
```