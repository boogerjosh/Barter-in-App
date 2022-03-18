const adminControllers = require("../controllers/adminControllers");
const Authentication = require("../middlewares/auth");
const Authorization = require("../middlewares/authz");
const adminRouter = require("express").Router();

adminRouter.post("/register", adminControllers.register);
adminRouter.use(Authentication);
adminRouter.patch("/items/:id", Authorization, adminControllers.patchItem);
adminRouter.post("/login");

module.exports = adminRouter;
