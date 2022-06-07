const Vehicle = require("../models/Vehicle");
const Owner = require("../models/Owner");

async function addVehicle(data, ownerId) {

    let owner = await Owner.findById(ownerId);
    if(!owner) {
        throw {message: `Owner with ID ${ownerId} doesn't exist!`};
    }

  let newVehicleData = {
    brand: data.brand,
    model: data.model,
    yearOfManufacture: data.yearOfManufacture,
    registrationNumber: data.registrationNumber,
  };

  let newVehicle = new Vehicle(newVehicleData);

  await newVehicle.save();

  owner.vehicles.push(newVehicle);
  await owner.save();

  return { message: "Vehicle was add successfully!" };
}

async function findAllVehiclesOfOwner(EGN) {
  let owner = await Owner.findOne({
    EGN: EGN,
  })
  .populate('vehicles');

  if (!owner) {
    throw { message: `Owner with EGN "${EGN}" doesn't exist in our database` };
  }

  let vehicles = owner.vehicles;

  return vehicles;
};

async function findVehicle(registrationNumber) {
    let vehicle = await Vehicle.findOne({
        registrationNumber: registrationNumber
    });

    if(!vehicle) {
        throw { message: `Vehicle with this registration number "${registrationNumber}" doesn't exist in our database` };
    }

    return vehicle;
}

module.exports = {
  addVehicle,
  findAllVehiclesOfOwner,
  findVehicle
};
