const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // below code takes too much time to serve the data
  // fs.readFile('./test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data)
  // })

  // streams
//   const readable = fs.createReadStream("./atest-file.txt");
//   readable.on("data", (chunk) => {
//     res.write(chunk);
//   });

//   readable.on("end", () => {
//     res.end();
//   });

//   readable.on("error", (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     res.end("file not found");
//   });

    // final solution 

    const readable = fs.createReadStream('./test-file.txt')
    readable.pipe(res)
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`lisening at 8000...`);
});
