/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanesa a la napolitana',
  summary: 'Platillo tipico de Argentina'
};

describe('Recipes routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async() =>
      await agent.get('/recipes').expect(200)
    );
    it('should get 200 when send a id from query', () =>
      agent.get('/recipes/716426').expect(200)
    );
    it('should get a json when send a id from query', () =>
      agent.get('/recipes/716426').expect('Content-Type', /json/)
    );
    it('should get 418 with a wrong id', async() =>
      await agent.get('/recipes/te').expect(418)
    );
  });
});
