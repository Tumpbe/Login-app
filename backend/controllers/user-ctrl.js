const { restart } = require('nodemon');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


const createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({success: false, error: "Email and password required!"});

    try {
        const user = new User({email, password});

        await user.save(); // Crypting with salt of 10 done in schema

        return res.status(200).json({success: true, payload: user.toJSON()});
    } catch(err) {
        console.log(err);
        return res.status(500).json({success: false, error: err});
    }
}

const deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }

        return res.status(200).json({ success: true, data: user });
    }).catch(err => console.log(err));
}

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).exec();
        
        if(!user) return res.status(404).json({success: false, error: "User not found!"});

        return res.status(200).json({success: true, payload: user.toJSON()});
    } catch (err) {
        return res.status(500).json({success: false, error: err});
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({success: false, error: "Email and password required!"});

    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if(!user) return res.status(404).json({success: false, error: "User not found, check email!"});

        const success = await user.verifyPassword(password);

        if(!success){
            return res.status(401).json({success: false, error: "Auth failure check password!"});
        }
        // Auth success
        
        // Make JSON web token for user
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '24h' });
        res.cookie('token', token);
        
        return res.status(200).json({success: true, payload: user.toJSON()});
    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, error: err});
    }
}

const changePassword = async (req, res) => {
    try{
        
    } catch (err) {
        
    }
}

module.exports = {
    createUser,
    deleteUser,
    getUserById,
    userLogin,
    changePassword
}
