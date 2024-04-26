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

}

module.exports=OrderRoutes;
