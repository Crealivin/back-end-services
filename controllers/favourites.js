const express = require('express');
const {ValidationError} = require('sequelize');

const verifyClient = require('../middleware/verifyClient');

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Favourite } = require('../models');

const createFavourite = async (req, res) => {
    try {
        const {clientId} = req.user;
        const {influencerId} = req.body;
        Favourite.create({clientId, influencerId,}, {returning: true})
            .then((favourite) => responseUtil.successResponse(res, null, {
                favourite
            }))
            .catch(err => {
            if (err instanceof ValidationError)
                return responseUtil.validationErrorResponse(res, err.errors[0])
            else
                return responseUtil.badRequestResponse(res, err);
        })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const getFavourite = async (req, res) => {
    try {
        Favourite.findAll()
            .then((favourite) => {
                return responseUtil.successResponse(res, null, {favourite});
            })
            .catch((e) => responseUtil.badRequestResponse(res, e))
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const deleteFavourite = async (req, res) => {
    try {
        const id = parseInt(req.params.favouriteId);
        Favourite.destroy({where: {id}})
            .then(result => {
                if (result === 0) {
                    return responseUtil.badRequestResponse(res, {message: 'Favourite not found'});
                }
                return responseUtil.successResponse(res, 'Favourite has been successfully deleted')
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

router.get('/', verifyClient, getFavourite);
router.post('/', verifyClient, createFavourite);
router.delete('/:favouriteId', verifyClient, deleteFavourite);

module.exports = router;
