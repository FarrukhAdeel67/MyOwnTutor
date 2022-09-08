const db = require("../../models");
/*
Functions checks if username already exists on database.
Returns user if username already taken, false otherwise,
 */
async  function UsernameExists(username){
    if(username===null || username=== undefined){
        throw new Error('No Username was passed as an argument')

    }
    const user = await db.user.findOne({
        where:{username},
    })
    if(user){
        return user;
    }
    return null;
}
// Function checks if email already exists in database
//returns user if email is already taken ,false otherwise,
async function  EmailExists(email){
    if(email===null || email=== undefined){
        throw new Error('No Username was passed as an argument')

    }
    const user = await db.user.findOne({
        where:{email},
    })
    if(user){
        return user;
    }
    return null;
}
async function CreateUser(args){
    const user = await db.user.create({
        first_name:args.first_name,
        last_name:args.last_name,
        username:args.username,
        password:args.password,
        email:args.email,
        permission_id:args.permission_id,
    });
    return user;
}


module.exports = {
    UsernameExists,
    EmailExists,
    CreateUser,
}