const mongoose = require('mongoose');

const AccidentSchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    }, driverFirstName: {
        type: String,
        required: true,
        minlength: 3
    }, driverMiddleName: {
        type: String,
        required: false
    }, driverSurname: {
        type: String,
        required: true,
        minlength: 3
    }, driverEGN: {
        type: String,
        required: true,
        unique: true,
        validate: {
           validator: function(v) {
               return /[0-9]{2}[0][0-9][0-2][0-9][0-9]{4}|[0-9]{2}[1][0-2][0-2][0-9][0-9]{4}|[0-9]{2}[0][0-9][3][0-1][0-9]{4}|[0-9]{2}[1][0-2][3][0-1][0-9]{4}|[0-1][0-9][4][0-9][0-2][0-9][0-9]{4}|[0-1][0-9][5][0-2][0-2][0-9][0-9]{4}|[0-1][0-9][4][0-9][3][0-1][0-9]{4}|[0-1][0-9][5][0-2][3][0-1][0-9]{4}|[2][0-2][4][0-9][0-2][0-9][0-9]{4}|[2][0-2][5][0-2][0-2][0-9][0-9]{4}|[2][0-2][4][0-9][3][0-1][0-9]{4}|[2][0-2][5][0-2][3][0-1][0-9]{4}/.test(v);
           }, message: props => `${props.value} is not valid EGN!`
        }
    }, dateOfAccident: {
        type: Date,
        required: true,
    }, imageUrl: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true,
        minlength: 50
    }, insurance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insurance'
    }
});

module.exports = mongoose.model("Accident", AccidentSchema);