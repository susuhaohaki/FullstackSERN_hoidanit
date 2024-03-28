import Express from "express";
const { getHomePage, getCRUD, postCRUD, displayCRUD } = require("../controllers/homeController");
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage)
    //create user
    router.get("/crud", getCRUD)
    router.post("/post-crud", postCRUD)
    //read user
    router.get("/get-crud", displayCRUD)



    return app.use("/", router);
}

module.exports = initWebRoutes