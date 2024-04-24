const ProductController = require("../controllers/ProductController");

const ProductRoutes = (base, app) => {
  const prodController = new ProductController();

  app.post(`${base}`, async (req, res) => {
    try {
      const {
        name,
        category_Id,
        description,
        price,
        stock,
        imageUrl,
        characteristic,
        outstanding,
        stockUpdateDate,
      } = req.body;
      await prodController.Create(
        name,
        category_Id,
        description,
        price,
        stock,
        imageUrl,
        characteristic,
        outstanding,
        stockUpdateDate
      );
      res.status(201).json({ mesage: "Existo al crear el producto" });
    } catch (error) {
      console.error("Error al crear el producto", error);
      return res
        .status(500)
        .json({ mesage: "Ocurrio un error al crear el producto" });
    }
  });


  app.get(`${base}/:id`, async(req, res)=>{
    try {
        const {id}=req.params;
        const response=await prodController.GetById(id);
        return res.status(200).json(response);
    } catch (error) {
        console.error(`Error al obtener el producto con id`, error);
        return res.status(500).json({message:"Ocurrio un error al intentar obtener el producto"}); 
    }
});

  app.get(`${base}/news/product`, async (req, res) => {
    try {
      const response = await prodController.GetNewsProducts();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener las productos destacados", error);
      return res.status(500).json({
        message: "Ocurrio un error al intentar obtener los productos destacados",
      });
    }
  });

  app.get(`${base}/categories/product`, async (req, res) => {
    try {
      const response = await prodController.GetAllCategories();
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener las categorias", error);
      return res.status(500).json({
        message: "Ocurrio un error al intentar obtener las categorias",
      });
    }
  });

  app.post(`${base}/update/:id`, async(req, res)=>{
    try {
      const {_id}=req.params;
      const newData=req.body;
      await prodController.upDateProduct(_id, newData);

      return res.status(201).json({message: "Se actualizó el producto exitosamente"})
    } catch (error) {
      console.error("Error al intentar actualizar el producto", error)
    }
  });

};

module.exports = ProductRoutes;
