const Owner = require('../models/Owner');
const egnService = require('./egnService');

async function addOwner(ownerData) {
    let isValidEGN = egnService.checkEgn(ownerData.EGN, new Date(ownerData.dateOfBirth), ownerData.gender);
    if(!isValidEGN) {
        throw {message: 'Owner\'s EGN is not valid!'}
    }

    let searchedOwner = await Owner.findOne({
        EGN: ownerData.EGN
    })

    if(searchedOwner) {
        throw {message: 'Owner with this EGN alredy exists!'};
    }

    let newOwnerData = {
        firstName: ownerData.firstName,
        middleName: ownerData.middleName,
        surname: ownerData.surname,
        dateOfBirth: ownerData.dateOfBirth,
        age: ownerData.age,
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
    });

    if(searchedOwner) {
        return searchedOwner;
    }
    throw {message: "Owner with this EGN doesn't exist in our database"};
}


module.exports = {
    addOwner,
    findOwner
}