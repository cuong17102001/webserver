import db from "../models/index";
import bcryptjs from "bcryptjs";

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

module.exports = {
    handleUserLogin:handleUserLogin
}