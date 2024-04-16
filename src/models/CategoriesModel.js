const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        require: [true, "El nombre de la categoria es requerida"],
        minLength: 4,
        maxLength: 50,
    },
    image: {
        type: String,
        require: [true, "La imagen de la categoria es requerida"],
    },
});

const CategoriesModel = mongoose.model("categories", CategorySchema);

module.exports = CategoriesModel;