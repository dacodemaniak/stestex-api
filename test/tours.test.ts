import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/tours', () => {

  it('Réponse avec un objet JSON, et disposer de toutes les propriétés', () => {
    return chai.request(app).get('/api/v1/tours')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.all.keys([
            'now',
            'date',
            'tours'
        ]);
      });
  });
});