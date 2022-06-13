const Vehicle = require("../models/Vehicle");
const Owner = require("../models/Owner");

async function addVehicle(data) {

    let owner = await Owner.findOne({
     EGN: data.ownerEGN
    });
    if(!owner) {
        throw {message: `Owner with EGN ${data.ownerEGN} doesn't exist!`};
    }

  let newVehicleData = {
    brand: data.brand,
    model: data.model,
    yearOfManufacture: data.yearOfManufacture,
    registrationNumber: data.registrationNumber,
    owner: owner,
  };

  let newVehicle = new Vehicle(newVehicleData);

  await newVehicle.save();

  owner.vehicles.push(newVehicle);
  await owner.save();

  return { message: "Vehicle was add successfully!" };
}


async function findVehicle(registrationNumber) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: registrationNumber
    });

    if(!vehicle) {
        throw { message: `Vehicle with this registration number "${registrationNumber}" doesn't exist in our database` };
    }

    return vehicle;
}

async function getVehicle(id) {
  let vehicle = await Vehicle.findById(id)
  .populate('owner');

  if(!vehicle) {
    throw {message: `Vehicle with this ID ${id} doesn't exists in our database`};
  }

  return vehicle;
}

module.exports = {
  addVehicle,
  findVehicle,
  getVehicle
};
