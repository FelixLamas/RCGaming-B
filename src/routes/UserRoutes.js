const UserController = require("../controllers/UserController");

const UserRoutes = (base, app) => {
  const userController = new UserController();
  app.post(`${base}/create-admin`, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await userController.CreateNewAdmin(name, email, password);
      return res.status(201).json({ message: "Exito al crear el usuario" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Ocurrio un error al intentar crear el usuario" });
    }
  });

  app.post(`${base}/create-user`, async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await userController.CreateNewUser(name, email, password);
      return res.status(201).json({ message: "Exito al crear el usuario" });
    } catch (error) {
      //console.error("Error al crear un nuevo usuario-->",error)
      return res
        .status(500)
        .json({ message: "Ocurrio un error al intentar crear el usuario" });
    }
  });


    app.put(`${base}/modify/:id`, async (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body; 
            await userController.ModifyUser(id, newData);
            return res.status(200).json({ message: "Exito al modificar el usuario" });
        } catch (error) {
            return res.status(500).json({ message: "Error al intentar modificar el usuario desde modify" });
        }
    });

    app.put(`${base}/activate/:id`, async (req, res) => {
        try {
            const id = req.params.id;
            const isActive = req.body.isActive; 
            await userController.ActivateUser(id, isActive);
            return res.status(200).json({ message: "Exito al cambiar el estado del usuario" });
        } catch (error) {
            return res.status(500).json({ message: "Error al intentar cambiar el estado del usuario" });
        }
    });

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id= req.params.id
            await userController.DeleteUser(id);
            return res.status(200).json({message:"Exito al eliminar el usuario"})    
        } catch(error){
            return res.status(500).json({message:"Error al intentar eliminar el usuario"})

        }
    });


    app.post(`${base}/login`, async (req, res) => {
        try {
            const { email, password } = req.body;

            // Verificar correo electrónico y contraseña
            const user = await userController.Login(email, password);

            if (!user) {
                return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos" });
            }

            // Verificar estado del usuario
            if (!user.isActive) {
                return res.status(401).json({ message: "El usuario no está activo" });
            }

            // Inicio de sesión exitoso
            return res.status(200).json({ message: "Inicio de sesión exitoso" });
        } catch (error) {
            return res.status(500).json({ message: "Error al intentar iniciar sesión" });
            
        }
    });

}

module.exports=UserRoutes

