import { Request, Response } from 'express';
import loginValidation from '../../validations/loginValidation';
import User from '../../schemas/userSchema';

const login = async (req: Request, res: Response) => {
    try {
        const { error, value } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ email: value.email });
        if (!user) return res.status(400).send({ message: 'Invalid credentials' });
        const valid = await (user as any).comparePassword(value.password);
        if (!valid) res.status(400).send({ message: 'Invalid credentials' });
        const { accessToken, refreshToken } = (user as any).generateTokens();
        res.status(200).send({ accessToken, refreshToken });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send(error);
    }
}

module.exports = login