const app = require("../app.js");
const { Item } = require("../models");
const { sequelize } = require("../models");
const request = require("supertest");
const { signToken } = require("../helpers/jwt.js");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

let access_token;

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@mail.com",
          password: hashPassword("123456"),
          address: "-",
          role: "Admin",
          photoUrl:
            "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
    .then(() => {
      access_token = signToken({
        id: 1,
        email: "admin@mail.com",
        role: "Admin",
      });
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
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
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET items", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /users/items -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items")
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/items/homes -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items/homes")
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/myads -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/myads")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/items-barters -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items-barters")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
