import {Exercise} from "./Exercise";
import {User} from "./User";

const pgp = require('pg-promise')();
const db = pgp('postgres://postgres@localhost:5432/fitness_app');

export interface ExerciseInProgress {
    id?: number;
    user_id: number;
    exercise_id: number;
    status: number;
}

export const findExerciseById = async (id: string): Promise<Exercise> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM user_exercises WHERE id = $1',
            [id]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const create = async (newExerciseRecord: ExerciseInProgress): Promise<User> => {
    try {
        const result = await db.one(
            'INSERT INTO user_exercises (user_id, exercise_id, status) VALUES ($1, $2, $3) RETURNING *',
            [newExerciseRecord.user_id, newExerciseRecord.exercise_id, newExerciseRecord.status]
        );

        console.log("Exercise will be created result:", result);
        return result;

    } catch (error) {
        console.error("Error during Exercise creating:", error);
        throw error;
    }
};

//TODO check
export const getAllUserExercises = async (userId: number): Promise<User[]> => {
    try {
        const result = await db.any('SELECT FROM user_exercises WHERE user_id = $1',
            [userId]);
        return result;
    } catch (error) {
        console.error("Error during getting all users:", error);
        throw error;
    }
};
//TODO check

export const deleteUserExerciseWitchExerciseIdAndUserId = async (exerciseId: number, userId: number): Promise<void> => {
    try {
        await db.none(
            'DELETE FROM user_exercises WHERE exercise_id = $1 AND user_id = $2',
            [exerciseId, userId]
        );

        console.log(`Exercise with ID ${exerciseId} has been deleted.`);
        return;
    } catch (error) {
        console.error(`Error during deleting Exercise with ID ${exerciseId}:`, error);
        throw error;
    }
};

export const deleteUserExerciseWitchExerciseId = async (exerciseId: number): Promise<void> => {
    try {
        await db.none(
            'DELETE FROM user_exercises WHERE exercise_id = $1',
            [exerciseId]
        );

        console.log(`Exercise with ID ${exerciseId} has been deleted.`);
        return;
    } catch (error) {
        console.error(`Error during deleting Exercise with ID ${exerciseId}:`, error);
        throw error;
    }
};