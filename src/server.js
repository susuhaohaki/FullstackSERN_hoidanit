import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from "./config/connectDB"
require("dotenv").config();


let app = Express();



// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
//port == undefind => 8081
let port = process.env.PORT || 8081;

connectDB();

app.listen(port, () => {
    //callbak
    console.log("backend nodejs is running on the port " + port)
})