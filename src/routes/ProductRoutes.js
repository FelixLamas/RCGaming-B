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
      } = req.body;
      await prodController.Create(
        name,
        category_Id,
        description,
        price,
        stock,
        imageUrl,
        characteristic,
        outstanding
      );
      res.status(201).json({ mesage: "Existo al crear el producto" });
    } catch (error) {
      console.error("Error al crear el producto", error);
      return res
        .status(500)
        .json({ mesage: "Ocurrio un error al crear el producto" });
    }
  });
app.get(`${base}/categories`, async (req, res)=>{
        try{
            const response = await prodController.GetAllCategories();
            return res.status(200).json(response);
        }catch(error){
            console.error("Error al obtener las categorias", error);
            return res.status(500).json({message:"Ocurrio un error al intentar obtener las categorias"});
        }
    })
};

module.exports = ProductRoutes;

