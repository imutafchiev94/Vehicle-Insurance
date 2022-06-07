const Payment = require("../models/Payment");
const Insurance = require("../models/Insurance");
const Owner = require('../models/Owner');
require('dotenv').config();

async function allPaymentsForInsurance(EGN) {
  let owner = await Owner.findOne({
    EGN: EGN
  });

  if(!owner) {
    throw {message: `Owner with EGN "${EGN}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicleOwner: owner._id,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
  }).populate("insurance");

  return payments;
}

async function allPaidPaymentsForInsurance(EGN) {
  let owner = await Owner.findOne({
    EGN: EGN
  });

  if(!owner) {
    throw {message: `Owner with EGN "${EGN}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicleOwner: owner._id,
  });

  //TODO Fix error message for Insurance

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }
  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
    isPayed: true,
  }).populate("insurance");

  return payments;
}

async function allUnpaidPaymentsForInsurance(EGN) {
  let owner = await Owner.findOne({
    EGN: EGN
  });

  if(!owner) {
    throw {message: `Owner with EGN "${EGN}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicleOwner: owner._id,
  });

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

  let payments = await Payment.find({
    insurance: insuranceId,
    isPayed: false,
  }).populate("insurance");

  return payments;
}

async function firstPaymentToPayForInsurance(EGN) {
  let owner = await Owner.findOne({
    EGN: EGN
  });

  if(!owner) {
    throw {message: `Owner with EGN "${EGN}" doesn't exist in our database`};
  }
  
  let searchedInsurance = await Insurance.findOne({
    vehicleOwner: owner._id,
  }).populate('payments');

  if (!searchedInsurance) {
    throw { message: "Insurance with this Id doesn't exist!" };
  }

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
  allPaidPaymentsForInsurance,
  allUnpaidPaymentsForInsurance,
  firstPaymentToPayForInsurance,
  payPaymentForInsurance,
  createPayment
};
