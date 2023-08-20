"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', authRoutes_1.default);
mongoose_1.default
    .connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
})
    .then(() => {
    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });
})
    .catch((err) => {
    console.error(err.message);
});
