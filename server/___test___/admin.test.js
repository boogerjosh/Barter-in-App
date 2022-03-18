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
  describe("POST /login - login with admin", () => {
    test("200 Success login - should return access token", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('access_token', expect.any(String))
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - wrong email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "WRONGEMAIL",
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Invalid email/password')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - wrong password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
          password: "WRONGPASSWORDs",
        })
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Invalid email/password')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - no input email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Must input email')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - no input password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: 'admin@admin.admin'
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Must input password')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - empty input email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: '',
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Must input email')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - empty input password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: 'admin@admin.admin',
          password: ''
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty('message')
          expect(response.body.message).toBe('Must input password')
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});


