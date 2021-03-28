const express = require('express')
const fs = require("fs")
const app = express()
const cors = require('cors')
// middleware => req.body always a string
app.use(express.text())
app.use(cors())

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// file list
app.get("/getSketches", (req, res)=> {
  

  const files = [];
  
  fs.readdirSync("../hdmi_render/sketches").forEach(file => {
    console.log(file)
    files.push(file) 
  });
  res.send(files.join(","))

})

// receives files from post and writes into hdmi_render/sketches
app.post('/sketchReceiver', (req, res) => {
    console.log("Received Text Input")
    
    // for history
    fs.writeFileSync(
        "../hdmi_render/sketches/first.js", 
        req.body
    )

    // to change display
    fs.writeFileSync(
        "../hdmi_render/public/currentSketch.js", 
        req.body
    )

  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})