import db from '../models/index';
const { createNewUser, getAllUser } = require("../services/CRUDService");
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homePage.ejs", {
            data: JSON.stringify(data),
        });

    } catch (e) {
        console.log(e);
    }

};
let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
};

let postCRUD = async (req, res) => {
    let message = await createNewUser(req.body);
    console.log(message)
    return res.send("post CRUD form sever")
};

let displayCRUD = async (req, res) => {
    let data = await getAllUser();
    console.log("------------");
    console.log(data)
    res.render("display-CRUD.ejs", {
        dataTable: data,
    })
}



module.exports = {
    getHomePage, getCRUD, postCRUD, displayCRUD
}