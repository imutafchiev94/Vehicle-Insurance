const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40
    }, model: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60
    }, yearOfManufacture : {
        type: Number,
        required: true,
        min: 1930,
        max: 2022,
    }, registrationeNumber: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 8
    }
})

module.exports = mongoose.model("Vehicle", VehicleSchema);