const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { JWT_SECRET } = require('../src/utils/constants');

const expect = chai.expect;
chai.use(chaiHttp);
const token = jwt.sign('payload', JWT_SECRET);

describe('Genres', function () {
  describe('Listing Genres', function () {
    it('retrieve all genres', function (done) {
      chai
        .request(app)
        .get('/genres')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(7);
          done();
        });
    });
  });

  describe('Retrieve Details From Specific Genre', function (done) {
    it('retrieve details succesfully', function (done) {
      chai
        .request(app)
        .get('/genres/2')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('img');
          done();
        });
    });
    it('fail to retrieve details, invalid id', function (done) {
      chai
        .request(app)
        .get('/genres/9')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  describe('Create New Genre', function () {
    it('create new genre succesfully', function (done) {
      chai
        .request(app)
        .post('/genres')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'Horror' })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('fail to create character, no name', function (done) {
      chai
        .request(app)
        .post('/genres')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: '' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });

  describe('Edit Genre Details', function (done) {
    it('edit genre succesfully', function (done) {
      chai
        .request(app)
        .put('/genres/4')
        .set({ Authorization: `Bearer ${token}` })
        .send({ name: 'Drama' })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('fail to edit a genre, invalid id', function (done) {
      chai
        .request(app)
        .put('/genres/20')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  describe('Delete a Genre', function (done) {
    it('genre deleted succesfully', function (done) {
      chai
        .request(app)
        .delete('/genres/3')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('genre deletion fail, invalid id', function (done) {
      chai
        .request(app)
        .delete('/genres/15')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
