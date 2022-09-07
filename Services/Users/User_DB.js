const db = require("../../models");
/*
Functions checks if username already exists on database.
Returns ture if username already taken, false otherwise,
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
    return false;
}

module.exports = {
    UsernameExists,
}