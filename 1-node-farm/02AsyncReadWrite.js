const fs = require('fs');

// non blocking asynchronous way 

// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data)
// })

// console.log("hello demo reading ")

// output:

// hello demo reading 
// read-this

fs.readFile('./starter/txt/start.txt', 'utf-8', (err, dataOne) => {
    if (err) return console.log(`Error: ${err}`)

    fs.readFile(`./starter/txt/${dataOne}.txt`, 'utf-8', (err, dataTwo) => {
        console.log(dataTwo)
        fs.readFile('./starter/txt/append.txt', 'utf-8', (err, dataThree) => {
            console.log(dataThree)
            fs.writeFile('./starter/txt/final.txt', `${dataTwo}\n${dataThree}`, 'utf-8', err => {
                console.log("data written successfully")
            })
        })
    })
})

console.log("hello demo reading ")


