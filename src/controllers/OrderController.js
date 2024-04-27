const OrderModel = require("../models/OrderModel")


class OrderController {

    async CreateOrder(
        user_id,
        items,
        totalPrice,
    ) {
        try {
            const newOrder = new OrderModel({
                user_id: user_id,
                items: items,
                totalPrice: totalPrice,
                date: new Date(),
            });

            await newOrder.save();
        } catch (error) {
            throw (error)
        }
    }

    async GetOrder() {
        try {
            const allOrder = await OrderModel.find()
                .populate('user_id', 'name email')
                .sort({ date: -1 })
                .exec();
            const formattedOrders = allOrder.map(order => ({
                ...order.toObject(),
                date: order.date.toLocaleString() // Formatear la fecha
            }));

            return formattedOrders;
        } catch (error) {
            throw (error)
        }
    }

}

module.exports = OrderController;