const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify');

const replaceTemplate = require("./modules/replaceTemplate");

const prodData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const cardPage = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const productPage = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const jsonObj = JSON.parse(prodData)
// console.log(jsonData)
// console.log(typeof(prodData)) // String
// console.log(typeof(jsonData)) // object

const slugs = jsonObj.map(el => slugify(el.productName, {lower: true}))
console.log(slugs)
// output:
/*
[
    'fresh-avocados',
    'goat-and-sheep-cheese',
    'apollo-broccoli',
    'baby-carrots',
    'sweet-corncobs'
]
*/  
// slugify()


const server  = http.createServer((req, res) => {
    // console.log(req.url)
    // const pathName = req.url
    const { query,pathname } = url.parse(req.url, true);
    const pathName = pathname;
    // console.log(pathName);
    console.log("hello sharath");

    if (pathName === "/" || pathName === "/overview"){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = jsonObj.map(el => replaceTemplate(cardPage, el)).join('');

        // console.log(cardsHtml)// returns all htmls
        const output = overviewPage.replace('{% prod_cards %}', cardsHtml)
        res.end(output)
    }
    else if (pathName === "/product"){
        res.writeHead(200, {'Content-type': 'text/html'});
        // console.log(jsonObj)
        // console.log(query)
        // console.log(query.id)
        const product = jsonObj[parseInt(query.id)];
        // console.log(product)
        const output = replaceTemplate(productPage, product)
        res.end(output)
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



