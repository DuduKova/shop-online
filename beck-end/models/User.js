const mongoose = require('../db/mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const secretKey = 'dudukovalski';
const validator = require('validator');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    firstName: {type: String, required: true, max: 30, trim: true , lowercase: true},
    lastName: {type: String, required: true, max: 30, trim: true , lowercase: true},
    email: {
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
        required: [true, "can't be blank"],
        index: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {type: String, required: true, minlength: 6},
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    city: {type: String, trim: true, required: true , lowercase: true},
    street: {type: String, trim: true, required: true , lowercase: true},
    isAdmin: {type: Boolean, default: false, required: true}
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.generateAuthToken = function () {
    const access = 'auth';
    const token = jwt.sign({_id: this._id.toString('hex'), access}, secretKey).toString();
    this.tokens = this.tokens.concat([{access, token}]);

    return this.save().then(() => {
        return token;
    })
};

UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    return _.pick(userObject, ['_id', 'email', 'firstName', 'lastName', 'city', 'street','isAdmin']);
};

UserSchema.methods.removeToken = function (token) {
    return this.update({
        $pull: {
            tokens: {token}
        }
    })
};


UserSchema.statics.findByToken = function (token) {
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey)
    } catch (e) {
        return Promise.reject();
    }
    return this.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};

UserSchema.statics.findByCredentials = function(email, password) {
return this.findOne({email}).then((user)=> {
    if (!user) {
        return Promise.reject();
    }
    return new Promise((resolve, reject) => {
       bcrypt.compare(password , user.password , (err , res) => {
           if (res) {
               resolve(user);
           } else {
               reject();
           }
       })

    })
})
};

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash;
                next();
            })
        });

    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
