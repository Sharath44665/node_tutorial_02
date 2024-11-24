const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const x = 22;

// console.log(app.get('env'))
// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on ${port}...`);
});
