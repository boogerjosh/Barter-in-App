const userRouter = require('express').Router()
const userControllers = require('../controllers/userControllers')
const multerImage = require('../middlewares/multerImage')

userRouter.post('/items', multerImage().array('image'), userControllers.postItems)

module.exports = userRouter