const adminControllers = require('../controllers/adminControllers')
const adminRouter = require('express').Router()

adminRouter.post('/register', adminControllers.register)
adminRouter.post('/login')

module.exports = adminRouter