require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;


const userData = {
  userId: "123123",
  password: "gus",
  name: "gus",
  username: "gus",
  isAdmin: true
};


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use(function (req, res, next) {
  
  var token = req.headers['authorization'];
  if (!token) return next(); 

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; 
      next();
    }
  });
});



app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});



app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;

 
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "Username or Password is Wrong."
    });
  }

  
  const token = utils.generateToken(userData);
  
  const userObj = utils.getCleanUser(userData);
 
  return res.json({ user: userObj, token });
});



app.get('/verifyToken', function (req, res) {
  
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

 
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
   
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.post('/refresh',(req,res)=>{
  const {body} = req;
  const {refresh_token} = body;

  if(!refresh_token){
    return res.status(400).json({
      error:true,
      message:"Missing refresh token"
    });
  }

  try{
    const decodeToken = jwt.decode(refresh_token,{complete:true});
   console.log(decodeToken);

    const newToken = utils.generateToken(decodeToken);

    return res.status(201).json({
      error:false,
      token: newToken
    })

  }catch{
    return res.status(401).json({
      error: true,
      message: "Invalid refresh token"
    })
  }
})

app.listen(port, () => {
  console.log('Server started on: ' + port);
});