const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    isPaid: {
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
    }, insurance : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Insurance"
    }, dateOfPay: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model("Payments", PaymentSchema);