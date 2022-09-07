//Gateway for user routes
const express = require("express");
const router = express.Router();
const asyncHandler = require("../Helpers/asyncHandler");
const validate = require("validate.js");

router.post('/', asyncHandler((req, res)=>{
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
}));
module.exports = router;

