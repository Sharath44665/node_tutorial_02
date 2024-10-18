const EventEmitter = require("events");
const http = require("http");

// const myEmitter = new EventEmitter();
// or
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("another sale for Sharath");
});

myEmitter.on("newSale", (stock) => {
  console.log(`there was stock: ${stock} left in the sale`);
});

myEmitter.emit("newSale", 10);

//--------------
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
