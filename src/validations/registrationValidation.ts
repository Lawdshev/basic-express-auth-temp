import Joi from 'joi';

type reqBodyType = {
    username: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    profilePicture: String,
    bio: String,
    location: String,
    skills: [String],
    portfolio: [String],
    ratings: Number,
    reviews: [String],
    role: String,
    createdAt: Date,
    updatedAt: Date
}

// Define validation schema for user registration
const userRegistrationSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(), // Adjust the min length as needed
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    profilePicture: Joi.string().uri(),
    bio: Joi.string(),
    location: Joi.string(),
    skills: Joi.array().items(Joi.string()).min(1).required(), // At least one skill is required
    portfolio: Joi.array().items(Joi.string().uri()), // Allow an array of valid URLs
    ratings: Joi.number().min(0).max(5), // Assuming ratings are on a scale of 0-5
    reviews: Joi.array().items(Joi.string()), // Array of review strings
    role: Joi.string().valid('artisan', 'user').required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    // Add validation for other fields as needed
});

const registrationValidation = (reqBody: reqBodyType) => {
    return userRegistrationSchema.validate(reqBody);
}

export default registrationValidation;

