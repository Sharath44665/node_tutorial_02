const fs = require('fs');

const inputText = fs.readFileSync('./starter/txt/input.txt', 'utf-8')
console.log(inputText)

const writeText = `this is what we know about avacode: ${inputText} \ncreated on: ${Date.now()}`

fs.writeFileSync('./starter/txt/output.txt', writeText)

console.log('file has done writing')