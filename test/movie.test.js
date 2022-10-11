const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const { JWT_SECRET } = require('../src/utils/constants');

const expect = chai.expect;
chai.use(chaiHttp);
const token = jwt.sign('payload', JWT_SECRET);

describe('Movies', function () {
  describe('Listing Movies', function () {
    it('retrieve all movies', function (done) {
      chai
        .request(app)
        .get('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(4);
          done();
        });
    });
    it('retrieve movies, given a valid genreId', function (done) {
      chai
        .request(app)
        .get('/movies?genre=3')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(3);
          done();
        });
    });
    it('retrieve movies, given a invalid genreId', function (done) {
      chai
        .request(app)
        .get('/movies?genre=11')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });
    it('retrieve movies, given a valid title', function (done) {
      chai
        .request(app)
        .get('/movies?name=Venom')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body[0].title).to.be.equal('Venom');
          done();
        });
    });
    it('retrieve movies, given a invalid title', function (done) {
      chai
        .request(app)
        .get('/movies?name=Naruto')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body.length).to.be.equal(0);
          done();
        });
    });
  });

  describe('Retrieve Details From Specific Movie', function (done) {
    it('retrieve details succesfully', function (done) {
      chai
        .request(app)
        .get('/movies/2')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.property('title');
          expect(res.body).to.have.property('releaseDate');
          expect(res.body).to.have.property('score');
          expect(res.body).to.have.property('img');
          expect(res.body).to.have.property('Characters');
          done();
        });
    });
    it('fail to retrieve details, invalid id', function (done) {
      chai
        .request(app)
        .get('/movies/22')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });

  describe('Create New Movie', function () {
    it('create new movie succesfully', function (done) {
      chai
        .request(app)
        .post('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .send({ title: 'title' })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          done();
        });
    });
    it('fail to create movie, no title', function (done) {
      chai
        .request(app)
        .post('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .send({ title: '', releaseDate: '04/10/2020' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('fail to create movie, invalid score', function (done) {
      chai
        .request(app)
        .post('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .send({ title: 'title', score: 8 })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('fail to create movie, invalid date format', function (done) {
      chai
        .request(app)
        .post('/movies')
        .set({ Authorization: `Bearer ${token}` })
        .send({ title: 'title', releaseDate: '04-20-1990' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });

  describe('Edit Movie Details', function (done) {
    it('edit movie succesfully', function (done) {
      chai
        .request(app)
        .put('/movies/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ score: 4 })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('fail to edit a movie, invalid id', function (done) {
      chai
        .request(app)
        .put('/movies/15')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
    it('fail to edit a movie, invalid score', function (done) {
      chai
        .request(app)
        .put('/movies/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ score: 8 })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('fail to edit a movie, invalid date format', function (done) {
      chai
        .request(app)
        .put('/movies/2')
        .set({ Authorization: `Bearer ${token}` })
        .send({ releaseDate: '04-20-1990' })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
  });

  describe('Delete a Movie', function (done) {
    it('movie deleted succesfully', function (done) {
      chai
        .request(app)
        .delete('/movies/1')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(204);
          done();
        });
    });
    it('movie deletion fail, invalid id', function (done) {
      chai
        .request(app)
        .delete('/movies/31')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
