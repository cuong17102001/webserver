import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/' , homeController.getHomePage);
    router.get('/get-crud' , homeController.getCRUD);

    router.post('/post-crud' , homeController.postCRUD);

    //api
    router.post('/api/login',userController.handleLogin);

    router.get('/api/get-all-user' , userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    router.get('/api/allcode',userController.getAllCode)

    return app.use("/" , router);
}

module.exports = initWebRoutes;