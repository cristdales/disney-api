const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { JWT_SECRET } = require('../src/utils/constants');
const expect = chai.expect;
chai.use(chaiHttp);
const token = jwt.sign('payload', JWT_SECRET);

describe('Auth', function () {
  describe('User Registration', function () {
    it('succesfull registration', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .type('json')
        .send({ email: 'valid@email.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('failed registration: taken email', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .type('json')
        .send({ email: 'dummyuser@somedomain.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('failed registration: invalid email', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .type('json')
        .send({ email: 'invalidemail', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('failed registration: no password', function (done) {
      chai
        .request(app)
        .post('/auth/register')
        .type('json')
        .send({ email: 'valid@email.com' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });

  describe('User Login', function () {
    it('succcesful login', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .type('json')
        .send({ email: 'dummyuser@somedomain.com', password: 'somepassword' })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
    it('failed login, wrong password', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .type('json')
        .send({ email: 'dummyuser@somedomain.com', password: 'wrong' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    it('failed login, not registered email', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .type('json')
        .send({ email: 'notregistere@email.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });

  describe('Protected Routes', function () {
    it('protected route access, valid token provided', function (done) {
      chai
        .request(app)
        .get('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .type('json')
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('protected route error, token not provided', function (done) {
      chai
        .request(app)
        .get('/movies')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
});
