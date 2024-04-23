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

    async Login(email, password) {
        try {



            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error ("Usuario incorrecto")
            }

            if (user.isActive !== true) {
                throw new Error ("Usuario inactivo por Admin")
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error ("Contraseña invalida")
            }

            return user;
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

    }

    }

module.exports=UserController
