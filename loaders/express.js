const express = require("express");
const body = require("body-parser");
const cors = require("cors");

export default async((app) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");

  app.use(cors());
  app.use(require("morgan")("dev")); // For log
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;
});
