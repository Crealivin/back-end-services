const { Client } = require('../models');
const response = require('../helpers/response');
const ROLE = require('../constants/role');

module.exports = async (req, res, next) => {
    const {id, email} = req.user;
    Client.findOne({where: {id, email}})
        .then((user) => {
            if (user) {
                req.user.role = user.role;
                next();
            } else {
                return response.unauthorizedResponse(res, 'client account invalid or has logged out');
            }
        })
        .catch((e) => {
            return response.unauthorizedResponse(res, e.message);
        })
}
