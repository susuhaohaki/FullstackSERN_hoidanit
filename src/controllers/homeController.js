import db from '../models/index';
const { createNewUser, getAllUser, getUserInfoById, updateUserData } = require("../services/CRUDService");
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
    let data = await getAllUser();
    res.render("display-CRUD.ejs", {
        dataTable: data,
    })
};

let displayCRUD = async (req, res) => {
    let data = await getAllUser();
    console.log("------------");
    console.log(data)
    res.render("display-CRUD.ejs", {
        dataTable: data,
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await getUserInfoById(userId)
        return res.render("editCRUD.ejs", { dataTable: userData })
    }
    else {
        return res.send("User not Found")
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let alluser = await updateUserData(data);
    console.log(data);
    return res.render('display-CRUD.ejs', {
        dataTable: alluser
    })
}

module.exports = {
    getHomePage, getCRUD, postCRUD, displayCRUD, getEditCRUD, putCRUD
}