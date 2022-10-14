require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const methodOverride = require("method-override");
const port = process.env.HTTP_PORT;
const app = express();

try {
  app.use(express.json());
  app.use(morgan("dev"));
  app.set("view engine", "ejs");
  app.use("/public", express.static("public"));
  app.use(methodOverride("_method"));

  app.use(router);

  app.use((req, res, next) => {
    return res.status(400).json({
      status: false,
      message: "Are You Lost?",
      data: null,
    });
  });

  app.use((err, req, res, next) => {
    return res.status(500).json({
      status: false,
      message: err.message,
      data: null,
    });
  });

  app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  });
} catch (error) {
  console.log(error.message);
}
