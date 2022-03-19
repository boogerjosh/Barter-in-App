const userRouter = require("express").Router();
const userControllers = require("../controllers/userControllers");
const Authentication = require("../middlewares/auth");
const multerImage = require("../middlewares/multerImage");

userRouter.get("/items", userControllers.getItems);
userRouter.get("/items/homes", userControllers.dataForHome);
userRouter.post("/googleLogin", userControllers.loginGoogle);
userRouter.get("/items/:id", userControllers.getItem);

userRouter.use(Authentication);

userRouter.get("/myads", userControllers.getMyAds);
userRouter.get("/items-barters", userControllers.dataForBarter);

userRouter.post(
  "/items",
  multerImage().array("image"),
  userControllers.postItems
);
userRouter.get("/items/:id", userControllers.getItem);
userRouter.delete("/items/:id", userControllers.deleteItem);

userRouter.patch("/room-barters/:id", userControllers.patchRoomBarter);
// userRouter.patch("/:id", userControllers.patchItem);
// userRouter.post("/send-emails", userControllers.sendEmail);
module.exports = userRouter;
