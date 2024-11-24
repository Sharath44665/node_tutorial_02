const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.status(200)
    .json({"msg":"hello express js...", "app": "natours"})
})

const port = 3000
app.listen(port, () => {
    console.log(`app running on ${port}...`)
})



