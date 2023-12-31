const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : String,
        required : true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    empid: {
        type: Number,
        required: true
    },
    refreshToken : String
});

module.exports = mongoose.model('User', userSchema);