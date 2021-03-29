let websocketServer = require('./../websocket_server/ws_server')
var Max4Node = require('max4node');
var max = new Max4Node();
max.bind();

const vals = []
const path = 'live_set tracks 0 devices 1 parameters 1';
const path2 = 'live_set tracks 0 devices 1 parameters 2';

max.get({
    path,
    property: 'name'
  }).once('value', (res) => console.log("name : ", res))

max.observe({
    path: path,
    property: 'value'
  })
  .on('value', (val)=> {
    vals[0] = val;
    websocketServer.readData(`${vals.join(',')}`)
});

max.observe({
    path: path2,
    property: 'value'
  })
  .on('value', (val)=> {
    vals[1] = val;
    websocketServer.readData(`${vals.join(',')}`)
});

