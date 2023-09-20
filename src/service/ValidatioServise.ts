import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid e-mail' });
    }

    next();
};