const Payment = require("../models/Payment");
const Insurance = require("../models/Insurance");
require('dotenv').config();

async function allPaymentsForInsurance(insuranceId) {
  let searchedInsurance = await Insurance.findById({
    _id: insuranceId,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
  }).populate("insurance");

  return payments;
}

async function allPaidPaymentsForInsurance(insuranceId) {
  let searchedInsurance = await Insurance.findById({
    _id: insuranceId,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
    isPayed: true,
  }).populate("insurance");

  return payments;
}

async function allNotPaidPaymentsForInsurance(insuranceId) {
  let searchedInsurance = await Insurance.findById({
    _id: insuranceId,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
    isPayed: false,
  }).populate("insurance");

  return payments;
}

async function firstPaymentToPayForInsurance(insuranceId) {
  let searchedInsurance = await Insurance.findById({
    _id: insuranceId,
  }).populate("payments");

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payment = searchedInsurance.payments.find((p) => p.isPayed == false);

  if (payment) {
    return payment;
  }
  throw { message: "There have nothing to pay!" };
}

async function payPaymentForInsurance(insuranceId) {
  let payment = await firstPaymentToPayForInsurance(insuranceId);

  payment.isPayed = true;

  await payment.save();

  return { message: "Payment is paid!" };
}

async function createPayment(amount, insuranceId, startDate) {
    let searchedInsurance = await Insurance.findById({
        _id: insuranceId,
    });

    if (!searchedInsurance) {
        throw { message: "Insurance with this Id doesn't exist!" };
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
  allPaymentsForInsurance,
  allNotPaidPaymentsForInsurance,
  firstPaymentToPayForInsurance,
  payPaymentForInsurance,
  createPayment
};
