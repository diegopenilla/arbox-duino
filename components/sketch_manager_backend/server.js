const express = require('express')
const fs = require("fs")
const app = express()
const cors = require('cors')
// middleware => req.body always a string
app.use(express.text())
app.use(cors())
const port = 3000
// file list
app.get("/getSketches", (req, res)=> {
  const files = [];
  fs.readdirSync("./components/hdmi_render/sketches").forEach(file => {
    console.log(file)
    files.push(file) 
  });
  const sketches = {currentSketch: 'blabla.js', sketches: ['asdasd.js', 'blabla.js']}

  res.send(files.join(","))
})


app.get("/getCurrentSketch", (req, res)=> {
  const files = [];
  const buf = fs.readFileSync("./components/hdmi_render/public/currentSketch.js")
  console.log("sending", buf.toString())
  res.send(buf.toString());
})

// receives files from post and writes into hdmi_render/sketches
app.post('/sketchReceiver', (req, res) => {
    console.log("Received Text Input\n", req.body)
    
    // TODO: if first.js doestn exist 
    // for history
    fs.writeFileSync(
        "./components/hdmi_render/sketches/first.js", 
        req.body
    )

    // to change display
    fs.writeFileSync(
        "./components/hdmi_render/public/currentSketch.js", 
        req.body
    )

  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})