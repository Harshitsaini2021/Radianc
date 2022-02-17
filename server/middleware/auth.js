const { OAuth2Client } = require('google-auth-library')
const jwt = require("jsonwebtoken");
const user = require('../models/signup');
require("dotenv").config();



async function auth(req,res,next) {
    
try {
    const client = new OAuth2Client(process.env.GCLIENT_ID)
    let token = req.cookies.jwt;
    let gtoken = req.cookies.gtoken;
    let verToken = jwt.verify(token,process.env.SECRET_KEY);
    
    console.log("data");
    let mainUser = await user.findOne({_id:verToken,"tokens.token":token});
    if (!mainUser && !data) {
        throw new Error("User Not Found")
    }
    req.token = token;
    req.rootUser = mainUser;
    req.googleUser = data;
    req.userId = mainUser._id;

    next();


} catch (error) {
    res.status(400).send(error)
}

}

module.exports = auth
