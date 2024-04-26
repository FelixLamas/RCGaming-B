const OrderModel = require("../models/OrderModel")


class OrderController {

    async CreateOrder(
        user_id,
        items,
        totalPrice,
    ) {
        try {
            const newOrder = new OrderModel({
                user_id:user_id,
                items:items,
                totalPrice:totalPrice,
                date: new Date(),
            });
            
            await newOrder.save();
        } catch (error) {
            throw(error)
        }
    }
}

module.exports = OrderController;