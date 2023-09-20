import {exerciseUpdate} from "../routes/updateExercise";
import {User} from "./User";

const pgp = require('pg-promise')();
const db = pgp('postgres://postgres@localhost:5432/fitness_app');

export interface Exercise {
    id?: number;
    difficulty: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    programID: number;
}

export const findExerciseById = async (id: string): Promise<Exercise> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM exercises WHERE id = $1',
            [id]
        );

        return result || null;
    } catch (error) {
        console.error("Error during finding User by email:", error);
        throw error;
    }
};

export const create = async (newExercise: Exercise): Promise<Exercise> => {
    try {
        const result = await db.one(
            'INSERT INTO exercises (name, difficulty, createdAt, updatedAt, programID) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [newExercise.name, newExercise.difficulty, new Date(), new Date(), newExercise.programID]
        );

        console.log("Exercise will be created result:", result);
        return result;

    } catch (error) {
        console.error("Exercise during User creating:", error);
        throw error;
    }
};

export const findById = async (id: number): Promise<Exercise> => {
    try {
        const result = await db.oneOrNone(
            'SELECT * FROM exercises WHERE id = $1',
            [id]
        );

        return result || null;
    } catch (error) {
        console.error("Error during Exercise User by email:", error);
        throw error;
    }
};

export const updateExercise = async (exercise: exerciseUpdate): Promise<Exercise> => {
    try {
        const result = await db.oneOrNone(
            'UPDATE exercises SET difficulty = $1, name = $2, createdAt = $3, updatedAt = $4, deletedAt = $5, programID = $6 WHERE id = $7 RETURNING *',
            [
                exercise.difficulty || null,
                exercise.name || null,
                exercise.createdAt || null,
                exercise.updatedAt || null,
                exercise.deletedAt || null,
                exercise.programID || null,
                exercise.id
            ]
        );

        return result || null;
    } catch (error) {
        console.error("Error during updating User:", error);
        throw error;
    }
};

export const deleteExercise = async (exerciseId: number): Promise<void> => {
    try {
        await db.none(
            'DELETE FROM exercises WHERE id = $1',
            [exerciseId]
        );

        console.log(`Exercise with ID ${exerciseId} has been deleted.`);
        return;
    } catch (error) {
        console.error(`Error during deleting Exercise with ID ${exerciseId}:`, error);
        throw error;
    }
};

