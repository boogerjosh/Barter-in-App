const router = require('express').Router()
const userRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use(userRouter)
router.use(adminRouter)


module.exports = router