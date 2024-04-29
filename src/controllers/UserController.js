const userModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
      const body = req.body;

      const user = await userModel.findOne({ email: body.email });

      if (!user) {
        return res
          .status(404)
          .json({ message: "Email y/o password incorrectos" });
      }

      if (user.isActive !== true) {
        return res.status(404).json({ message: "Usuario inactivo por Admin" });
      }

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password
      );
      if (!isPasswordValid) {
        return res
          .status(404)
          .json({ message: "Email y/o password incorrectos" });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1D" }
      );

      return res
        .status(200)
        .json({ email: user.email, role: user.role, token: token });
    } catch (error) {
      throw error;
    }
  }

  async ModifyUser(id) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      if (user.isActive === true) {
        user.isActive = false;
      } else {
        user.isActive = true;
      }

      Object.assign(user);

      const updatedUser = await user.save();
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async DeleteUser(id) {
    try {
      const deleteUser = await userModel.findByIdAndDelete(id);
      return deleteUser;
    } catch (error) {
      throw error;
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
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  async RecoveryPassword(req, res) {
    try {
      const { email } = req.body;
      const userSearch = await userModel.findOne({ email: email });
      if (!userSearch) {
        return res.status(404).json({
          message: "Error el correo electrónico no existe en la base de datos.",
        });
      }
      const transporter = nodemailer.createTransport({
        service: `outlook`,
        auth: {
          user: `rcgaming.24@outlook.com`,
          pass: `rcgaming80*`,
        },
      });
      const token = jwt.sign(
        {
          _id: userSearch._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );
      const confirmationLink = `https://rc-games.netlify.app/reset_password?token=${token}&email=${email}`;

      const mailOptions = {
        from: "rcgaming.24@outlook.com",
        to: `${email}`,
        subject: "Recuperación de contraseña.",
        text: `Haz clic en el siguiente enlace para cambiar tu comtraseña: ${confirmationLink}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Correo electrónico enviado: " + info.response);
        }
      });
      return res.status(200).json({
        message: "Exito, se envio el email para cambio de contraseña",
      });
    } catch (error) {
      throw error;
    }
  }

  async ResetPassword(req, res) {
    try {
      const { email, token } = req.body;
      const password = req.body.values.password;

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (!decoded) {
        return res.status(401).json({
          message: "Token invalido o expirado",
        });
      }
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          message: "Correo no encontrado",
        });
      }
      const SALT = parseInt(process.env.BCRYPT_SALT);
      const hash = await bcrypt.hash(password, SALT);
      user.password = hash;

      await user.save();
      return res.status(200).json({
        message: "Exito,se realizo cambio de contraseña",
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await userModel.find(); 
      return users;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
