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
    }, registrationNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 8
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }, insurance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insurance'
    }
})

module.exports = mongoose.model("Vehicle", VehicleSchema);