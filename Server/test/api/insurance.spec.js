process.env.NODE_ENV = 'test'

const chaiHttp = require("chai-http");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const Owner = require("../../models/Owner");
const Vehicle = require("../../models/Vehicle");
const Insurance = require("../../models/Insurance");
const Payment = require("../../models/Payment");
const { $where } = require("../../models/Payment");

chai.use(chaiHttp);

describe("Insurance workflow tests", () => {
    
    before((done) => {
        Owner.create({
            _id: '62b00fb59f1b0048c1a5aad3',
            firstName: "Jane",
            surname: "Doe",
            age: 34,
            dateOfBirth: "1990-04-30 10:28:24",
            gender: "Female",
            EGN: "9004301890",
          }, function err() {});
        Vehicle.create({
            _id: '62aae08975d551ef5c0e7161',
            brand: "BMW",
            model: "Q5",
            yearOfManufacture: 2015,
            registrationNumber: 'PB3570ET',
            owner: '62b00fb59f1b0048c1a5aad3',
        }, function err() {})
          done();
    })

  // after(async () => {
  //   let owner = await Owner.findById('62b00fb59f1b0048c1a5aad3').exec();
  //   let insurance = await Insurance.findOne({vehicleOwner: owner._id}).exec();
  //   Payment.deleteMany({insurance: insurance._id}, function (err) {});
  //   Owner.deleteOne({ EGN: "9004301890" }, function (err) {});
  //   Vehicle.deleteOne({registrationNumber: "PB3570ET"}, function (err) {});
  //   Insurance.deleteOne({vehicleOwner: '62b00fb59f1b0048c1a5aad3'}, function (err) {});
  // });

  const insurance = {
    vehicleRegistrationNumber: "PB3570ET",
    ownerEGN: '9004301890',
    imageSource: 'https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FUSION_2020.png',
    totalAmount: 186,
    countOfPayments: 6,
  };

  const invalidInsurance = {
    vehicleRegistrationNumber: "PB357CA",
    ownerEGN: '9004301890',
    imageSource: 'https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FUSION_2020.png',
    totalAmount: 186,
    countOfPayments: 6,
  };

  it("Should add insurance and return response OK", (done) => {
    chai
      .request(app)
      .post("/api/insurance/create")
      .send(insurance)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Insurance was added successfully!");
        done();
      });
  });

  it("Should get all insurances", (done) => {
    chai
      .request(app)
      .get("/api/insurance/")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
        .to.be.an('array');
        done();
      });
  });

  it("Should get error on incurance details by insurance's id with incorrect Id", (done) => {
    chai
      .request(app)
      .get("/api/insurance/62b01d3080eb5f2a8aa3eca6")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          "Insurance with Id 62b01d3080eb5f2a8aa3eca6 doesn't exist in our database!"
        );
        done();
      });
  });

 

  it("Should get error on add incurance with invalid vehicle's registration number", (done) => {
    chai
      .request(app)
      .post("/api/insurance/create")
      .send(invalidInsurance)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
            `Vehicle with registration number ${invalidInsurance.vehicleRegistrationNumber} doesn't exist in our database!`
        );
        done();
      });
  });


  it("Should get insurance by vehicle's registration number in find insurance", (done) => {
    chai
      .request(app)
      .post("/api/insurance/find")
      .send({registrationNumber: insurance.vehicleRegistrationNumber})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("totalAmount").to.equal(insurance.totalAmount);
        expect(res.body)
          .to.have.property("countOfPayments")
          .to.equal(insurance.countOfPayments);
        done();
      });
  });

  it("Should get error from find insurance by invalid vehicle's registration number", (done) => {
    chai
      .request(app)
      .post("/api/insurance/find")
      .send({registrationNumber: invalidInsurance.vehicleRegistrationNumber})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          `Vehicle with registration number ${invalidInsurance.vehicleRegistrationNumber} doesn't exist in our database!`
        );
        done();
      });
  });
});

describe("Get Insurance Details", () => {
  let insurance;
  before(async () => {
    insurance = await Insurance.findOne({Vehicle: '62aae08975d551ef5c0e7161'});
  })

  it("Should get insurance details by insurance's id with correct Id", (done) => {
    chai
      .request(app)
      .get(`/api/insurance/${insurance._id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal(`${insurance._id}`);
        expect(res.body).to.have.property("vehicleOwner").to.have.property('_id').to.be.equal("62b00fb59f1b0048c1a5aad3");
        expect(res.body).to.have.property("vehicle").to.have.property('_id').to.be.equal("62aae08975d551ef5c0e7161");
        done();
      });
  });
})