const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const dataBaseC = require("./dbConection.js");
const ProductRoutes = require("./routes/ProductRoutes.js");
const UserRoutes = require("./routes/UserRoutes.js");
const app = express();

require("dotenv").config();
dataBaseC();
app.set("port", process.env.PORT || 5000);
app.listen(app.get("port"), () => {
  console.log("Backend del proyecto escuchando en el puerto:", app.get("port"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

//ruta de prueba para el back
app.get("/test", async (req, res) => {
  try {
    return res.status(200).json({ message: "realizo la consulta ok" });
  } catch (error) {
    console.error(error);
  }
});

UserRoutes("/users", app);
ProductRoutes("/products", app);
