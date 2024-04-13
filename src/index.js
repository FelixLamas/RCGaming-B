const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();
require("dotenv").config();
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log("Backend del proyecto escuchando en el puerto:", app.get("port"));
});

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

app.get("/test", async (req, res) => {
  try {
    return res.status(200).json({ mesage: "realizo la consulta ok" });
  } catch (error) {
    console.error(error);
  }
});
