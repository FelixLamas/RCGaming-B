const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  validatePassword,
  validateEmail,
  validaNameUser,
} = require("../util/helpers");

class UserController {
  async CreateNewUser(name, email, password) {
    try {
      if (!validaNameUser(name)) {
        throw new Error("Nombre invalido");
      }
      if (!validateEmail(email)) {
        throw new Error("Formato de email invalido");
      }
      if (!validatePassword(password)) {
        throw new Error("Formato de password incorrecto");
      }
      const SALT = parseInt(process.env.BCRYPT_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const newUser = new userModel({
        name: name,
        email: email,
        password: hash,
        role: "user",
        isActive: true,
      });

      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }



    async ModifyUser(id, newData) {
        try {
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
    
            if (newData.isActive === true) {
                user.isActive = false;
            }else{
                user.isActive = newData.isActive;
            }
       
            Object.assign(user, newData);
    
            const updatedUser = await user.save();
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    

    async DeleteUser(id){
        try {
            const deleteUser = await userModel.findByIdAndDelete(id);
            return deleteUser
        } catch (error) {
            throw error
        }

  async CreateNewAdmin(name, email, password) {
    try {
      if (!validaNameUser(name)) {
        throw new Error("Nombre invalido");
      }
      if (!validateEmail(email)) {
        throw new Error("Formato de email invalido");
      }
      if (!validatePassword(password)) {
        throw new Error("Formato de password incorrecto");
      }
      const SALT = parseInt(process.env.BCRYPT_SALT);
      const hash = await bcrypt.hash(password, SALT);
      const newUser = new userModel({
        name: name,
        email: email,
        password: hash,
        role: "admin",
        isActive: true,
      });  
}

module.exports = UserController;
