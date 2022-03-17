const userRouter = require("express").Router();
const userControllers = require("../controllers/userControllers");
const Authentication = require("../middlewares/auth");
const multerImage = require("../middlewares/multerImage");

userRouter.get("/items", userControllers.getItems);
userRouter.use(Authentication);
userRouter.post(
  "/items",
  multerImage().array("image"),
  userControllers.postItems
);
userRouter.get("/items/:id", userControllers.getItem);
userRouter.put("/:id", userControllers.putItem);
userRouter.patch("/:id", userControllers.patchItem);
userRouter.delete("/:id", userControllers.deleteItem);
module.exports = userRouter;
