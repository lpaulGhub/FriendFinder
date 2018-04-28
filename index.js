const express = require('express')
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const routes = require("./lib/router");
const webServer = express();

const webErr = (err) =>
  console.log(`There was an error on the server ${err}`);

const webSuccess = (port) =>
  console.log(`Server is running on http://localhost:${port}`);

webServer
  .on('error', webErr)
  .use(bodyparser.urlencoded({extended:false}))
  .use(express.static("lib/public"))
  .use("/api", routes.api)
  .use((req, res, next) => res.sendStatus(404))
  .use((err, req, res, next) => res.sendStatus(500))
  .listen(port, webSuccess(port))