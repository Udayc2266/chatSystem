const Joi = require('joi');
const Smallchat = require('../views/backend/smallschema');

module.exports.chatSchema = Joi.object({
    chat: Joi.object({
        title:Joi.string().required(),
        aims:Joi.string().required(),
        category:Joi.string().required(),
        image:Joi.string().allow("",null),
        id:Joi.optional()
    })
});




