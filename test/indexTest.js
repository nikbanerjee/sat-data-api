const assert = require('chai').assert;
const app = require('../src/app');
const request = require('supertest');

describe('Index', () => {
  describe('Routes', () => {
    it('getIndex should return a 200 status', () => {
      return request(app)
        .get('/')
        .then((res) => {
          assert.equal(res.status, 200);
        });
    });
    it('getIndex should return an ok message', () => {
      return request(app)
        .get('/')
        .then((res) => {
          console.log(res)
          assert.equal(res.text, 'ok');
        });
    });
  });
  describe('Functions', () => { });
});
