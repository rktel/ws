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

import { Credentials, Volvo, Savar } from '../imports/api/collections'
// aladdin:opensesame  ==>  YWxhZGRpbjpvcGVuc2VzYW1l
//  400	Bad Request
// 401	Unauthorized
// Listen to incoming HTTP requests (can only be used on the server).

// 1 dia = 86400 segundos

const MAX_DAYS_IN_SECONDS = 1 * 86400

WebApp.connectHandlers.use('/api/1.0', (req, res, next) => {

  const { username, password } = getCredentials(req)

  // ##################### IF "VOLVO"      #####################

  if (username == 'volvo' && password == 'vlv_scrts_04_2019') {

    res.writeHead(200);
    // VERIFICA SI HAY PARAMETROS EN EL QUERY
    const queries = Object.keys(req.query).length > 0 ? req.query : false
    if (queries) {
      // Se procesa query hacia Collection Volvo
      // console.log(queries); // Log hacia el servidor
      // Respuesta hacia el cliente Web
      /************************* 3 PARAMETROS EN EL QUERY ***********************************/
      if (Object.keys(queries).length == 3 && queries.hasOwnProperty('vehicle') && queries.hasOwnProperty('start') && queries.hasOwnProperty('end')) {
        // console.log('3', queries);
        // res.end(JSON.stringify(queries))

        const vehicle = Array.isArray(queries.vehicle) ? false : queries.vehicle
        const start = Array.isArray(queries.start) ? false : queries.start
        const end = Array.isArray(queries.end) ? false : queries.end

        // ==>


        if (vehicle && vehicle.length >= 4 && start && start.length == 19 && end && end.length == 19 && verifyDays(start, end)) {

          Meteor.call('Volvo_getRangePlate', vehicle, start, end, function (error, range) {
            if (!error) {
              console.log('range', range);
              res.end(JSON.stringify(range))
            }
          });

        }



      }
      /************************* 1 PARAMETROS EN EL QUERY ***********************************/
      else if (Object.keys(queries).length == 1 && queries.hasOwnProperty('vehicle')) {

        //console.log('1', queries);
        //res.end(JSON.stringify(queries))

        // Verificamos que solo exista un vehicle en el query.
        const vehicle = Array.isArray(queries.vehicle) ? false : queries.vehicle
        // console.log('vehicle:', vehicle);

        /************************* Vehicle == all ----------------*/
        if (vehicle && vehicle.toLowerCase() == 'all') {
          console.log('Return all plates');
          Meteor.call('Volvo_getPlates', function (error, plates) {
            if (!error) {
              plates = { vehicles: plates }
              console.log(plates);
              res.end(JSON.stringify(plates))
            }

          });

        }
        /************************* Vehicle == STRING -------------*/
        else if (vehicle && vehicle.length >= 4) {
          console.log('Return Last Event of plate');
          Meteor.call('Volvo_getOnePlate', vehicle, function (error, plate) {
            if (!error) {
              plate = plate.length == 1 ? plate[0] : {}
              console.log('0', plate);
              res.end(JSON.stringify(plate))
            }
          });
        } else {
          res.writeHead(401);
          res.end(`Unauthorized`)
        }


      } else {
        res.writeHead(401);
        res.end(`Unauthorized`)
      }


    } else {
      res.writeHead(401);
      res.end(`Unauthorized`)
    }

  } // ***************** FIN DEL IF   "VOLVO" 

  else {
    res.writeHead(401);
    res.end(`Unauthorized`)
  }
});





// helper functions
const verifyDays = (start, end) => {
  console.log('verifyDays:');
  
  const addZ = str => str + '.000Z'
  const str2millis = str => (new Date(str)).getTime()
  start = addZ(start)
  end = addZ(end)

  console.log('start & end:', start, end);
  
  const restTime = (Number.isInteger(str2millis(end)) && Number.isInteger(str2millis(start))) ? (str2millis(end) - str2millis(start)) : false

  console.log('restTime:',restTime);
  
  if (restTime && restTime > MAX_DAYS_IN_SECONDS * 1000) {
    return false
   }else{
    return true
   }
}
const atob = str => Buffer.from(str, 'base64').toString('binary');

const getCredentials = str => {
  if (str && str.headers.authorization && str.headers.authorization.split(' ')[0] == 'Basic' && str.headers.authorization.split(' ')[1]) {
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