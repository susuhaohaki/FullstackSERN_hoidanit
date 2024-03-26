import Express from "express";
const { getHomePage, getCRUD, postCRUD } = require("../controllers/homeController");
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage)
    router.get("/crud", getCRUD)
    router.post("/post-crud", postCRUD)





    return app.use("/", router);
}

module.exports = initWebRoutes