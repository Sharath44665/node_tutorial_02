const fs = require('fs')
const http = require('http')
const url = require('url')

const prodData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const overviewPage = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const cardPage = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const productPage = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const jsonObj = JSON.parse(prodData)
// console.log(jsonData)
// console.log(typeof(prodData)) // String
// console.log(typeof(jsonData)) // object


const replaceTemplate =(template, product) => {
    let output = template.replace(/{% product_name %}/g, product.productName);// product_name is global
    output = output.replace(/{% prod_img %}/g, product.image);
    output = output.replace(/{% prod_price %}/g, product.price);
    output = output.replace(/{% prod_from %}/g, product.from);
    output = output.replace(/{% product_nutrient_name %}/g, product.nutrients);
    output = output.replace(/{% prod_qty %}/g, product.quantity);
    output = output.replace(/{% prod_description %}/g, product.description);
    output = output.replace(/{% prod_id %}/g, product.id);

    if (!product.organic) output = output.replace(/{% not_organic %}/g, "not-organic")

    
    return output;
}
const server  = http.createServer((req, res) => {
    // console.log(req.url)
    const pathName = req.url

    if (pathName === "/" || pathName === "/overview"){
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = jsonObj.map(el => replaceTemplate(cardPage, el)).join('');

        // console.log(cardsHtml)// returns all htmls
        const output = overviewPage.replace('{%prodcards%}', cardsHtml)
        res.end(output)
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



