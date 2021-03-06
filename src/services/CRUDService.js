import bcrypt from 'bcryptjs';
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) =>{
    return new Promise(async (resolve , reject)=>{
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address : data.address,
                phonenumber: data.phonenumber,
                gender: data.gender ==="1" ? true : false,
                roleId: data.roleId,
            });
            resolve();
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (password)=>{
    return new Promise(async(resolve,rejcet)=>{
        try {
            var hashPassword = await bcrypt.hashSync(password , salt);
            resolve(hashPassword);
        } catch (error) {
            rejcet(error);
        }
    });
}
module.exports = {
    createNewUser: createNewUser
}