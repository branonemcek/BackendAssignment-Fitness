const pgp = require('pg-promise')();
const db = pgp('postgres://postgres@localhost:5432/fitness_app');

export interface User {
    id?: number;
    name?: string;
    surname?: string;
    nickname?: string;
    email?: string;
    password?: string;
    age?: number;
    role?: number;
    verified?: number;
}

export const create = async (newUser: User): Promise<User> => {
    try {
        const result = await db.one(
            'INSERT INTO users (email, password, name, nickname, surname, age, role, verified) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [newUser.email, newUser.password, newUser.name, newUser.nickname, newUser.surname, newUser.age, newUser.role, newUser.verified]
        );

        console.log("User will be created result:", result);
        return result;

    } catch (error) {
        console.error("Error during User creating:", error);
        throw error;
    }
};

export const findByEmail = async (email: string): Promise<User> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const findById = async (userId: number): Promise<User> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM users WHERE id = $1',
            [userId]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const findByNickName = async (nickname: number): Promise<User> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM users WHERE nickname = $1',
            [nickname]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const findByEmailAndRole = async (email: string, role: number): Promise<User | null> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM users WHERE email = $1 AND role = $2',
            [email, role]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const findAdmin = async (email: string): Promise<User | null> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM users WHERE email = $1 AND role = $2',
            [email, 1]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding Admin by email:", error);
        throw error;
    }
};

export const updateUser = async (user: User): Promise<User | null> => {
    try {
        const result = await db.oneOrNone(
            'UPDATE users SET name = $1, surname = $2, nickname = $3, email = $4, password = $5, age = $6, role = $7, verified = $8 WHERE id = $9 RETURNING *',
            [
                user.name,
                user.surname,
                user.nickname,
                user.email,
                user.password,
                user.age,
                user.role,
                user.verified,
                user.id
            ]
        );

        return result || null;
    } catch (error) {
        console.error("Error during updating User:", error);
        throw error;
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const result = await db.any('SELECT * FROM users');
        return result;
    } catch (error) {
        console.error("Error during getting all users:", error);
        throw error;
    }
};

