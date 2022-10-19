const express = require('express');
const {ValidationError} = require('sequelize');

const verifyClient = require('../middleware/verifyClient');
const verifyInfluencer = require("../middleware/verifyInfluencer");

const router = express.Router();
const responseUtil = require('../helpers/response');
const { Content, Review } = require('../models');

const createContent = async (req, res) => {
    try {
        let {
            title,
            caption,
            photo
        } = req.body;
        const {id} = req.user;
        const influencerId = parseInt(id)
        Content.create({influencerId, title, caption, photo}, {returning: true})
            .then((content) => responseUtil.successResponse(res, null, {
                content
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

const getContent = async (req, res) => {
    try {
        Content.findAll({
            include: {
                model: Review
            }
        })
            .then((content) => {
                return responseUtil.successResponse(res, null, {content});
            })
            .catch((e) => responseUtil.badRequestResponse(res, e))
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const updateContent = async (req, res) => {
    try {
        let {
            title,
            caption,
            photo
        } = req.body;
        const id = parseInt(req.params.contentId);
        Content.update({title, caption, photo}, {where: {id: id}, returning: true})
        .then((affectedRow) => {
            return Content.findOne({where: {id:id}})
        })
        .then((data) => {
                if (data[0] === 0){
                    return responseUtil.badRequestResponse(res, {message: 'data not found'});
                }

                return responseUtil.successResponse(res, null, {content: data});
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

const deleteContent = async (req, res) => {
    try {
        const id = parseInt(req.params.contentId);
        Content.destroy({where: {id}})
            .then(result => {
                if (result === 0) {
                    return responseUtil.badRequestResponse(res, {message: 'Content not found'});
                }
                return responseUtil.successResponse(res, 'Content has been successfully deleted')
            })
            .catch(err => {
                return responseUtil.badRequestResponse(res, err);
            })
    } catch (e) {
        return responseUtil.serverErrorResponse(res, {message: e.message});
    }
}

router.get('/', getContent);
router.post('/', verifyInfluencer, createContent);
router.patch('/:contentId', verifyInfluencer, updateContent);
router.delete('/:contentId', verifyInfluencer, deleteContent);

module.exports = router;
