const express = require('express');
const jwt = require('jsonwebtoken');
const {ValidationError} = require('sequelize');

const verifyToken = require('../middleware/verifyToken');
const verifyInfluencer = require("../middleware/verifyInfluencer");

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Influencer } = require('../models');
const {JWT_SECRET_KEY} = process.env;

const register = async (req, res) => {
    try {
        let {
            name,
            gender,
            dateofBirth,
            contactNumber,
            socialMediaLink,
            address,
            idCard,
            email,
            password,
            bankCode,
            bankNumber,
            photo
        } = req.body;
        Influencer.create({name, gender, dateofBirth, contactNumber, socialMediaLink, address, idCard, email, password, bankCode, bankNumber,  photo})
            .then(() => responseUtil.successResponse(
                res,
                null,
                {influencer: {name, gender, dateofBirth, contactNumber, socialMediaLink, address, idCard, email, bankCode, bankNumber,  photo}},
                201
            ))
            .catch((e) => {
                if (e instanceof ValidationError) {
                    return responseUtil.validationErrorResponse(res, e.errors[0]);
                }
                else {
                    return responseUtil.badRequestResponse(res, e);
                }
            });
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const login = (req, res) => {
    try {
        const {email, password} = req.body;
        if (email && password) {
            Influencer.findOne({where: {email}})
                .then((influencer) => {
                    if (influencer) {
                        if (influencer.validPassword(password, influencer.password)) {
                            const influencerData = {
                                id: influencer.id,
                                email: influencer.email,
                                role: 'influencer'
                            }
                            const token = jwt.sign(influencerData, JWT_SECRET_KEY, {
                                expiresIn: '1h',
                            });
                            return responseUtil.successResponse(res, null, {token});
                        } else {
                            return responseUtil.unauthorizedResponse(res, 'password invalid')
                        }
                    }
                    return responseUtil.unauthorizedResponse(res, 'email is not registered')
                })
        } else {
            return responseUtil.badRequestResponse(res, {message: 'email & password required'})
        }
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const updateInfluencer = (req, res) => {
    try {
        const {name, gender, dateofBirth, contactNumber, socialMediaLink, address, idCard, bankCode, bankNumber, photo} = req.body;
        const bodyData = {
            name,
            gender,
            dateofBirth,
            contactNumber,
            socialMediaLink,
            address,
            idCard,
            bankCode,
            bankNumber,
            photo
        }
        let {id} = req.user;
        id = parseInt(id);
        const influencerId = parseInt(req.params.influencerId);
        if (id === influencerId) {
            Influencer.update(bodyData, {where: {id: influencerId}, returning: true})
                .then((affectedRow) => {
                    return Influencer.findOne({where: {id:influencerId}})
                })
                .then((data) => {
                    if (data === 0){
                        return responseUtil.badRequestResponse(res, {message: 'data not found'});
                    }
                    if (data)
                        data['password'] = undefined;
                    return responseUtil.successResponse(res, null, {influencer: data});
                })
                .catch(err => {
                    if (err instanceof ValidationError) {
                        return responseUtil.validationErrorResponse(res, err.errors[0]);
                    }
                    return responseUtil.badRequestResponse(res, err);
                })
        } else {
            return responseUtil.badRequestResponse(res, {message: 'you can only update your own data'})
        }
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const updatePassword = (req, res) => {
    try {
        const {email, password, new_password} = req.body;

        if (email && password && new_password) {
            Influencer.findOne({where: {email}})
                .then((influencer) => {
                    if (influencer) {
                        Influencer.update({password: new_password}, {where: {id: influencer.id}})
                            .then(() => {
                                return responseUtil.successResponse(res, 'update password successfully');
                            })
                            .catch(err => {
                                return responseUtil.badRequestResponse(res, err);
                            })
                    } else {
                        return responseUtil.badRequestResponse(res, {message: 'account was not found'})
                    }
                })
                .catch(err => {
                    return responseUtil.badRequestResponse(res, err);
                })
        }
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const deleteInfluencer = (req, res) => {
    try {
        const influencerId = parseInt(req.params.influencerId);
        Influencer.destroy({where: {id: influencerId}})
            .then(result => {
                if (result === 0) {
                    return responseUtil.badRequestResponse(res, {message: 'Account not found'});
                }
                return responseUtil.successResponse(res, 'Your account has been successfully deleted');
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

router.post('/register', register);
router.post('/login', login);
router.put('/:influencerId', verifyToken, verifyInfluencer, updateInfluencer);
router.patch('/changePassword', verifyToken, verifyInfluencer, updatePassword);
router.delete('/:influencerId', verifyToken, verifyInfluencer, deleteInfluencer);

module.exports = router;
