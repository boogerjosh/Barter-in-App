const userRouter = require("express").Router();
const userControllers = require("../controllers/userControllers");
const Authentication = require("../middlewares/auth");
const multerImage = require("../middlewares/multerImage");

userRouter.get("/items", userControllers.getItems);
userRouter.post("/google-login", userControllers.googleLogin);

userRouter.use(Authentication);
userRouter.post(
  "/items",
  multerImage().array("image"),
  userControllers.postItems
);
userRouter.get("/items/:id", userControllers.getItem);
userRouter.delete("/items/:id", userControllers.deleteItem);

// userRouter.put("/items/:id", userControllers.putItem);
// userRouter.patch("/:id", userControllers.patchItem);
// userRouter.post("/send-emails", userControllers.sendEmail);
module.exports = userRouter;
