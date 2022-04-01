import db from "../models/index";
import CRUDService from "../services/CRUDService"

let getHomePage = async (req, res) =>{
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error)
    }
}

let getCRUD = (req , res)=>{
    return res.render('CRUD.ejs');
}

let postCRUD = async (req , res) =>{
    await CRUDService.createNewUser(req.body);
    return res.send('hello')
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD:postCRUD
}