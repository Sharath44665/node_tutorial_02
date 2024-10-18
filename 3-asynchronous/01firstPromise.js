const fs = require("fs");
const superagent = require("superagent");

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      
      console.log(res.body);

      fs.writeFile("writeFile.txt", res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log("random img saved");
      });
    })
    .catch((err) => console.log(err.message))
});
