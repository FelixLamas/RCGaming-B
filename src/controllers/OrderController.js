const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");


class OrderController {

    async CreateOrder(
        user_id,
        items,
        totalPrice,
    ) {
        try {
            await Promise.all(
                items.map(async item => {
                    const product = await ProductModel.findById(item.id);
                    product.stock -= item.quantity;
                    await product.save();
                })
            );

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
                date: order.date.toLocaleString()
            }));

            return formattedOrders;
        } catch (error) {
            throw (error)
        }
    }
}

module.exports = OrderController;