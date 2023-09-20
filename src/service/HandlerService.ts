import * as exercisesDatabase from "../repository/Exercise"
import {exerciseRequest} from "../routes/createNewExecrise";
import {exerciseUpdate} from "../routes/updateExercise";
import {exerciseDelete} from "../routes/deleteExercise";

// TODO check create and update
export const createNewExercise = async (request: exerciseRequest) => {return await exercisesDatabase.create(request)};

export const update = async (request: exerciseUpdate) => {
    const exercise = await exercisesDatabase.findById(request.id);
    if (exercise == null) {
        console.log("Exercise not found");
    }
    console.log(exercise);
    const updateExercise = await exercisesDatabase.updateExercise(request)
};

export const deleteExercise = async (exerciseonDelet: exerciseDelete) => {
    const deletedExercise = await exercisesDatabase.deleteExercise(exerciseonDelet.id);
    return deletedExercise
}

export const getAllUsers = async (exerciseonDelet: exerciseDelete) => {
    const deletedExercise = await exercisesDatabase.deleteExercise(exerciseonDelet.id);
    return deletedExercise
}

