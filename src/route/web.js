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

    router.post('/api/get-all-user' , userController.handleGetAllUser);



    return app.use("/" , router);
}

module.exports = initWebRoutes;