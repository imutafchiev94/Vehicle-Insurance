const chaiHttp = require("chai-http");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const Owner = require("../../models/Owner");
const Vehicle = require("../../models/Vehicle");
const Insurance = require("../../models/Insurance");
const Accident = require("../../models/Accident");

chai.use(chaiHttp);

describe("Accident workflow tests", () => {

    
    before((done) => {
        let currentDate = new Date(Date.now());
        let endDate = new Date(Date.now());
        currentDate.setDate(currentDate.getDate() - 2);
        endDate.setDate(endDate.getDate() - 2);
        Owner.create({
            _id: '62b03574732c010f9547a902',
            firstName: "Jane",
            surname: "Doe",
            age: 34,
            dateOfBirth: "1990-04-30 10:28:24",
            gender: "Female",
            EGN: "9004301890",
          }, function err() {});
        Vehicle.create({
            _id: '62b035a3e9a94a35c5a0e99c',
            brand: "BMW",
            model: "Q5",
            yearOfManufacture: 2015,
            registrationNumber: 'PB3570ET',
            owner: '62b03574732c010f9547a902',
        }, function err() {})
        Insurance.create({
            _id: '62b00fb59f1b0048c1a5aad3',
            startDate: currentDate,
            endDate: endDate.setFullYear(endDate.getFullYear() + 1),
            vehicleOwner: '62b03574732c010f9547a902',
            vehicle: '62b035a3e9a94a35c5a0e99c',
            imageUrl: 'https://res.cloudinary.com/hellios94/image/upload/v1655392377/Vehicle%20Insurance/sea1frm8ofmqlfkpq1v4.jpg',
            totalAmount: '186',
            dueAmount: '186',
            countOfPayments: 6,
            payments: ['62ab3cd0efa5ca78a7bab408', '62ab3cd0efa5ca78a7bab40c', '62ab3cd0efa5ca78a7bab410', '62ab3cd0efa5ca78a7bab414', '62ab3cd0efa5ca78a7bab418', '62ab3cd0efa5ca78a7bab41c']
          }, function err() {});
          done();
    })

  after((done) => {
    Owner.deleteOne({ EGN: "9004301890" }, function (err) {});
    Vehicle.deleteOne({registrationNumber: "PB3570ET"}, function (err) {});
    Insurance.deleteOne({vehicleOwner: '62b00fb59f1b0048c1a5aad3'}, function (err) {});
    Accident.deleteOne({driverEGN: '0145258942'}, function (err) {});
    done();
  });

  
  let currentDate = new Date(Date.now());
  currentDate.setDate(currentDate.getDate() + 1);
  const accident = {
    vehicleRegistrationNumber: "PB3570ET",
    driverFirstName: 'John',
    driverSurname: 'Doe',
    driverEGN: '0145258942',
    driverDateOfBirth: '2001-05-25 10:28:24',
    driverGender: 'Male',
    imageSource: 'https://heartspringhealth.com/wp-content/uploads/2014/05/cars-c.jpg',
    accidentDate: currentDate,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ultrices mauris, vestibulum venenatis massa. Suspendisse metus turpis, mattis eget augue a, dapibus feugiat leo. Integer bibendum imperdiet lorem. Maecenas maximus, mauris nec cursus scelerisque, nibh mauris tempus felis, a laoreet nulla urna dictum ante. Nulla ut sodales quam, eu tempus nisl. Mauris lobortis leo ornare risus dignissim, non dictum est ultrices. Praesent hendrerit massa quis tortor pretium efficitur. Fusce blandit libero est, a congue ante tempor ut. Proin semper sit amet dolor non ullamcorper. Sed condimentum ipsum non mi pulvinar scelerisque. Cras fringilla nunc et justo blandit ullamcorper. Integer at eros quis elit porttitor dictum.',
  };

  const invalidAccident = {
    vehicleRegistrationNumber: "PB3570C",
    driverFirstName: 'John',
    driverSurname: 'Doe',
    driverEGN: '0145258942',
    driverDateOfBirth: '2001-05-25 10:28:24',
    driverGender: 'Male',
    imageSource: 'https://heartspringhealth.com/wp-content/uploads/2014/05/cars-c.jpg',
    accidentDate: currentDate,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ultrices mauris, vestibulum venenatis massa. Suspendisse metus turpis, mattis eget augue a, dapibus feugiat leo. Integer bibendum imperdiet lorem. Maecenas maximus, mauris nec cursus scelerisque, nibh mauris tempus felis, a laoreet nulla urna dictum ante. Nulla ut sodales quam, eu tempus nisl. Mauris lobortis leo ornare risus dignissim, non dictum est ultrices. Praesent hendrerit massa quis tortor pretium efficitur. Fusce blandit libero est, a congue ante tempor ut. Proin semper sit amet dolor non ullamcorper. Sed condimentum ipsum non mi pulvinar scelerisque. Cras fringilla nunc et justo blandit ullamcorper. Integer at eros quis elit porttitor dictum.',
  };

  const invalidAccidentEGN = {
    vehicleRegistrationNumber: "PB3570ET",
    driverFirstName: 'John',
    driverSurname: 'Doe',
    driverEGN: '0145258944',
    driverDateOfBirth: '2001-05-25 10:28:24',
    driverGender: 'Male',
    imageSource: 'https://heartspringhealth.com/wp-content/uploads/2014/05/cars-c.jpg',
    accidentDate: currentDate,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut ultrices mauris, vestibulum venenatis massa. Suspendisse metus turpis, mattis eget augue a, dapibus feugiat leo. Integer bibendum imperdiet lorem. Maecenas maximus, mauris nec cursus scelerisque, nibh mauris tempus felis, a laoreet nulla urna dictum ante. Nulla ut sodales quam, eu tempus nisl. Mauris lobortis leo ornare risus dignissim, non dictum est ultrices. Praesent hendrerit massa quis tortor pretium efficitur. Fusce blandit libero est, a congue ante tempor ut. Proin semper sit amet dolor non ullamcorper. Sed condimentum ipsum non mi pulvinar scelerisque. Cras fringilla nunc et justo blandit ullamcorper. Integer at eros quis elit porttitor dictum.',
  };

    it("Should get all accidents", (done) => {
    chai
      .request(app)
      .get("/api/accident/")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
        .to.be.an('array');
        done();
      });
  });

    it("Should add accident and return response OK", (done) => {
        chai
          .request(app)
          .post("/api/accident/add")
          .send(accident)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body)
              .to.have.property("message")
              .to.equal("Accident was added successfully!");
            done();
          });
      });

    it("Should get error on add accident with invalid vehicle's registration number", (done) => {
    chai
      .request(app)
      .post("/api/accident/add")
      .send(invalidAccident)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
            `Vehicle with registration number ${invalidAccident.vehicleRegistrationNumber} doesn't exist in our database!`
        );
        done();
      });
  });

    it("Should get error on add accident with invalid driver's EGN", (done) => {
    chai
      .request(app)
      .post("/api/accident/add")
      .send(invalidAccidentEGN)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
            "Drivers's EGN is not valid!"
        );
        done();
      });
  });


  it("Should get accident details by accident's id with correct Id", (done) => {
    chai
      .request(app)
      .get("/api/accident/62b07150bed05e7f29d42f19")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal("62b07150bed05e7f29d42f19");
        expect(res.body).to.have.property("insurance").to.have.property('_id').to.be.equal("62ab3cd0efa5ca78a7bab405");
        expect(res.body).to.have.property("vehicle").to.have.property('_id').to.be.equal("62aae08975d551ef5c0e7161");
        done();
      });
  });

  it("Should get error on accident details by accidents's id with incorrect Id", (done) => {
    chai
      .request(app)
      .get("/api/accident/62b07150bed05e7f29d42f15")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          "Accident with Id 62b07150bed05e7f29d42f15 doesn't exist in our database!"
        );
        done();
      });
  });


  it("Should get accident by vehicle's registration number in find accident", (done) => {
    chai
      .request(app)
      .post("/api/accident/find")
      .send(accident)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("driverFirstName").to.equal(accident.driverFirstName);
        expect(res.body).to.have.property("driverEGN").to.equal(accident.driverEGN);
        done();
      });
  });

  it("Should get error from find accident by invalid vehicle's registration number", (done) => {
    chai
      .request(app)
      .post("/api/accident/find")
      .send(invalidAccident)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          `Vehicle with registration number ${invalidAccident.vehicleRegistrationNumber} doesn't exist in our database!`
        );
        done();
      });
  });
});
