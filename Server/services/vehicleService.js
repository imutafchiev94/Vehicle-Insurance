const Vehicle = require('../models/Vehicle');

async function addVehicle(data) {
    let newVehicleData = {
        brand: data.brand,
        model: data.model,
        yearOfManufacture: data.yearOfManufacture,
        registrationNumber: data.registrationNumber
    }

    let newVehicle = new Vehicle(newVehicleData);

    await newVehicle.save();

    return {message: 'Vehicle was add successfully!'};
}


module.exports = {
    addVehicle
}