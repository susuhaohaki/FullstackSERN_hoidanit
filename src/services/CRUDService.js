const bcrypt = require('bcryptjs');
const db = require("../models/index")

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resolve('ok crate a new user succeed !')
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e);

        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, raw: true
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (e) {
            reject(e);
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let newUser = await db.User.update({
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                phonenumber: data.Phonenumber
            }, {
                where: { id: data.id }
            });
            let allUser = db.User.findAll({
                raw: true
            });
            resolve(allUser)
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = { createNewUser, getAllUser, getUserInfoById, updateUserData }