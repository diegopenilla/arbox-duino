let websocketServer = require('./../websocket_server/ws_server')

const midi = require('midi');

// Set up a new input.
const input = new midi.Input();

// Count the available input ports.
console.log(input.getPortCount());
for(let i = 0; i < input.getPortCount() ; i++){
    console.log(i , ":", input.getPortName(i));
}

// Get the name of a specified input port.


// Configure a callback.
input.on('message', (deltaTime, message) => {
  // The message is an array of numbers corresponding to the MIDI bytes:
  //   [status, data1, data2]
  // https://www.cs.cf.ac.uk/Dave/Multimedia/node158.html has some helpful.
  //console.log(`m: ${message} d: ${deltaTime}`);
  console.log(message[1])
  // TODO implement what to send in websocketServer.readData()
});

input.openPort(3);
input.ignoreTypes(true, true, true);
