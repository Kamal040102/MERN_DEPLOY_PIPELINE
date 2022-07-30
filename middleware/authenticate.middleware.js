const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const Authenticate = async (req,res,next) => {
    try{
        const token = req.cookies.jwtoken;
        const verify = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verify._id, "tokens.token": token})

        if(!rootUser){
            res.status(500).json({response:"Internal Server Error"})
        }

        req.userId = rootUser._id;
        req.rootUser = rootUser;
        req.token = token;

        next();
    }
    catch (err) {
        res.status(401).json({response:"Unauthorized Access."})
        console.log(err)
    }
}

module.exports = Authenticate;