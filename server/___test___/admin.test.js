const app = require('../app.js');
const { sequelize } = require('../models');
const request = require('supertest');
const { queryInterface } = sequelize;
const userData = {
  email: 'admin@admin.admin',
  password: 'admin@admin.admin',
};

describe('Admin Route Test', () => {
  describe('POST /register - create new admin', () => {
    test('201 Success register - should create new User', (done) => {
      request(app)
        .post('/admins/register')
        .send(userData)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty('id', expect.any(Number));
          expect(body).toHaveProperty('email', userData.email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});