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

const getDogPic = async () => {
  try {
    const data = await readFilePromise("./dog.txt");
    console.log(`bread data: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePromise("./writeFile.txt", res.body.message);
    console.log("write success");
  } catch (err) {
    console.log(err);
    throw err;
  }

  return "something from promise call";
};

// console.log("1. first statement");
// getDogPic().then((x) => console.log(x));
// console.log("2. second statement");

// output:
/*
1. first statement
2. second statement
bread data: labrador
https://images.dog.ceo/breeds/labrador/n02099712_3301.jpg
write success
something from promise call
*/

(async () => {
  try {
    console.log("1. first statement");
    const x = await getDogPic();
    console.log(x);
    console.log("2. second statement");
  } catch (err) {
    console.log("ERROR ");

  }
})();
