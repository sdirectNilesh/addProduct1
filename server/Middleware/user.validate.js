const Joi = require("joi");
const userModel = require('../Models/userModel');


const userValidation = async (req, res, next) => {
    const emailExists = await userModel.findOne({ where: { email: req.body.email } });
    if (emailExists) {
        res.json({success:false, msg: "user already exist"});
    }
    else{
    const userSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required(),
    })

    const { value, error } = userSchema.validate(req.body);
    if (error) return res.json({ error })
    req.validatedValues = value;
    next();
}
}
module.exports = {
    userValidation,
}