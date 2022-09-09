const User = require("../Services/Users/User_Service");
module.exports = (req, res, next) => {
  const user_id = req.user ? req.user : null;
  if (user_id) {
    User.FindUser(user_id).then((user) => {
      if (user) {
        req.user_permission = user.user_permission;
      }
    });
  } else {
    next();
  }
};
