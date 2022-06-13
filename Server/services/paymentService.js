const Payment = require("../models/Payment");
const Insurance = require("../models/Insurance");
const Vehicle = require('../models/Vehicle');
require('dotenv').config();

async function allPaymentsForInsurance(registrationNumber) {
  let vehicle = await Vehicle.findOne({
    registrationNumber: registrationNumber
  });

  if(!vehicle) {
    throw {message: `Vehicle with Registration Number "${registrationNumber}" doesn't exist in our database`};
  }

  let searchedInsurance = await Insurance.findOne({
    vehicle: vehicle._id,
  });
  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: searchedInsurance._id,
  }).populate("insurance");

  return payments;
}

async function allPaidPaymentsForInsurance(registrationNumber) {
  let vehicle = await Vehicle.findOne({
    registrationNumber: registrationNumber
  });

  if(!vehicle) {
    throw {message: `Vehicle with Registration Number "${registrationNumber}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicle: vehicle._id,
  });

  //TODO Fix error message for Insurance

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: searchedInsurance._id,
    isPayed: true,
  }).populate("insurance");

  return payments;
}

async function allUnpaidPaymentsForInsurance(registrationNumber) {
  let vehicle = await Vehicle.findOne({
    registrationNumber: registrationNumber
  });

  if(!vehicle) {
    throw {message: `Vehicle with Registration Number "${registrationNumber}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicle: vehicle._id,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }


  let payments = await Payment.find({
    insurance: searchedInsurance._id,
    isPayed: false,
  }).populate("insurance");

  return payments;
}

async function firstPaymentToPayForInsurance(registrationNumber) {
  let vehicle = await Vehicle.findOne({
    registrationNumber: registrationNumber
  });

  if(!vehicle) {
    throw {message: `Vehicle with Registration Number "${registrationNumber}" doesn't exist in our database`};
  }

  let searchedInsurance = await Insurance.findOne({
    vehicle: vehicle._id,
  }).populate('payments');

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }
  console.log(searchedInsurance);

  let payment = searchedInsurance.payments.filter(p => p.isPayed == false)[0];

  if (payment) {
    return payment;
  }
  throw { message: "There have nothing to pay!" };
}

async function payPaymentForInsurance(paymentId) {
  let payment = await Payment.findById(paymentId);

  if(!payment) {
    throw {message:`Payment with ID ${paymentId} doesn't exist!`}
  }
  payment.isPayed = true;

  await payment.save();

  return { message: "Payment is paid!" };
}

async function createPayment(amount, insuranceId, startDate) {
  
    let searchedInsurance = await Insurance.findById(insuranceId);

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
  allPaidPaymentsForInsurance,
  allUnpaidPaymentsForInsurance,
  firstPaymentToPayForInsurance,
  payPaymentForInsurance,
  createPayment
};
