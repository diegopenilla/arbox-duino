// WebSocket for HTML ! 
// Data received is going to be stored in global variables of the total sketch
const IP = 'localhost' //'192.168.178.128'
const ws = new WebSocket(`ws://${IP}:8000`);
let channel1 = 0; //{x: 0, y:0 }
let channel2 = 0;

ws.onopen = function open() {
    console.log("Port Open")
  //ws.send('something');
}

ws.onmessage = function incoming(data) {
  // console.log("Message arrived", data)
  // var income_data = data.data.split(',')
  // channel1 = Number(income_data[0])
  // channel2 = Number(income_data[1])

  var income_data = data.data.split(',')
  const x = Number(income_data[0].replace("X", ""))
  const y = Number(income_data[1].replace("Y", ""))
  console.log(x)
  channel1 = {x : x, 
              y: y }
}