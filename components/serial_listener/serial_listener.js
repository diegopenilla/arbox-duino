
// Serial Reader in Node
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const portsPromise = SerialPort.list();

portsPromise.then((ports) => {
  const arduinoPort = ports.find((port) => port.manufacturer && port.serialNumber) // if this doesnt work add && port.path.includes('ACM') || port.path.includes('USB') || port.path.includes('usbmodem') 

  if(!arduinoPort) {
    throw Error("No Arduino found, aborting")
  }
  console.log(arduinoPort.path)
  const port = new SerialPort(arduinoPort.path, {
    baudRate: 9600,
  })
  const parser = new Readline()
  port.pipe(parser) // pipe the serial stream to parser


  function showPortOpen() {
    console.log('port open. Data rate: ' + port.baudRate);
  }

  // ReadSerialData broadcasts to clients in WebSocket!  

  function showPortClose() {
    console.log('port closed.');
  }

  function showError(error) {
    console.log('Serial port error: ' + error);
  }

  // callbacks
  port.on('open', showPortOpen);

  // when arduino sends data is called!
  parser.on('data', readSerialData);

  port.on('close', showPortClose);
  port.on('error', showError);

}).catch((e) => {
  console.error(e);
})



// TO communicate with the BROWSER!
// npm install ws
let WebSocketServer = require('ws').Server;

const SERVER_PORT = 8000; // port number for the webSocket server
let wss = new WebSocketServer({ port: SERVER_PORT }); // the webSocket server
let connections = new Array; // list of connections to the server, there can be multiple clients at one time...

wss.on('connection', handleConnection);

function handleConnection(client) {
  console.log("New Connection"); // you have a new client
  connections.push(client); // add this client to the connections array

  client.on('message', sendToSerial); // when a client sends a message,

  client.on('close', function () { // when a client closes its connection
    console.log("connection closed"); // print it out
    let position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1); // and delete it from the array
  });
}

// send websocket data to serial port
function sendToSerial(data) {
  console.log("sending to serial: " + data);
  port.write(data);
}

// broadcast message to all clients
function broadcast(data) {
  for (myConnection in connections) {   // iterate over the array of connections
    connections[myConnection].send(data); // send the data to each connection
  }
}

// read serial data!
function readSerialData(data) {
  console.log(data);
  // if there are webSocket connections, send the serial data to all of them:
  if (connections.length > 0) {
    broadcast(data);
  }
}