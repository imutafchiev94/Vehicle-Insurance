const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    isPayed: {
        type: Boolean,
        required: true,
        default: false
    }, amount: {
        type: Number,
        required: true
    }, startDate: {
        type: Date,
        required: true,
        default: Date.now()
    }, endDate: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model("Payment", PaymentSchema);