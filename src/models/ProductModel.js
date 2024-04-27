const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    require: [true, "El nombre del producto es requerido"],
    minLength: 4,
    maxLength: 50,
  },
  category_id: {
    type: String,
    require: [true, "La categoría del producto es requerida"],
  },
  description: {
    type: String,
    require: [true, "La descripción del producto es requerida"],
    minLength: 4,
    maxLength: 500,
  },
  price: {
    type: Number,
    require: [true, "EL precio del producto es requerido"],
    min: 100.0,
    max: 100000000.0,
  },
  stock: {
    type: Number,
    require: [true, "EL stock del producto es requerido"],
    min: 1,
    max: 200,
  },
  imageUrl: {
    type: String,
    require: [true, "La imagen del producto es requerida"],
  },
  characteristic: [
      {
        type: String,
        require: [true, "La característica del producto es requerida"],
        min: 4,
        max: 200,
      }
  ],
  outstanding: {
    type: Boolean,
  },
  stockUpdateDate: {
    type: Date,
    require: [
      true,
      "La fecha de actualización del stock del producto es requerida",
    ],
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;
