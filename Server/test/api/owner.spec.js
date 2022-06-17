const chaiHttp = require("chai-http");
const app = require("../../index");
const chai = require("chai");
const expect = chai.expect;
const Owner = require("../../models/Owner");

chai.use(chaiHttp);

describe("Owner workflow tests", () => {
  after((done) => {
    Owner.deleteOne({ EGN: "9004301890" }, function (err) {});
    done();
  });

  const owner = {
    firstName: "Jane",
    surname: "Doe",
    age: 34,
    dateOfBirth: "1990-04-30 10:28:24",
    gender: "Female",
    EGN: "9004301890",
  };

  const invalidOwner = {
    firstName: "Jane",
    surname: "Doe",
    age: 34,
    dateOfBirth: "1990-04-30 10:28:24",
    gender: "Female",
    EGN: "9004301892",
  };

  it("Should get owner details by owner's id with correct Id", (done) => {
    chai
      .request(app)
      .get("/api/owner/62a734184d32675b23398866")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("_id")
          .to.equal("62a734184d32675b23398866");
        expect(res.body).to.have.property("EGN").to.equal("9412307545");
        done();
      });
  });

  it("Should get error on owner details by owner's id with incorrect Id", (done) => {
    chai
      .request(app)
      .get("/api/owner/62a734184d32675b23398869")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          "Owner with Id 62a734184d32675b23398869 doesn't exist in our database!"
        );
        done();
      });
  });

  it("Should add owner and return response OK", (done) => {
    chai
      .request(app)
      .post("/api/owner/add")
      .send(owner)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property("message")
          .to.equal("Owner was added successfully!");
        done();
      });
  });

  it("Should get error on add owner with existing EGN", (done) => {
    chai
      .request(app)
      .post("/api/owner/add")
      .send(owner)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain(
          `Owner with EGN ${owner.EGN} alredy exists in our database!`
        );
        done();
      });
  });

  it("Should get error on add owner with invalid EGN", (done) => {
    chai
      .request(app)
      .post("/api/owner/add")
      .send(invalidOwner)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.error.text).to.contain("Owner's EGN is not valid!");
        done();
      });
  });

  it("Should get owner by EGN in find Owner", (done) => {
    chai
      .request(app)
      .post("/api/owner/find")
      .send(owner)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("_id");
        expect(res.body).to.have.property("EGN").to.equal(owner.EGN);
        expect(res.body)
          .to.have.property("firstName")
          .to.equal(owner.firstName);
        expect(res.body).to.have.property("surname").to.equal(owner.surname);
        done();
      });
  });

  it("Should get error from find Owner by not existing EGN", (done) => {
    chai
      .request(app)
      .post("/api/owner/find")
      .send(invalidOwner)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.error.text).to.contain(
          `Owner with EGN ${invalidOwner.EGN} doesn't exist in our database!`
        );
        done();
      });
  });
});
