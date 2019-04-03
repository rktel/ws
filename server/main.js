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
    let volvoRes = Volvo.findOne()
    console.log(req);
    res.end(JSON.stringify(volvoRes));
});
