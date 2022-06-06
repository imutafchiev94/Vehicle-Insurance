const mongoose = require('mongoose');
require('dotenv').config();

const OwnerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }, surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }, age: {
        type: Number,
        required: true,
        min: 18,
        max: 120
    }, dateOfBirth: {
        type: Date,
        required: true,
    }, gender: {
        type: String,
        required: true,
        enum: {
            values: ['Female', 'Male'],
            message: `{VALUE} is not supported`
        }
    }, EGN: {
        type: String,
        required: true,
        validate: {
           validator: function(v) {
               return /[0-9]{2}[0][0-9][0-2][0-9][0-9]{4}|[0-9]{2}[1][0-2][0-2][0-9][0-9]{4}|[0-9]{2}[0][0-9][3][0-1][0-9]{4}|[0-9]{2}[1][0-2][3][0-1][0-9]{4}|[0-1][0-9][4][0-9][0-2][0-9][0-9]{4}|[0-1][0-9][5][0-2][0-2][0-9][0-9]{4}|[0-1][0-9][4][0-9][3][0-1][0-9]{4}|[0-1][0-9][5][0-2][3][0-1][0-9]{4}|[2][0-2][4][0-9][0-2][0-9][0-9]{4}|[2][0-2][5][0-2][0-2][0-9][0-9]{4}|[2][0-2][4][0-9][3][0-1][0-9]{4}|[2][0-2][5][0-2][3][0-1][0-9]{4}/.test(v);
           },
           message: props => `${props.value} is not valid EGN!`
        }
    }
});

module.exports = mongoose.model("Owner", OwnerSchema);