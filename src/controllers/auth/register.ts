import { Request, Response } from 'express';
import registrationValidation from '../../validations/registrationValidation';
import User from '../../schemas/userSchema';

const register = async (req: Request, res: Response ) => {
    try {
        const { error, value } = await registrationValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({ email: value.email });
        if (user) return res.status(400).send({ message: 'Email already exists' });
        await User.create(value);
        res.status(200).send({ message: 'Registration successful' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).send(error);
        
    }
}

module.exports = register