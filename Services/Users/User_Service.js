const {
  UsernameExists,
  EmailExists,
  CreateUser,
  FindUserByUserId,
} = require("./User_DB");

async function ValidateUserExists(username, email) {
  if (!username || !email) {
    throw new Error("Arguments must be username and email");
  }
  let taken_valid_username = null;
  let taken_valid_email = null;

  if (username) {
    taken_valid_username = await UsernameExists(username);
  }
  if (email) {
    taken_valid_email = await EmailExists(email);
  }
  if (taken_valid_username) return taken_valid_username;
  if (taken_valid_email) return taken_valid_email;
  return null;
}
async function CreateNewUser(args) {
  return await CreateUser(args);
}
async function FindUser(user_id) {
  return FindUserByUserId(user_id);
}

module.exports = {
  ValidateUserExists,
  CreateNewUser,
  FindUser,
};
