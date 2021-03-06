const Payment = require("../models/Payment");
const Insurance = require("../models/Insurance");
require('dotenv').config();

async function allPaymentsForInsurance(id) {
  let insurance = await Insurance.findById(id);

  if(!insurance) {
    throw {message: `Insurance with Id "${id}" doesn't exist in our database`};
  }

  let payments = await Payment.find({
    insurance: insurance._id,
  });

  return payments;
}

async function firstPaymentToPayForInsurance(id) {

  let insurance = await Insurance.findById(id).populate('payments');

  if (!insurance) {
    throw { message: `Insurance with Id ${id} doesn't exist in our database!` };
  }

  let payment = insurance.payments.filter(p => p.isPaid == false)[0];

  if (payment) {
    return payment;
  }
  throw { message: "There have nothing to pay!" };
}

async function payPaymentForInsurance(paymentId) {
  let payment = await Payment.findById(paymentId)

  if(!payment) {
    throw {message:`Payment with ID ${paymentId} doesn't exist in our database!`}
  }
  
  let currentDate = new Date(Date.now());
  
  payment.isPaid = true;

  payment.dateOfPay = currentDate;

  let insurance = await Insurance.findById(payment.insurance);

  if(currentDate > payment.endDate) {
    insurance.isInvalid = true;
  }

  insurance.dueAmount -= payment.amount;

  await payment.save();

  await insurance.save();

  return { message: "Payment is paid!" };
}

async function createPayment(amount, insuranceId, startDate) {
  
    let searchedInsurance = await Insurance.findById(insuranceId);

    if (!searchedInsurance) {
        throw { message: `Insurance with Id ${insuranceId} doesn't exist in our database!` };
    }
    
    let currentDate = new Date(startDate);

    let newPaymentData = {
        isPaid: false,
        amount: amount,
        startDate: new Date(startDate),
        endDate: currentDate.setDate(currentDate.getDate() + parseInt(process.env.PERIOD_OF_PAYMENT_IN_DAYS)),
        insurance: searchedInsurance
    };

    let newPayment = new Payment(newPaymentData);

    await newPayment.save();

    return newPayment;
}

module.exports = {
  allPaymentsForInsurance,
  firstPaymentToPayForInsurance,
  payPaymentForInsurance,
  createPayment
};
