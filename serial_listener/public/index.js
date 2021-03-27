// WebSocket that will listen on port 8081
let text;
let socket = new WebSocket("ws://localhost:8081")

function setup(){
    // socket connection
    socket.onopen = openSocket;
    socket.onmessage = showData;

    // create new div and position it
    text = createDiv("Sensor Reading");
    text.position(10,10);
}

function draw(){

}

function openSocket(){
    text.html("Socket Open");
    socket.send("Hello Server");
}

function showData(result){
    // parsing result JSON
    var input = result.data
    
    // console.log(input);e
    
    var numbers = split(input, ",");

    // show server return in div
    text.html("Sensor reading" + numbers);
    text.html("X")

    let xPos = int(numbers[2])
    let yPos = int(numbers[3])
    text.position(xPos, yPos);

}