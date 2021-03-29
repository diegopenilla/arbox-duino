
// Serial Reader in Node
let SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const portsPromise = SerialPort.list();
let port;

let websocketServer = require('./../websocket_server/ws_server')

portsPromise.then((ports) => {
  
  let arduinoPort = ports.find((port) => port.manufacturer && port.serialNumber) // if this doesnt work add && port.path.includes('ACM') || port.path.includes('USB') || port.path.includes('usbmodem') 
  let isRealArduino = true;
  if(!arduinoPort) {
    console.log("No Arduino found, simulatiing")
    SerialPort = require('virtual-serialport');
    arduinoPort = {path: '/dev/serial-simulator'}
    isRealArduino = false;
  }

  port = new SerialPort(arduinoPort.path, {
    baudRate: 9600,
  })

  if(isRealArduino){
    const parser = new Readline()
    port.pipe(parser) // pipe the serial stream to parser
    // when arduino sends data is called!
    // ReadSerialData broadcasts to clients in WebSocket!  
    parser.on('data', websocketServer.readData);
  }

  // callbacks
  port.on('open', showPortOpen);
  port.on('close', showPortClose);
  port.on('error', showError);

  // this is only for virtual port
  if(!isRealArduino){
    port.on("dataToDevice", (data)=> {
      websocketServer.readData(data);
    });
  }
  
 
  function showPortOpen() {
    console.log('port open. Data rate: ' + port.baudRate);
    if(!isRealArduino){
      setInterval(() => {
        const x = Math.random() * 1000;
        const y = Math.random() * 1000;
        port.write(`X${x},Y${y}`); 
      }, 1000)
    }
  }  
  
  
  function showPortClose() {
    console.log('port closed.');
  }
  
  function showError(error) {
    console.log('Serial port error: ' + error);
  }

}).catch((e) => {
  console.error(e);
})
