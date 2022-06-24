const Owner = require('../models/Owner');
const egnService = require('./egnService');

async function addOwner(ownerData) {
    let isValidEGN = egnService.checkEgn(ownerData.EGN, new Date(ownerData.dateOfBirth), ownerData.gender);
    if(!isValidEGN.isValid) {
        throw {message: isValidEGN.message}
    }

    let searchedOwner = await Owner.findOne({
        EGN: ownerData.EGN
    })

    if(searchedOwner) {
        throw {message: `Owner with EGN ${ownerData.EGN} alredy exists in our database!`};
    }

    let ownerBirthDate = new Date(ownerData.dateOfBirth);
    ownerBirthDate.setDate(ownerBirthDate.getDate() + 1);

    let newOwnerData = {
        firstName: ownerData.firstName,
        middleName: ownerData.middleName,
        surname: ownerData.surname,
        dateOfBirth: ownerBirthDate,
        EGN: ownerData.EGN,
        gender: ownerData.gender
    };

    let newOwner = new Owner(newOwnerData);

    await newOwner.save();

    return {message: "Owner was added successfully!"};
} 

async function findOwner(EGN) {
    let searchedOwner = await Owner.findOne({
        EGN: EGN
    })
    .populate('vehicles');

    if(!searchedOwner) {
        throw {message: `Owner with EGN ${EGN} doesn't exist in our database!`};
    }
    return searchedOwner;
}

async function findOwnerById(id) {
    let owner = await Owner.findById(id)
    .populate('vehicles');

    if(!owner) {
        throw {message: `Owner with Id ${id} doesn't exist in our database!`};        
    }

    return owner;
}


module.exports = {
    addOwner,
    findOwner,
    findOwnerById
}