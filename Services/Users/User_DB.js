const db = require("../../models");
const { formatArgs } = require("debug");

/*
Functions checks if username already exists on database.
Returns user if username already taken, false otherwise,
 */
async function UsernameExists(username) {
  if (username === null || username === undefined) {
    throw new Error("No Username was passed as an argument");
  }
  const user = await db.user.findOne({
    where: { username },
  });
  if (user) {
    return user;
  }
  return null;
}

/*
* Function for finding a user based on their user id.
* @args
-user_id:string,
*
* */
async function FindUserByUserId(user_id) {
  if (!user_id) throw new Error("Invalid argument: user_id");
  const user = await db.user.findOne({
    where: { id: user_id },
  });
  if (user) {
    return user;
  }
  return null;
}

/*Function checks if email already exists in database
returns user if email is already taken ,false otherwise,*/
async function EmailExists(email) {
  if (email === null || email === undefined) {
    throw new Error("No Email  was passed as an argument");
  }
  const user = await db.user.findOne({
    where: { email },
  });
  if (user) {
    return user;
  }
  return null;
}

async function CreateUser(args) {
  if (!args.username) throw new Error("Invalid argument: username");
  if (!args.first_name) throw new Error("Invalid argument: first_name");
  if (!args.last_name) throw new Error("Invalid argument: last_name");
  if (!args.password) throw new Error("Invalid argument: password");
  if (!args.email) throw new Error("Invalid argument: email");
  if (!args.permission_id) args.permission_id = 2;
  const permission = await _ValidatePermissionId(args.permission_id);
  if (!permission) throw new Error("Invalid argument: permission_id not found");
  const user = await db.user.create({
    first_name: args.first_name,
    last_name: args.last_name,
    username: args.username,
    password: args.password,
    email: args.email,
    permission_id: args.permission_id,
  });
  return user;
}
//private function starts with uderscore _ sign,
async function _ValidatePermissionId(permission_id) {
  const permissions = await db.permission.findOne({
    where: {
      id: permission_id,
    },
  });
  if (permissions) {
    return permissions;
  }
  return null;
}

module.exports = {
  UsernameExists,
  EmailExists,
  CreateUser,
  FindUserByUserId,
};
