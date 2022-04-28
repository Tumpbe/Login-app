const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { 
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
        },
        password: { 
            type: String,
            required: true,
            minLength: 10,
            maxLength: 100,
            set: (password) => bcrypt.hashSync(password, 10), // Bcrypt used to crypt with a salt value of 10
        },
    },
    { timestamps: true, 
      toJSON: {
        versionKey: false,
        transform: (_, ret) => {
            const { password, _id, ...user } = ret;
            return { id: _id, ...user };
        },
      },
    },
)

User.methods.verifyPassword = async function (password) {
    const correctPassword = await bcrypt.compare(password, this.password);
    if (correctPassword) return true;
    return false;
  };

module.exports = mongoose.model('users', User);
