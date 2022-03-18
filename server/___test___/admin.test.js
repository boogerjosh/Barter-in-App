const app = require("../app.js");
const { sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const { User } = require('../models')
const userData = {
  username: 'admin@admin.admin',
  email: "admin@admin.admin",
  password: "admin@admin.admin",
  role: 'Admin',
  address: 'admin@admin.admin',
  photoUrl: 'admin@admin.admin',
};

beforeAll(() => {
  queryInterface
  .bulkDelete(
    "Users",
    {},
    {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    }
  )
});

describe("Admin Route Test", () => {
  describe("POST /register - create new admin", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/admins/register")
        .send(userData)
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty('id', expect.any(Number))
          expect(response.body).toHaveProperty("email", userData.email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error register - should not create duplicate email", (done) => {
      request(app)
        .post("/admins/register")
        .send(userData)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Email must be unique')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
