
var jwt = require('jsonwebtoken');


function generateToken(user) {
 
  if (!user) return null;

  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expira en 24 horas
  });
}


function getCleanUser(user) {
  if (!user) return null;

  return {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };
}
class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}
module.exports = {
  generateToken,
  TokenService,
  getCleanUser
}