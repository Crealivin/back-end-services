const express = require('express');
const jwt = require('jsonwebtoken');
const {ValidationError} = require('sequelize');

const verifyClient = require('../middleware/verifyClient');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Client } = require('../models');
const {JWT_SECRET_KEY} = process.env;

const register = async (req, res) => {
    try {
        let {
            name,
            contactNumber,
            address,
            bio,
            email,
            password,
            bankCode,
            bankNumber
        } = req.body;
        Client.create({name, contactNumber, address, bio, email, password, bankCode, bankNumber})
            .then(() => responseUtil.successResponse(
                res,
                null,
                {client: {name, contactNumber, address, bio, email, bankCode, bankNumber}},
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
            Client.findOne({where: {email}})
                .then((client) => {
                    if (client) {
                        if (client.validPassword(password, client.password)) {
                            const clientData = {
                                id: client.id,
                                email: client.email,
                                role: 'client'
                            }
                            const token = jwt.sign(clientData, JWT_SECRET_KEY, {
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

const updateClient = (req, res) => {
    try {
        const {name, contactNumber, address, bio, bankCode, bankNumber} = req.body;
        const bodyData = {
            name,
            contactNumber,
            address,
            bio, 
            bankCode, 
            bankNumber
        }
        const clientId = parseInt(req.params.clientId);
        if (req.client.id === clientId) {
            Client.update(bodyData, {where: {id: clientId}, returning: true})
                .then((data) => {
                    if (data[0] === 0){
                        return responseUtil.badRequestResponse(res, {message: 'data not found'});
                    }
                    if (data[1][0])
                        data[1][0]['password'] = undefined;
                    return responseUtil.successResponse(res, null, {client: data[1][0]});
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
            Client.findOne({where: {email}})
                .then((client) => {
                    if (client) {
                        Client.update({password: new_password}, {where: {id: client.id}})
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

const deleteClient = (req, res) => {
    try {
        const clientId = parseInt(req.params.clientId);
        Client.destroy({where: {id: clientId}})
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
router.put('/:clientId', updateClient);
router.patch('/changePassword', updatePassword);
router.delete('/:clientId', deleteClient);

module.exports = router;
