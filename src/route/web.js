import Express from "express";
const { getHomePage, getCRUD, postCRUD,
    displayCRUD, getEditCRUD, putCRUD,
    deleteCRUD } = require("../controllers/homeController");
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

    return app.use("/", router);
}

module.exports = initWebRoutes