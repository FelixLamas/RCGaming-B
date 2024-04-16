const ProductModel = require("../models/ProductModel");
const {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
} = require("../util/helpers");

class ProductController {
  async Create(
    name,
    category,
    description,
    price,
    stock,
    imageUrl,
    characteristic,
    outstanding
  ) {
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
    if (!validateImageUrl(imageUrl)) {
      throw new Error("URL de la imagen del producto invalida.");
    }
    if (!validateCharacteristic) {
      throw new Error("La catasreristica del producto invalida.");
    }
    try {
      const newProduct = new ProductModel({
        name: name,
        category: category,
        description: description,
        price: price,
        stock: stock,
        imageUrl: imageUrl,
        characteristic: characteristic,
        outstanding: outstanding,
      });

      await newProduct.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductController;
