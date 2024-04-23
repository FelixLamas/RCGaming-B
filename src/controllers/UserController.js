const userModel= require("../models/UserModel")
const bcrypt=require("bcrypt")
const { validatePassword, validateEmail} = require("../util/helpers")

class UserController{
    async CreateNewUser(email,password){
        try {
            if (!validateEmail(email)) {
                throw new Error("Formato de email invalido")
            }
            if (!validatePassword(password)){
                throw new Error ("Formato de password incorrecto")
            }
            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser= new userModel({
                email:email,
                password:hash,
                role:"user"
            });
    
            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error
        }
    }

    async CreateNewAdmin(email,password){
        try {
            if (!validateEmail(email)) {
                throw new Error("Formato de email invalido")
            }
            if (!validatePassword(password)){
                throw new Error ("Formato de password incorrecto")
            }
            const SALT=parseInt(process.env.BCRYPT_SALT);
            const hash=await bcrypt.hash(password, SALT);
            const newUser= new userModel({
                email:email,
                password:hash,
                role:"admin"
            });
    
            const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error
        }
    }


    async ModifyUser(id, newData, requestingUser) {
        try {
            if (requestingUser.role !== "admin") {
                throw new Error("No tienes permiso para modificar usuarios");
            }
    
            const user = await userModel.findById(id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
    
            if (newData.isActive !== undefined) {
                user.isActive = newData.isActive;
            }
    
            if (newData.email && !validateEmail(newData.email)) {
                throw new Error("Formato de email invalido");
            }
            if (newData.password && !validatePassword(newData.password)) {
                throw new Error("Formato de password incorrecto");
            }
            if (newData.password) {
                const SALT = parseInt(process.env.BCRYPT_SALT);
                newData.password = await bcrypt.hash(newData.password, SALT);
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

    }

    }

module.exports=UserController
