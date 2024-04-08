import Express from "express";
const { getHomePage, getCRUD, postCRUD,
    displayCRUD, getEditCRUD, putCRUD,
    deleteCRUD } = require("../controllers/homeController");
import userController from "../controllers/userController";
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage)
    //create user
    router.get("/crud", getCRUD)
    router.post("/post-crud", postCRUD)
    //read user
    router.get("/get-crud", displayCRUD)
    //edit user
    router.get("/edit-crud", getEditCRUD)
    router.post("/put-crud", putCRUD)
    //delete user
    router.get("/delete-crud", deleteCRUD)

    // api
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)


    return app.use("/", router);
}

module.exports = initWebRoutes