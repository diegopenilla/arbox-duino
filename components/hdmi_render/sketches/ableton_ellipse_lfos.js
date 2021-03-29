function setup() {
	createCanvas(window.innerWidth, window.innerHeight)
}


function draw(){
	const x = map(channel1, 0, 127, 200, width-200)
	const y = map(channel2, 0, 127, 200, height-200)
	const r = map(channel1, 0, 127, 0, 255)
	const g = map(channel2, 0, 127, 0, 255)
	const b = map(channel2 + channel1, 0, 127*2, 0, 255)
	noStroke()
	fill(r,g,b)
	ellipse(x, y, 50,50)
}