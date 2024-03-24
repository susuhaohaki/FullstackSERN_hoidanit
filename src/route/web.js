import Express from "express";
const { getHomePage } = require("../controllers/homeController");
let router = Express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage)
    return app.use("/", router);
}

module.exports = initWebRoutes