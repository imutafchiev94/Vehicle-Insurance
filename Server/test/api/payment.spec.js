const chaiHttp = require("chai-http");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const Insurance = require("../../models/Insurance");
const Owner = require("../../models/Owner");
const Vehicle = require("../../models/Vehicle");
const Payment = require("../../models/Payment");

chai.use(chaiHttp);

describe("Payments workflow tests", () => {

    
    before((done) => {
        let currentDate = new Date(Date.now());
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
            endDate: currentDate.setFullYear(currentDate.getFullYear() + 1),
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
    Insurance.deleteOne({_id: '62b00fb59f1b0048c1a5aad3'}, function (err) {})
    Payment.findOneAndUpdate({_id: '62ab3cd0efa5ca78a7bab408'}, {isPaid: false}, function (err) {});
    done();
  });


  it("Should get all payments for insurance", (done) => {
    chai
      .request(app)
      .get(`/api/payment/62b00fb59f1b0048c1a5aad3/all`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
        .to.be.an('array');
        done();
      });
  });

  it("Should get first payment to pay by insurance's id with correct Id", (done) => {
    chai
      .request(app)
      .get("/api/payment/62b00fb59f1b0048c1a5aad3/to-pay")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal("62ab3cd0efa5ca78a7bab408");
        expect(res.body).to.have.property("insurance").to.be.equal("62b00fb59f1b0048c1a5aad3");
        expect(res.body).to.have.property("isPaid").to.be.equal(false)
        done();
      });
  });

  it("Should get error on first payment to pay by insurance's id with incorrect Id", (done) => {
    chai
      .request(app)
      .get("/api/payment/62b00fb59f1b0048c1a5aad8/to-pay")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          "Insurance with Id 62b00fb59f1b0048c1a5aad8 doesn't exist in our database!"
        );
        done();
      });
  });

  it("Should pay payment and return response OK", (done) => {
    chai
      .request(app)
      .post("/api/payment/62ab3cd0efa5ca78a7bab408/pay")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Payment is paid!");
        done();
      });
  });

  it("Should get next first payment to pay by insurance's id with correct Id", (done) => {
    chai
      .request(app)
      .get("/api/payment/62b00fb59f1b0048c1a5aad3/to-pay")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal("62ab3cd0efa5ca78a7bab40c");
        expect(res.body).to.have.property("insurance").to.be.equal("62b00fb59f1b0048c1a5aad3");
        expect(res.body).to.have.property("isPaid").to.be.equal(false)
        done();
      });
  });

  it("Should get error on pay payment by insurance with incorrect id", (done) => {
    chai
      .request(app)
      .post("/api/payment/62ab3cd0efa5ca78a7bab404/pay")
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
            `Payment with ID 62ab3cd0efa5ca78a7bab404 doesn't exist in our database!`
        );
        done();
      });
  });
});
