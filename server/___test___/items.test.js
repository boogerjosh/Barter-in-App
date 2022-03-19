const app = require("../app");
const { sequelize } = require("../models");
const request = require("supertest");
const ImageKit = require("imagekit");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;
const nodemailer = require("nodemailer");
const sendMailMock = jest.fn();
// const fileMock = jest.fn();

jest.setTimeout(2000);
jest.mock("imagekit");
jest.mock("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
// ImageKit.mockReturnValue({ upload: { fileMock } });

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
        {
          username: "admin1",
          email: "admin1@mail.com",
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
            tag: "test-input",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            itemId: 1,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442839/sub/goods_442839_sub18.jpg?width=1600&impolicy=quality_75",
            tag: "test-input",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert(
        "RoomBarters",
        [
          {
            user1: 1,
            user2: 2,
            item1: 1,
            item2: 2,
            status1: false,
            status2: false,
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
//       "RoomBarters",
//       {},
//       {
//         truncate: true,
//         restartIdentity: true,
//         cascade: true,
//       }
//     )
//     .then(() => {
//       return queryInterface.bulkDelete(
//         "Images",
//         {},
//         {
//           truncate: true,
//           restartIdentity: true,
//           cascade: true,
//         }
//       );
//     })
//     .then(() => {
//       return queryInterface.bulkDelete(
//         "Items",
//         {},
//         {
//           truncate: true,
//           restartIdentity: true,
//           cascade: true,
//         }
//       );
//     })
//     .then(() => {
//       return queryInterface.bulkDelete(
//         "Users",
//         {},
//         {
//           truncate: true,
//           restartIdentity: true,
//           cascade: true,
//         }
//       );
//     })
//     .then(() => {
//       done();
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
  //MyAds
  describe("GET /users/myads -  success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/myads")
        .set("access_token", access_token)
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

  describe("GET /users/myads -  failed test", () => {
    it("should return an object with status 200 - input without access_token as headers", (done) => {
      request(app)
        .get("/users/myads")
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

    it("should return an object with status 401", (done) => {
      let fakeToken = signToken({
        id: 100,
        email: "test@mail.com",
        role: "Customer",
      });

      request(app)
        .get("/users/myads")
        .set("access_token", fakeToken)
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
  });
  //Item-barters
  describe("GET /users/items-barters -  success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/items-barters")
        .set("access_token", access_token)
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

  describe("GET /users/items-barters -  failed test", () => {
    it("should return an object with status 401", (done) => {
      request(app)
        .get("/users/items-barters")
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
  });
  //GET Item
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
    // it("should return an object with status 401 - input without access_token as headers", (done) => {
    //   request(app)
    //     .get("/users/items/1")
    //     .then((res) => {
    //       expect(res.status).toBe(401);
    //       expect(res.body).toBeInstanceOf(Object);
    //       expect(res.body).toHaveProperty("message", expect.any(String));
    //       done();
    //     })
    //     .catch((err) => {
    //       done(err);
    //     });
    // });

    it("should return an object with status 404 - item not found", (done) => {
      request(app)
        .get("/users/items/100")
        // .set("access_token", access_token)
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

//item homes
describe("GET items/homes", () => {
  describe("GET /users/items/homes -  success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/items/homes")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});

// //POST ITEMS
describe("POST items", () => {
  beforeAll(() => {
    ImageKit.mockImplementation(() => {
      return {
        upload: () => {
          return new Promise((resolve) => {
            resolve({
              url: "fake-image.png",
            });
          });
        },
      };
    });
  });

  describe("POST /users/items -  success test", () => {
    const newItem = {
      title: "test post",
      category: "pakaian",
      description:
        "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
      brand: "Supreme",
      yearOfPurchase: "2021",
      usderI: 1,
    };

    it("should return an object with status 201", (done) => {
      request(app)
        .post("/users/items")
        .set("access_token", access_token)
        .field("title", "test input post")
        .field("category", "pakaian")
        .field(
          "description",
          "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga."
        )
        .field("brand", "Supreme")
        .field("yearOfPurchase", "2021")
        .field("userId", 1)
        .attach("image", "assets/JK5OICOiE54.jpg")
        .attach("image", "assets/JK5OICOiE54.jpg")
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          expect(sendMailMock).toHaveBeenCalled();
          // expect(fileMock).toHaveBeenCalled();
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /users/items -  failed test", () => {
    const newItem = {
      title: "",
      category: "pakaian",
      description:
        "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
      brand: "Supreme",
      yearOfPurchase: "2021",
      usderI: 1,
    };
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .post("/users/items")
        .send(newItem)
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

    it("should return an object with status 401 - validation error", (done) => {
      request(app)
        .post("/users/items")
        .set("access_token", access_token)
        .field("title", "")
        .field("category", "pakaian")
        .field(
          "description",
          "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga."
        )
        .field("brand", "Supreme")
        .field("yearOfPurchase", "2021")
        .field("userId", 1)
        .attach("image", "assets/JK5OICOiE54.jpg")
        .attach("image", "assets/JK5OICOiE54.jpg")
        .then((res) => {
          expect(res.status).toBe(400);
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

// POST loginGoolge
describe("POST googleLogin", () => {
  describe("POST users/googleLogin - success test", () => {
    it("should an obj with status 200", (done) => {
      let payload = {
        email: "dummy.akun.1400@gmail.com",
        photoUrl: "-",
        givenName: "Dummy",
      };
      request(app)
        .post("/users/googleLogin")
        .send(payload)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("access_token", expect.any(String));
          expect(res.body).toHaveProperty("id", expect.any(String));
          expect(res.body).toHaveProperty("username", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST users/googleLogin - failed test", () => {
    let payload = {
      email: "",
      photoUrl: "",
      givenName: "",
    };
    it("should an obj with status 400 - validation error", (done) => {
      request(app)
        .post("/users/googleLogin")
        .send(payload)
        .then((res) => {
          expect(res.status).toBe(400);
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

//PATCH RoomBarter
describe("PATCH RoomBarters", () => {
  describe("PATCH room-barters/:id - success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .patch("/users/room-barters/1")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH /items/:id -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .patch("/users/room-barters/1")
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
        .patch("/users/room-barters/100")
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

//DELETE ITEM
describe("DELETE items", () => {
  describe("DELETE users/items/:id - success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .delete("/users/items/2")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("DELETE /items/:id -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .delete("/users/items/2")
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
        .delete("/users/items/100")
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
