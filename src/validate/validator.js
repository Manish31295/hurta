const Joi = require('joi')

const createUserValidation = (validator) => {
    userValidateSchema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().allow("").optional(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().allow("").optional(),
        address: Joi.string().allow("").optional(),
    })
    return userValidateSchema.validate(validator)
}

module.exports = {
    createUserValidation
}