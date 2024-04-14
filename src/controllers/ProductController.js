const ProductModel = require("../models/ProductModel");
const {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
} = require("../util/helpers");

class ProductController {
  async Create(name, category, description, price, stock) {
    if (!validateName(name)) {
      throw new Error("Nombre del producto invalido.");
    }
    if (!validateCategory(category)) {
      throw new Error("Categoria del producto invalida.");
    }
    if (!validateDescription(description)) {
      throw new Error("Descripción del producto invalido.");
    }
    if (!validatePrice(price)) {
      throw new Error("Precio del producto invalido.");
    }
    if (!validateStock(stock)) {
      throw new Error("Stock del producto invalido.");
    }
    try {
      const newProduct = new ProductModel({
        name: name,
        category: category,
        description: description,
        price: price,
        stock: stock,
      });

      await newProduct.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductController;
