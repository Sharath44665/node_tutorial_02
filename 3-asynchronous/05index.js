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

    const dataOnePromise = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const dataTwoPromise = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const dataThreePromise = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const allData = await Promise.all([
      dataOnePromise,
      dataTwoPromise,
      dataThreePromise,
    ]);

    const imgs = allData.map((el) => el.body.message);

    // console.log(res.body.message);
    console.log(imgs);

    await writeFilePromise("./writeFile.txt", imgs.join("\n"));
    console.log("write success");
  } catch (err) {
    console.log(err);
    throw err;
  }

  return "something from promise call";
};

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
