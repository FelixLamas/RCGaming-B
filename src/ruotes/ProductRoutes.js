const ProductController = require("../controllers/ProductController");

const ProductRoutes = (base, app) => {
  const prodController = new ProductController();

  app.post(`${base}`, async (req, res) => {
    try {
      const { name, category, description, price, stock, imageUrl } = req.body;
      await prodController.Create(
        name,
        category,
        description,
        price,
        stock,
        imageUrl
      );
      res.status(201).json({ mesage: "Existo al crear el producto" });
    } catch (error) {
      console.error("Error al crear el producto", error);
      return res
        .status(500)
        .json({ mesage: "Ocurrio un error al crear el producto" });
    }
  });
};

module.exports = ProductRoutes;
