const { restart } = require('nodemon');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');


createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({success: false, error: "Email and password required!"});

    try {
        const user = new User({email, password});

        await user.save(); // Crypting with salt of 10 done in schema

        return res.status(200).json({success: true, payload: user});
    } catch(err) {
        return res.status(500).json({success: false, error: err});
    }
}

updateUser = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            });
        }
        user.name = body.name;
        user.time = body.time;
        user.rating = body.rating;
        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: user._id,
                    message: 'User updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'User not updated!',
                })
            });
    });
}

deleteUser = async (req, res) => {
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

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
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

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
}

checkAuth = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({success: false, error: "Email and password required!"});

    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        if(!user) return res.status(404).json({success: false, error: "User not found, check email!"});

        if(!user.verifyPassword(password)){
            return res.status(401).json({success: false, error: "Auth failure check password!"});
        }
        // Auth success

        // Make JSON web token for user
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '24h' });
        res.cookie.token = token;

        return res.status(200).json({success: true, payload: user});

    } catch(err){
        return res.status(500).json({success: false, error: err});
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getUserById,
    checkAuth,
}
