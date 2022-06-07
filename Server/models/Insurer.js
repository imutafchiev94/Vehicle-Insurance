const mongoose = require('mongoose');

let InsurerSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 15,
        unique: true
    }, passwordHash: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)
            }, message: props => `${props.value} is not valid email!`
        }
    }, firstName: {
        type: String,
        required: true,
    }, lastName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Insurer', InsurerSchema);