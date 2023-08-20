import { Request, Response } from 'express';
const User = require('../../schemas/userSchema')
const jwt = require('jsonwebtoken');

const refresh = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        // Find the user by the refresh token
        const user = await User.findOne({ refreshToken });

        if (!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const accessToken = jwt.sign({ userId: user._id }, 'your_access_token_secret', { expiresIn: '15m' });

        // Return the new access token
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = refresh
