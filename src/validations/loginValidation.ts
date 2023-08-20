import Joi from 'joi';

type reqBodyType = {
    email: String,
    password: String,
}

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const loginValidation = (reqBody:reqBodyType) => {
    return userLoginSchema.validate(reqBody);
}

export default loginValidation