const app = require("../app");
const { sequelize } = require("../models");
const request = require("supertest");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

jest.setTimeout(2000);

// let user = await user.findByPk(1);
let access_token;

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          email: "admin@mail.com",
          password: hashPassword("123456"),
          role: "Admin",
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
      return queryInterface.bulkInsert(
        "Items",
        [
          {
            title: "test",
            description:
              "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
            category: "pakaian",
            brand: "H&M",
            yearOfPurchase: "2021",
            statusPost: "Review",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert(
        "Images",
        [
          {
            itemId: 1,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442839/item/goods_00_442839.jpg?width=1600&impolicy=quality_75",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            itemId: 1,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442839/sub/goods_442839_sub18.jpg?width=1600&impolicy=quality_75",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// afterAll((done) => {
//   queryInterface
//     .bulkDelete(
//       "Items",
//       {},
//       {
//         truncate: true,
//         restartIdentity: true,
//         cascade: true,
//       }
//     )
//     .then(() => {
//       return queryInterface.bulkDelete();
//     })
//     .catch((err) => {
//       done(err);
//     });
// });
//GET ITEM
describe("GET items", () => {
  describe("GET /users/items -  success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/items")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/items/:id -  success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/items/1")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id", expect.any(Number));
          expect(res.body).toHaveProperty("title", expect.any(String));
          expect(res.body).toHaveProperty("category", expect.any(String));
          expect(res.body).toHaveProperty("statusPost", expect.any(String));
          expect(res.body).toHaveProperty("description", expect.any(String));
          expect(res.body).toHaveProperty("brand", expect.any(String));
          expect(res.body).toHaveProperty("yearOfPurchase", expect.any(String));
          expect(res.body).toHaveProperty("User", expect.any(Object));
          expect(res.body).toHaveProperty("Images", expect.any(Array));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /users/items/:id -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .get("/users/items/1")
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return an object with status 404 - item not found", (done) => {
      request(app)
        .get("/users/items/100")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(404);
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

// //POST ITEMS
// describe("POST items", () => {
//   describe("POST /items -  success test", () => {
//     const newItem = {};
//     it("should return an object with status 201", (done) => {
//       request(app)
//         .post("/items")
//         .set(access_token, "access_token")
//         .send(newItem)
//         .then((res) => {
//           expect(res.status).toBe(201);
//           expect(res.body).toBeInstanceOf(Object);
//           expect(res.body).toHaveProperty("message", expect.any(String));
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });

//   describe("POST /items -  failed test", () => {
//     const newItem = {};
//     it("should return an object with status 401 - input without access_token as headers", (done) => {
//       request(app)
//         .post("/items")
//         .send(newItem)
//         .then((res) => {
//           expect(res.status).toBe(401);
//           expect(res.body).toBeInstanceOf(Object);
//           expect(res.body).toHaveProperty("message", expect.any(String));
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });
// });

// //PUT ITEM
// describe("PUT items", () => {
//   describe("PUT /items/:id -  success test", () => {
//     const newItem = {};
//     it("should return an object with status 200", (done) => {
//       request(app)
//         .put("/items/:id")
//         .set(access_token, "access_token")
//         .send(newItem)
//         .then((res) => {
//           expect(res.status).toBe(200);
//           expect(res.body).toBeInstanceOf(Object);
//           expect(res.body).toHaveProperty("message", expect.any(String));
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });

//   describe("PUT /items/:id -  failed test", () => {
//     const newItem = {};
//     it("should return an object with status 401 - input without access_token as headers", (done) => {
//       request(app)
//         .post("/items")
//         .send(newItem)
//         .then((res) => {
//           expect(res.status).toBe(401);
//           expect(res.body).toBeInstanceOf(Object);
//           expect(res.body).toHaveProperty("message", expect.any(String));
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });
// });
