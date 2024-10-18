const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("not found file while reading");
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("something went wrong in writing or file not found");

      resolve("success! write");
    });
  });
};
readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    // promise

    console.log(data.body);

    return writeFilePromise("writeFile.txt", data.body.message);
  })
  .then(() => console.log("random img saved: write success"))

  .catch((err) => console.log(err));
