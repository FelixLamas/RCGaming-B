const UserController=require("../controllers/UserController")

const UserRoutes=(base, app)=>{
    const userController= new UserController();
    app.post(`${base}/create-admin`, async(req,res)=>{
        try {
            const {email, password}=req.body;
            await userController.CreateNewAdmin(email, password);
            return res.status(201).json({message:"Exito al crear el usuario"})
        } catch (error) {
            return res.status(500).json({message: "Ocurrio un error al intentar crear el usuario"})
        }
    });

    app.post (`${base}/create-user`, async(req,res)=>{
        try {
            const {email, password}=req.body;
            await userController.CreateNewUser(email, password);
            return res.status(201).json({message: "Exito al crear el usuario"})
        } catch (error) {
            //console.error("Error al crear un nuevo usuario-->",error)
            return res.status(500).json({message: "Ocurrio un error al intentar crear el usuario"})
        }

    })

    app.delete(`${base}/delete/:id`, async(req, res)=>{
        try {
            const id= req.params.id
            await userController.DeleteUser(id);
            return res.status(200).json({message:"Exito al eliminar el usuario"})    
        } catch(error){
            return res.status(500).json({message:"Error al intentar eliminar el usuario"})

        }
    })

}

module.exports=UserRoutes