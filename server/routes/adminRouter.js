const adminControllers = require('../controllers/adminControllers')
const adminRouter = require('express').Router()
const Authentication = require('../middlewares/auth')

adminRouter.post('/register', adminControllers.register)
adminRouter.post('/login', adminControllers.login)

adminRouter.use(Authentication)

adminRouter.get('/items', adminControllers.getItems)


module.exports = adminRouter