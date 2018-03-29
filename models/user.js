const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

/*
"geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
}
*/


// Create ninja Scheme & model
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Name field is required']
    },
    email: {
        type: String,
        required: [true, 'Email field is required']
    },
    avatar: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String, 
        required: [true, 'Password field is required']
    },
    isAdmin: {
        type: Boolean,
        default: false   
    }
}); 

UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        });
    });
});
UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err) return next(err);
 
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('user', UserSchema);

module.exports = User;