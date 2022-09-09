"use strict";
const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) =>{
    return  sequelize.define('user', {
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull:false,
        },
        first_name:{
            type:DataTypes.STRING,
            isAlphanumeric:true, //cant put special characters in the name.
            required: true,
            allowNull: false,
        },
        last_name:{
            type:DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        username:{
            type:DataTypes.STRING,
            required:true,
            allowNull:false,
            len:[8,20],
        },
        password:{
            type:DataTypes.STRING,
            required:true,
            allowNull:false,
            len:[8,20],
        },
        email:{
            type:DataTypes.STRING,
            required:true,
            allowNull:false,
            len:[7,100],
            isEmail:true,
        },
        permission_id:{
             //fk in permission table.
          type:DataTypes.INTEGER,
          allowNull:false,
          required:true,
        },
        updated_at:{
            type:DataTypes.DATE,
        },
        deleted_at:{
            type:DataTypes.DATE,
        },
    },
    {
        underscored:true,
        paranoid:true,
    });
}