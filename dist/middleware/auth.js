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
const jwt = require('jsonwebtoken');
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
module.exports = function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the token from the request headers
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Token is missing.' });
        }
        try {
            // Verify the token with your access token secret
            const decoded = jwt.verify(token, 'your_access_token_secret');
            // Check if the user exists and is not revoked
            const user = yield userSchema_1.default.findById(decoded.userId);
            if (!user || user.refreshToken !== token) {
                return res.status(403).json({ message: 'Access denied. Invalid token.' });
            }
            // Attach the user object to the request for use in protected routes
            req.user = user;
            next(); // Continue to the protected route
        }
        catch (error) {
            return res.status(403).json({ message: 'Access denied. Invalid token.' });
        }
    });
};
