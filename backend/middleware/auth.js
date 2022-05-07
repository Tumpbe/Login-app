const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
    try{
        await jwt.verify(req.cookies.token, process.env.SECRET);
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({success: false, error: err});
    }
}

module.exports = {
    checkToken,
}
