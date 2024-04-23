const userModel = require("../models/UserModel");
const jwt=require('jsonwebtoken');
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


    async Login(req, res) {
        try {
          const body=req.body;

            const user = await userModel.findOne({email: body.email });

            if (!user) {
               return res.status(404).json({message: "Email y/o password incorrectos"});
            }

            if (user.isActive !== true) {
              return res.status(404).json({message: "Usuario inactivo por Admin"});
            }

            const isPasswordValid = await bcrypt.compare(body.password, user.password);
            if (!isPasswordValid) {
              return res.status(404).json({message: "Email y/o password incorrectos"});
            }
            const token=jwt.sign({
              _id:user._id,                
              role:user.role
          }, process.env.SECRET_KEY, {expiresIn:'1D'});

            return res.status(200).json({email:user.email, role:user.role, token:token});
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
      const savedUser=await newUser.save();
            return savedUser;
        } catch (error) {
            throw error
        }
    } 
  }

module.exports = UserController;
