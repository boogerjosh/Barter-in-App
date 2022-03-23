const userRouter = require("express").Router();
const userControllers = require("../controllers/userControllers");
const Authentication = require("../middlewares/auth");
const multerImage = require("../middlewares/multerImage");

userRouter.get("/items", userControllers.getItems);
userRouter.post("/googleLogin", userControllers.loginGoogle);
userRouter.get("/items/homes", userControllers.dataForHome);
userRouter.get("/items/:id", userControllers.getItem);

userRouter.use(Authentication);

userRouter.get("/myads", userControllers.getMyAds);
userRouter.get("/items-barters", userControllers.dataForBarter);

userRouter.post(
  "/addItem",
  multerImage().array("image"),
  userControllers.addItem
  );
  
userRouter.post(
  '/myImage',
  multerImage().array("image"),
  userControllers.postImage
);
    
userRouter.post(
  "/items",
  multerImage().array("image"),
  userControllers.postItems
);

userRouter.post("/roomBarter", userControllers.postRoomBarter);

userRouter.get("/roomBarter", userControllers.getRoomBarter);

userRouter.delete("/items/:id", userControllers.deleteItem);

userRouter.patch("/roomBarter/:id", userControllers.patchRoomBarter);
// userRouter.patch("/:id", userControllers.patchItem);
// userRouter.post("/send-emails", userControllers.sendEmail);
module.exports = userRouter;
