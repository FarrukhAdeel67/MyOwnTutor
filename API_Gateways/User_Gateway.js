//Gateway for user routes
const express = require("express");
const router = express.Router();
const asyncHandler = require("../Helpers/asyncHandler");
const validate = require("validate.js");
//services
const User = require('../Services/Users/User_Service');

router.post('/', asyncHandler(async (req, res)=>{
    const constraints ={
        first_name:{
            presence:true,
            length:{maximum:50},
        },
        last_name:{
            presence:true,
            length:{maximum:50},
        },
        username:{
            presence:true,
            length:{minimum:8,maximum:20},
        },
        password:{
            presence:true,
            length:{minimum:8,maximum:20},
        },
        email:{
            presence:true,
            email:true,
        },

    };
    const {first_name, last_name, username, password,email} = req.body;
    const validation = validate({first_name, last_name, username, password,email}, constraints);
    if(validation){
       return  res.status(400).json({error:validation});
    }
    //forward user service
    const found_user = await User.ValidateUserExists(username, email);
    if(found_user) {
        if(username===found_user.username){
            return res.status(400).json({error: `Username ${username} is already taken`})
        }
        if(email===found_user.email){
            return res.status(400).json({error: ` email ${email} is already taken`})
        }

    }
}));
module.exports = router;

