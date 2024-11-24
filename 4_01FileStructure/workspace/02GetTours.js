const express = require('express')
const fs = require('fs')

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'))
const app = express()

// app.get("/", (req, res) => {
//     res.status(200)
//     .json({"msg":"hello express js...", "app": "natours"})
// })

app.get("/api/v1/tours", (req, res) =>{
    res.status(200).json({
        status: "success",
        results: tours.length, 
        data: {tours: tours}
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`app running on ${port}...`)
})



