const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { JWT_SECRET } = require('../src/utils/constants');

const expect = chai.expect;
chai.use(chaiHttp);
const token = jwt.sign('payload', JWT_SECRET);

describe('Characters', function () {
  describe('Listing Characters', function () {
    it('retrieve all characters', function (done) {
      chai
        .request(app)
        .get('/characters')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(7);
          done();
        });
    });
    it('retrieve characters, given a valid movieId', function (done) {
      chai
        .request(app)
        .get('/characters?movie=3')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(3);
          done();
        });
    });
    it('retrieve characters, given a invalid movieId', function (done) {
      chai
        .request(app)
        .get('/characters?movie=14')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });
    it('retrieve movies, given a valid age', function (done) {
      chai
        .request(app)
        .get('/characters?age=1500')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(2);
          done();
        });
    });
    it('retrieve characters, given a valid name', function (done) {
      chai
        .request(app)
        .get('/characters?name=Thor')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(1);
          done();
        });
    });
  });

  describe('Retrieve Details From Specific Character', function (done) {
    it('retrieve details succesfully', function (done) {
      chai
        .request(app)
        .get('/characters/2')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('age');
          expect(res.body).to.have.property('weight');
          expect(res.body).to.have.property('img');
          expect(res.body).to.have.property('history');
          expect(res.body).to.have.property('Movies');
          done();
        });
    });
    it('fail to retrieve details, invalid id', function (done) {
      chai
        .request(app)
        .get('/characters/18')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  describe('Create New Character', function () {
    it('create new character succesfully', function (done) {
      chai
        .request(app)
        .post('/characters')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'Mickey' })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('fail to create character, no name', function (done) {
      chai
        .request(app)
        .post('/characters')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: '', age: '26' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });

  describe('Edit Character Details', function (done) {
    it('edit character succesfully', function (done) {
      chai
        .request(app)
        .put('/characters/4')
        .set({ Authorization: `Bearer ${token}` })
        .send({ age: 1400 })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('fail to edit a movie, invalid id', function (done) {
      chai
        .request(app)
        .put('/characters/30')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  describe('Delete a Character', function (done) {
    it('character deleted succesfully', function (done) {
      chai
        .request(app)
        .delete('/characters/2')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('character deletion fail, invalid id', function (done) {
      chai
        .request(app)
        .delete('/characters/31')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
