const mongoose = require("mongoose");

const InsuranceSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    }, endDate: {
        type: Date,
        required: true,
    }, vehicleOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner"
    }, vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    }, imageUrl: {
        type: String,
        required: true
    }, totalAmount: {
        type: Number,
        required: true,
        min: 50
    }, dueAmount: {
        type: Number,
        required: true,
    }, countOfPayments: {
        type: Number,
        required: true,
        enum: {
            values: [1, 2, 3, 4, 6, 12],
            message: `{VALUE} is not supported!`
        }
    }, payments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payments"
    }], 
    isInvalid: {
        type: Boolean,
        required: true,
        default: false
    }
})


module.exports = mongoose.model('Insurance', InsuranceSchema);