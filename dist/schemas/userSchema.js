"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true, // User's hashed password (REQUIRED)
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePicture: String,
    bio: String,
    location: String,
    skills: {
        type: [String],
        required: true, // List of artisan skills (REQUIRED)
    },
    portfolio: [String],
    ratings: {
        type: Number,
        default: 0,
    },
    reviews: {
        type: [String],
        default: [],
    },
    role: {
        type: String,
        enum: ['artisan', 'user'],
        required: true, // Role can be 'artisan' or 'user' (REQUIRED)
    },
    createdAt: {
        type: Date,
        default: Date.now, // Date when the user account was created
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Date when the user account was last updated
    },
    refreshToken: String,
    // Other fields as needed for your app's specific features
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt.genSalt(10);
            const hashedPassword = yield bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt.compare(candidatePassword, this.password);
        }
        catch (error) {
            throw error;
        }
    });
};
userSchema.methods.generateTokens = function () {
    // Generate an access token
    const accessToken = jwt.sign({ userId: this._id }, 'your_access_token_secret', { expiresIn: '15m' });
    // Generate a refresh token
    const refreshToken = crypto_1.default.randomBytes(64).toString('hex');
    this.refreshToken = refreshToken;
    this.save();
    return { accessToken, refreshToken };
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
