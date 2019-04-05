/*

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4100, function () {
  console.log('Example app listening on port 4100!');
});
*/

import { Volvo } from '../imports/api/collections'

// Listen to incoming HTTP requests (can only be used on the server).
WebApp.connectHandlers.use('/volvo', (req, res, next) => {
  res.writeHead(200);
  console.log(getCredentials(req));


});

// helper functions

const atob = str => Buffer.from(str, 'base64').toString('binary');
const getCredentials = str => {
  if (str && str.headers.authorization && str.headers.authorization.split(' ')[1]) {
    let credentials = atob(str.headers.authorization.split(' ')[1])
    let arrCredentials = credentials ? credentials.split(':') : [null, null]
    return {
      username: arrCredentials[0],
      password: arrCredentials[1]
    }
  } else {
    return {
      username: null,
      password: null
    }
  }
}