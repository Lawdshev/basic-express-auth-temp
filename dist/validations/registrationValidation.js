"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define validation schema for user registration
const userRegistrationSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    profilePicture: joi_1.default.string().uri(),
    bio: joi_1.default.string(),
    location: joi_1.default.string(),
    skills: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
    portfolio: joi_1.default.array().items(joi_1.default.string().uri()),
    ratings: joi_1.default.number().min(0).max(5),
    reviews: joi_1.default.array().items(joi_1.default.string()),
    role: joi_1.default.string().valid('artisan', 'user').required(),
    createdAt: joi_1.default.date(),
    updatedAt: joi_1.default.date(),
    // Add validation for other fields as needed
});
const registrationValidation = (reqBody) => {
    return userRegistrationSchema.validate(reqBody);
};
exports.default = registrationValidation;
