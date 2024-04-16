const mongoose = require("mongoose");

const dbConection = () => {
  const uri = process.env.DDBB;
  mongoose.connect(uri, { dbName: "RCGaming" });
  const connection = mongoose.connection;

  connection.once("open", () => {
    console.log("Conexion a la bd realizada correctamente");
  });
};

module.exports = dbConection;
