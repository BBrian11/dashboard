
var jwt = require('jsonwebtoken');


function generateToken(user) {
 
  if (!user) return null;

  var u = {
    userId: user.userId,
    name: user.name,
    username: user.username,
    isAdmin: user.isAdmin
  };

  const accessToken =  jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 // expira en 24 horas
  });
  const refreshToken =  jwt.sign(u, process.env.JWT_REFRESH, {
    expiresIn: "90d"
  });
  
  return {
    access_token:accessToken,
    refresh_token:refreshToken
  };
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
  getSessionStorageRefreshToken() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.refreshToken;
  }

  getSessionStorageAccessToken() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    return user?.accessToken;
  }

  updateSessionStorageAccessToken(token) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user.accessToken = token;
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    sessionStorage.removeItem("user");
  }
}
module.exports = {
  generateToken,
  TokenService,
  getCleanUser
}