const { response } = require("express");
const UserController = require("../controllers/UserController");
const Auth = require("../util/Auth");
const UserRoutes = (base, app) => {
  const userController = new UserController();
  app.post(
    `${base}/create-admin`,
    Auth.isAuth,
    Auth.isAdmin,
    async (req, res) => {
      try {
        const { name, email, password } = req.body;
        await userController.CreateNewAdmin(name, email, password);
        return res.status(201).json({ message: "Exito al crear el usuario" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Ocurrio un error al intentar crear el usuario" });
      }
    }
  );

  app.post(`${base}/create-user`, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await userController.CreateNewUser(name, email, password);
      return res.status(201).json({ message: "Exito al crear el usuario" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocurrio un error al intentar crear el usuario" });
    }
  });

  app.put(`${base}/modify/:id`, Auth.isAuth, Auth.isAdmin, async (req, res) => {
    try {
      const id = req.params.id;
      const newData = req.body;
      await userController.ModifyUser(id, newData);
      return res.status(200).json({ message: "Exito al modificar el usuario" });
    } catch (error) {
      return res.status(500).json({
        message: "Error al intentar modificar el usuario desde modify",
      });
    }
  });

  app.put(
    `${base}/activate/:id`,
    Auth.isAuth,
    Auth.isAdmin,
    async (req, res) => {
      try {
        const id = req.params.id;
        await userController.ModifyUser(id);
        return res
          .status(200)
          .json({ message: "Exito al cambiar el estado del usuario" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error al intentar cambiar el estado del usuario" });
      }
    }
  );

  app.delete(
    `${base}/delete/:id`,
    Auth.isAuth,
    Auth.isAdmin,
    async (req, res) => {
      try {
        const id = req.params.id;
        await userController.DeleteUser(id);
        return res
          .status(200)
          .json({ message: "Exito al eliminar el usuario" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error al intentar eliminar el usuario" });
      }
    }
  );

  app.post(`${base}/login`, async (req, res, next) => {
    try {
      const response = await userController.Login(req, res);
      return response;
    } catch (error) {
      next(error);
    }
  });

  app.post(`${base}/recovery_password`, async (req, res) => {
    try {
      const reponse = await userController.RecoveryPassword(req, res);
      return reponse;
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener el usuario." });
    }
  });

  app.patch(`${base}/reset_password`, async (req, res) => {
    try {
      const respose = await userController.ResetPassword(req, res);
      return respose;
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al modificar la contraseña" });
    }
  });
  
  app.get(`${base}/getUsers`, Auth.isAuth, Auth.isAdmin, async (req, res) => {
    try {
      const users = await userController.getAllUsers();
      // Excluir el campo de contraseña antes de enviar la respuesta
      const usersWithoutPassword = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return res.status(200).json(usersWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  });


};

module.exports = UserRoutes;
