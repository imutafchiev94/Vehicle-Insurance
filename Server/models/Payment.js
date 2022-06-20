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

PaymentSchema.pre('remove', function (next) {
    let payment = this;
    payment.model('Insurance').update(
        {
            payments: {$in: payments.insurances}
        }, {
            $pull: {payment: payment._id}
        }, {multy: true},
        next
    );
});

module.exports = mongoose.model("Payments", PaymentSchema);