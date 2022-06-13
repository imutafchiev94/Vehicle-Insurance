const cloudinary = require('cloudinary').v2;

const Insurance = require('../models/Insurance')
const Vehicle = require('../models/Vehicle');
const Owner = require('../models/Owner');
const paymentService = require('../services/paymentService');
const cloudinaryConfig = require('../config/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);


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
        imageUrl: '',
        totalAmount: data.totalAmount,
        dueAmount: data.totalAmount,
        countOfPayments: data.countOfPayments
    }


    await cloudinary.uploader.upload(data.imageSource, {resource_type: 'image'})
    .then(function(file) {newInsuranceData.imageUrl = file.url})
    .catch(function(err) {console.log(err)});

   

    let newInsurance = new Insurance(newInsuranceData);

    

    await newInsurance.save();

    let paymentsAmount = (data.totalAmount / data.countOfPayments).toFixed(2);


    
    

    for(let i = 0; i < data.countOfPayments; i++) {
      let currentDateForPayments = new Date(Date.now());
        let startDateForPayment =  new Date(currentDateForPayments.setMonth(currentDateForPayments.getMonth() + i));
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