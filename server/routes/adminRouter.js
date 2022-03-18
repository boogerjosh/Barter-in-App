const adminControllers = require("../controllers/adminControllers");
const Authentication = require("../middlewares/auth");
const Authorization = require("../middlewares/authz");
const adminRouter = require("express").Router();

adminRouter.post("/register", adminControllers.register);
adminRouter.post('/login', adminControllers.login)
adminRouter.use(Authentication);
adminRouter.get('/items', adminControllers.getItems)
adminRouter.patch("/items/:id", Authorization, adminControllers.patchItem);


module.exports = adminRouter;
