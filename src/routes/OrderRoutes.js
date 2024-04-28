const OrderController = require("../controllers/OrderController");

const OrderRoutes = (base, app)=>{

    const orderController = new OrderController()

    app.post(`${base}/orderCreate`, async (req, res) => {
        try {
            const {
                user_id,
                items,
                totalPrice,
            } = req.body;
            await orderController.CreateOrder(
                user_id,
                items,
                totalPrice,
            );
            res.status(201).json({ mesage: "Existo al crear la orden de compra" });
        } catch (error) {
            console.error("Error al crear la orden de compra", error);
            return res
                .status(500)
                .json({ mesage: "Ocurrio un error al crear la orden de compra" });
        }
    });

    app.get(`${base}`, async (req,res)=>{
        try{
            const response = await orderController.GetOrder();
            return res.status(200).json(response);
        }catch(error){
            return res.status(500).json({
                message:"Ocurrio un error al traer todas las ordenes"
            })
        }
    })

}

module.exports=OrderRoutes;
