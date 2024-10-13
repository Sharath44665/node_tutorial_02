const fs = require('fs')
const http = require('http')
const { json } = require('stream/consumers')
const url = require('url')

const prodData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const jsonObj = JSON.parse(prodData)
// console.log(jsonData)
// console.log(typeof(prodData)) // String
// console.log(typeof(jsonData)) // object
const server  = http.createServer((req, res) => {
    // console.log(req.url)
    const pathName = req.url

    if (pathName === "/" || pathName === "/overview"){
        res.end("Hello from overviews")
    }
    else if (pathName === "/product"){
        res.end("this is product pages")
    }
    else if (pathName === "/api"){
       
        res.writeHead(200, {
            'Content-type':'application/json'
        });
        res.end(prodData);
        
        // res.end("hey this is  api page")
    }
    else{
        res.writeHead(404, {
            'content-type' : 'text/html',
            'demo-header': 'this is demo header'
        } );
        res.end("<h2>hey this poge u r trying is not found</h2>")
    }
})


server.listen(8000,  () => {
    console.log('listening at port 8000...');
    
})



