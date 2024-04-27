const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const OrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    items: [ItemSchema], // Definido como un array de objetos usando el esquema ItemSchema
    totalPrice: {
        type: Number,
        min: 100.0,
        max: 100000000.0,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
});

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;