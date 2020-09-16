const express = require("express");
const app = express();

const indexRouter = require("./routes/index");
const loaders = require("./loaders");

const { mysqlConnection } = loaders.default({ expressApp: app });

app.use("/", indexRouter);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Your server is ready on port ${process.env.PORT}`);
});
