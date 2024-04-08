const bcrypt = require('bcryptjs');
const db = require("../models/index");
const salt = bcrypt.genSaltSync(10);



let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true
                },);
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `succeed`;
                        delete user.password;  // xóa cột password bảo mật thông tin 
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `wrong password`;
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `user's not found`;

                }
            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `your's email isn't exist in your system. plz try other email`

            }

            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(email)
            let user = await db.User.findOne({ where: { email: userEmail } });
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })

}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Your email is already in used, plz try another email",
                })
            }
            else {
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
                resolve({
                    errCode: 0,
                    message: "ok"
                })
            }


        } catch (e) {
            reject(e)
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

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "The user isn't exist"
                })
            } else {
                await db.User.destroy({
                    where: {
                        id: id
                    },
                });
                resolve({
                    errCode: 0,
                    mmessage: "The user is delete succeed"
                })
            }



        } catch (e) {
            reject(e)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (user) {
                await db.User.update({
                    firstName: data.FirstName,
                    lastName: data.LastName,
                    address: data.Address,
                }, {
                    where: { id: data.id }
                });
                resolve({
                    errCode: 0,
                    message: 'update user succeed'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: "user's not found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })


}
module.exports = { handleUserLogin, getAllUsers, createNewUser, updateUserData, deleteUser }