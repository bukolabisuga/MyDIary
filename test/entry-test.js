import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import EntryController from '../server/routes';
import Entry from '../server/entry';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Entries', () => {
  /* Test the /api/v1/entries route */
  describe('get all entries', () => {
    it('it should GET all the entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.entry[0]).to.have.property('title');
          expect(res.body.entry[1]).to.have.property('body');
          expect(res.body.entry[2]).to.have.property('id');
          expect(res.body.entry[0].title).to.be.a('string');
          expect(res.body.entry[1].body).to.be.a('string');
          expect(res.body.entry[2].id).to.be.a('number');
          expect(res.body.entry).to.have.lengthOf(4);
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id route */
  describe('get a single entry', () => {
    it('it should GET one entry', (done) => {
      chai.request(app)
        .get('/api/v1/entries/3')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.entry).to.be.a('object');
          expect(res.body.entry).have.property('title');
          expect(res.body.entry).to.have.property('body');
          expect(res.body.entry).have.property('id');
          expect(res.body.entry.title).to.be.a('string');
          expect(res.body.entry.body).to.be.a('string');
          expect(res.body.entry.id).to.be.a('number');
          expect(res.body.entry.id).to.equal(3);
          done();
        });
    });
  });

  /* Test the /api/v1/entries post route */
  describe('post a single entry', () => {
    it('it should POST an entry', (done) => {
      const entry = {
        title: 'My dogs gave birth',
        body: 'To more than 20 lil pups',
        id: 5,
      }
      chai.request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          expect(entry).to.have.property('title');
          expect(entry).to.have.property('body');
          expect(entry).to.have.property('id');
          expect(entry.title).to.be.a('string');
          expect(entry.body).to.be.a('string');
          expect(entry.id).to.be.a('number');
          expect(entry.title).to.equal('My dogs gave birth');
          expect(entry.id).to.equal(5);
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id put route */
  describe('update a single entry', () => {
    it('it should UPDATE an entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 5,
      }
      chai.request(app)
        .put('/api/v1/entries/5')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          expect(entry).to.have.property('title');
          expect(entry).to.have.property('body');
          expect(entry).to.have.property('id');
          expect(entry.title).to.be.a('string');
          expect(entry.body).to.be.a('string');
          expect(entry.id).to.be.a('number');
          expect(entry.title).to.equal('My cats gave birth');
          expect(entry.id).to.equal(5);
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id delete route */
  describe('delete a single entry', () => {
    it('it should DELETE an entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 5,
      }
      chai.request(app)
        .delete('/api/v1/entries/5')
        .send(entry)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a('object');
          res.body.should.have.property('success').equal('successfully deleted')
          done();
        });
    });
  });
});
