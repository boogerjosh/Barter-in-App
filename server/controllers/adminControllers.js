const { User } = require('../models')

class adminControllers {
    static async register(req, res, next) {
        const { name, email, password, role, address } = req.body
        const response = await User.create({ name, email, password, role, address })
        res.status(201).send(response)
    }
}

module.exports = adminControllers