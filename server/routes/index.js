const router = require("express").Router();
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
// const itemRouter = require("./adminRouter");
router.use("/users", userRouter);
router.use("/admins", adminRouter);
// router.use("/items", itemRouter);

module.exports = router;