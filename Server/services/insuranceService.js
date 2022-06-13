const Insurance = require('../models/Insurance')
const Vehicle = require('../models/Vehicle');
const Owner = require('../models/Owner');
const paymentService = require('../services/paymentService');

async function createInsurance(data) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: data.vehicleRegistrationNumber
    });
    let owner = await Owner.findOne({
        EGN: data.ownerEGN
    })

    let currentDate = new Date(Date.now());

    let newInsuranceData = {
        startDate: new Date(Date.now()),
        endDate: currentDate.setFullYear(currentDate.getFullYear() + 1),
        vehicleOwner: owner,
        vehicle: vehicle,
        imageUrl: data.imageUrl,
        totalAmount: data.totalAmount,
        dueAmount: data.totalAmount,
        countOfPayments: data.countOfPayments
    }

    let newInsurance = new Insurance(newInsuranceData);

    await newInsurance.save();

    let paymentsAmount = (data.totalAmount / data.countOfPayments).toFixed(2);

    let currentDateForPayments = new Date(Date.now());
    

    for(let i = 0; i < data.countOfPayments; i++) {
        let startDateForPayment = currentDateForPayments.setMonth(currentDateForPayments.getMonth() + i);
        let payment = await paymentService.createPayment(paymentsAmount, newInsurance._id ,startDateForPayment);
        newInsurance.payments.push(payment);
    }

    await newInsurance.save();
}

async function findInsurance(registrationNumber) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: registrationNumber
      });
    
      if(!vehicle) {
        throw {message: `Vehicle with registration number "${registrationNumber}" doesn't exist in our database`};
      }
    
      let searchedInsurance = await Insurance.findOne({
        vehicle: vehicle._id,
      });
      if (!searchedInsurance) {
        throw { message: "Insurance with this Id doesn't exist!" };
      }

      return searchedInsurance;
    
}

async function getInsurance(id) {
    let insurance = await Insurance.findById(id);
    if (!insurance) {
      throw { message: "Insurance with this Id doesn't exist!" };
    }

    return insurance;
  
}

module.exports = {
createInsurance,
findInsurance,
getInsurance
}