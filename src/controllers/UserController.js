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

    }

module.exports=UserController
