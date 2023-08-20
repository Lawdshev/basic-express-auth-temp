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
const registrationValidation_1 = __importDefault(require("../../validations/registrationValidation"));
const userSchema_1 = __importDefault(require("../../schemas/userSchema"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = yield (0, registrationValidation_1.default)(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield userSchema_1.default.findOne({ email: value.email });
        if (user)
            return res.status(400).send({ message: 'Email already exists' });
        yield userSchema_1.default.create(value);
        res.status(200).send({ message: 'Registration successful' });
    }
    catch (error) {
        console.error('Register error:', error);
        res.status(500).send(error);
    }
});
module.exports = register;
