const { Influencer } = require('../models');
const response = require('../helpers/response');
const ROLE = require('../constants/role');

module.exports = async (req, res, next) => {
    const {id, email, role} = req.user;
    Influencer.findOne({where: {id, email}})
        .then((user) => {
            if (user) {
                if (role !== ROLE.INFLUENCER) {
                    return response.forbiddenResponse(res, 'you don\'t have access')
                } else {
                    next();
                }
            } else {
                return response.unauthorizedResponse(res, 'influencer account invalid or has logged out');
            }
            
        })
        .catch((e) => {
            return response.unauthorizedResponse(res, e.message);
        })
}
