const Joi = require('joi');

const Primary = require('../views/backend/primary');

module.exports.chatSchema = Joi.object({
    primary: Joi.object({
        title:Joi.string().required(),
        aims:Joi.string().required(),
        category:Joi.string().required(),
        image:Joi.string().allow("",null),
        id:Joi.optional()
    })
});




