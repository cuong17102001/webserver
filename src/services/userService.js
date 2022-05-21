import db from "../models/index";
import bcryptjs from "bcryptjs";

const salt = bcryptjs.genSaltSync(10);

let hashUserPassword = (password)=>{
    return new Promise(async(resolve,rejcet)=>{
        try {
            var hashPassword = await bcryptjs.hashSync(password , salt);
            resolve(hashPassword);
        } catch (error) {
            rejcet(error);
        }
    });
}

let handleUserLogin = (email , password) =>{
    return new Promise(async(resolve , reject) =>{
        try {
            let isExist = await checkUserEmail(email);
            let userData = {}
            if (isExist) {
                let user = await db.User.findOne({
                    where:{email:email},
                    raw : true
                });
                if (user) {
                    let check = await bcryptjs.compareSync(password , user.password);
                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = `OK!`;
                        delete user.password;
                        userData.user = user;
                    }else{
                        userData.errCode = 1;
                        userData.errMessage = `Password wrong`;
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMessage = `your's email isn't exist in system`;
                resolve(userData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (email) =>{
    return new Promise( async(resolve , reject) =>{
        try{
            let user = await db.User.findOne({
                where: {email: email}
            })

            if (user) {
                resolve(true)
            }else{
                resolve(false)
            }

        }catch(e) {
            reject(e)
        }
    })
}

let getAllUser = (userId)=>{
    return new Promise(async(resolve , reject) =>{
        try {
            let users = "";
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }

            if(userId && userId !== "ALL"){
                users = await db.User.findOne({
                    where: {id : userId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data)=>{
    return new Promise( async(resolve , reject) =>{
        try {

            let checkEmail = await checkUserEmail(data.email);

            if (checkEmail === true) {
                resolve({
                    errCode : 1,
                    message : "your email exist"
                });
            }else{
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address : data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.role,
                    positionId: data.position,
                    image : data.image
                });
                resolve({
                    errCode : 0,
                    message : "OK"
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (id) =>{
    return new Promise(async(resolve , reject) =>{
        try {
            let user = await db.User.findOne({
                where : {id : id}
            })
            if (!user) {
                resolve({
                    errCode:1,
                    errMessage : "User isn't exist"
                })
            }   

            await db.User.destroy({
                where : {id : id}
            })
            resolve({
                errCode:0,
                message: "delete user successfully"
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) =>{
    return new Promise(async(resolve , reject) =>{
        try {

            if(!data.id){
                resolve({
                    errCode : 2,
                    errMessage:"missing parameters"
                })
            }

            let user = await db.User.findOne({
                where : {id:data.id},
                raw : false
            });
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address
                user.phonenumber = data.phonenumber
                await user.save();
                resolve({
                    errCode : 0,
                    message : "oke"
                })
            }else{
                resolve({
                    errCode:1,
                    errMessage:"user isn't exist"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCodeService = (typeInput)=>{
    return new Promise( async(resolve , reject) => {
        try {

            if (!typeInput) {
                resolve({
                    errCode : 1,
                    errMessage : "missing param"
                })
            } else {
                let data = {};

                let allcode = await db.Allcode.findAll({
                    where : {type : typeInput}
                });
                data.errCode = 0
                data.data = allcode;
                resolve(data);
            }
           
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin:handleUserLogin,
    getAllUser : getAllUser,
    createNewUser : createNewUser,
    deleteUser : deleteUser,
    updateUserData : updateUserData,
    getAllCodeService:getAllCodeService
}