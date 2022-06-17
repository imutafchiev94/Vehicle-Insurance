const chaiHttp = require("chai-http");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const Owner = require("../../models/Owner");
const Vehicle = require("../../models/Vehicle");

chai.use(chaiHttp);

describe("Vehicle workflow tests", () => {

    
    before((done) => {
        Owner.create({
            firstName: "Jane",
            surname: "Doe",
            age: 34,
            dateOfBirth: "1990-04-30 10:28:24",
            gender: "Female",
            EGN: "9004301890",
          }, function err() {});
          done();
    })

  after((done) => {
    Owner.deleteOne({ EGN: "9004301890" }, function (err) {});
    Vehicle.deleteOne({registrationNumber: "PB3570ET"}, function (err) {});
    done();
  });

  const vehicle = {
    brand: "BMW",
    model: "Q5",
    yearOfManufacture: 2015,
    registrationNumber: 'PB3570ET',
    ownerEGN: '9004301890',
  };

  const invalidVehicle = {
    brand: "BMW",
    model: "Q5",
    yearOfManufacture: 2015,
    registrationNumber: 'PB357CA',
    ownerEGN: '9004301892',
  };

  it("Should get vehicle details by vehicle's id with correct Id", (done) => {
    chai
      .request(app)
      .get("/api/vehicle/62a73b15c13f8d0680bc5006")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal("62a73b15c13f8d0680bc5006");
        expect(res.body).to.have.property("registrationNumber").to.equal("PB4054CA");
        done();
      });
  });

  it("Should get error on vehicle details by vehicle's id with incorrect Id", (done) => {
    chai
      .request(app)
      .get("/api/vehicle/62a73b15c13f8d0680bc5004")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          "Vehicle with Id 62a73b15c13f8d0680bc5004 doesn't exist in our database!"
        );
        done();
      });
  });

  it("Should add vehicle and return response OK", (done) => {
    chai
      .request(app)
      .post("/api/vehicle/add")
      .send(vehicle)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Vehicle was added successfully!");
        done();
      });
  });

  it("Should get error on add vehicle with invalid owner's EGN", (done) => {
    chai
      .request(app)
      .post("/api/vehicle/add")
      .send(invalidVehicle)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
            `Owner with EGN ${invalidVehicle.ownerEGN} doesn't exist!`
        );
        done();
      });
  });


  it("Should get vehicle by registration number in find Vehicle", (done) => {
    chai
      .request(app)
      .post("/api/vehicle/find")
      .send(vehicle)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("registrationNumber").to.equal(vehicle.registrationNumber);
        expect(res.body)
          .to.have.property("brand")
          .to.equal(vehicle.brand);
        expect(res.body).to.have.property("model").to.equal(vehicle.model);
        done();
      });
  });

  it("Should get error from find vehicle by not registration number", (done) => {
    chai
      .request(app)
      .post("/api/vehicle/find")
      .send(invalidVehicle)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          `Vehicle with registration number ${invalidVehicle.registrationNumber} doesn't exist in our database!`
        );
        done();
      });
  });
});
