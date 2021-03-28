function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

let z = .5

function draw() {
  let d = noise(frameCount/1000)
  // background();
  fill(random()*channel1.x,random()*channel1.y,random()*255,random()*255)
  ellipse(random()*window.innerWidth,random()*window.innerWidth,random()*255,random()*255)
  ellipse(random()*window.innerWidth,random()*window.innerWidth,random()*255,random()*255)
  ellipse(random()*window.innerWidth,random()*window.innerWidth,random()*255,random()*255)
  z=d*1




}
