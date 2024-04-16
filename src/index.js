const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dataBaseC = require("./dbConection.js");
const app = express();
const ProductRoutes = require("./routes/ProductRoutes.js");

require("dotenv").config();
dataBaseC();
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log("Backend del proyecto escuchando en el puerto:", app.get("port"));
});

app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

ProductRoutes("/products", app);
