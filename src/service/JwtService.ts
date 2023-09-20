
const jwt = require('jsonwebtoken');

const secretKey = 'secret-key';

export const jwtWebTokenCreate = async (userId: number) => {
    const token = jwt.sign({ userId }, secretKey);

    return token;
}
