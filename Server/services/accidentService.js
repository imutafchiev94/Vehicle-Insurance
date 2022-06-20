const cloudinary = require('cloudinary').v2;
const egnService = require('./egnService');
const paymentService = require('./paymentService');
const Accident = require('../models/Accident');
const Vehicle = require('../models/Vehicle');
const Insurance = require('../models/Insurance');
const cloudinaryConfig = require('../config/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);

async function addAccident(data) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: data.vehicleRegistrationNumber
    });

    if(!vehicle) {
        throw {message: `Vehicle with registration number ${data.vehicleRegistrationNumber} doesn't exist in our database!`}
    }

    let insurance = await Insurance.findOne({
        vehicle: vehicle._id
    }).populate('payments');

    if(!insurance) {
        throw {message: `Vehicle with registration number ${data.vehicleRegistrationNumber} doesn't have insurance!`}
    }

    let lastPaymentToPay = await paymentService.firstPaymentToPayForInsurance(insurance._id);

    if(insurance.startDate > new Date(data.accidentDate) || insurance.endDate < new Date(data.accidentDate)) {
        throw {message: `This vehicle doesn't have insurance for date ${data.accidentDate}`}
    };

    if(lastPaymentToPay.endDate < new Date(data.accidentDate)) {
        throw {message: `This vehicle doesn't have insurance because of unpaid payments!`}
    }

    let isValidEGN = egnService.checkEgn(data.driverEGN, new Date(data.driverDateOfBirth), data.driverGender);
    if(!isValidEGN) {
        throw {message: "Drivers's EGN is not valid!"}
    }


    let newAccidentData = {
        vehicle: vehicle,
        insurance: insurance,
        driverFirstName: data.driverFirstName,
        driverMiddleName: data.driverMiddleName,
        driverSurname: data.driverSurname,
        driverEGN: data.driverEGN,
        dateOfAccident: data.accidentDate,
        imageUrl: '',
        description: data.description
    };

    let image = data.imageSource;

    
    await cloudinary.uploader.upload(image, {folder: 'Vehicle Insurance'})
    .then(function(file) {
      newAccidentData.imageUrl = file.url})
    .catch(function(err) {throw err});

    let newAccident = new Accident(newAccidentData);

    await newAccident.save();

    return {message: "Accident was added successfully!"};
};


async function getAllAccidents() {
    let accidents = await Accident.find().populate('vehicle');

    if(accidents.length < 1) {
        throw {message: "There have no accidents!"}
    }

    return accidents;
};

async function getAccident(id) {
    let accident = await Accident.findById(id)
    .populate('vehicle')
    .populate('insurance');

    if(!accident) {
        throw {message: `Accident with Id ${id} doesn't exist in our database!`}
    }

    return accident;
}

async function findAccident(registrationNumber) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: registrationNumber
    });

    if(!vehicle) {
        throw {message: `Vehicle with registration number ${registrationNumber} doesn't exist in our database!`}
    }

    let accident = await Accident.findOne({
        vehicle: vehicle._id
    });

    if(!accident) {
        throw {message: `Accident with vehicle with registration number ${registrationNumber} doesn't exist in our database!`}
    }

    return accident;
}

module.exports = {
    addAccident,
    getAllAccidents,
    getAccident,
    findAccident
}