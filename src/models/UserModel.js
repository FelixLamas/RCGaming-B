const mongoose= require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({ 
    email:{
        type: String,
        required: true,
        unique: true,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        required:[true, "El rol es requerido"]
    },
    isActive: {
        type: Boolean,
        default: true // Por defecto, el usuario está activo
    }
});

UserSchema.statics.modifyUser = async function(id, newData) {
    try {
        const updatedUser = await this.findByIdAndUpdate(id, newData, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};

const UserModel=mongoose.model("user", UserSchema);

module.exports=UserModel

