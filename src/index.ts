import http from 'http'
import express from 'express'
import * as bodyParser from 'body-parser'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import RegistrationRouter from './routes/registration'
import LogIntRouter from './routes/logIn'
import CreateExercise from './routes/createNewExecrise'
import UpdateExercise from './routes/updateExercise'
import DeleteExercise from './routes/deleteExercise'
import GetAllUsers from "./routes/getAllUsers";
import GetUser from "./routes/getUser";
import UpdateUser from "./routes/userUpdate";
import FilteredUserList from "./routes/getAllUsersNA";
import UserInfo from "./routes/getUserInfoNA";

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/programs', ProgramRouter())
app.use('/exercises', ExerciseRouter())
app.use('/registration', RegistrationRouter())
app.use('/login', LogIntRouter())
app.use('/createNewExercise', CreateExercise())
app.use('/updateExercise', UpdateExercise())
app.use('/deleteExercise', DeleteExercise())
app.use('/getAllUsers', GetAllUsers())
app.use('/getUser', GetUser())
app.use('/updateUser', UpdateUser())
app.use('/getAllUsersNA', FilteredUserList())
app.use('/getUserInfoNA', UserInfo())

const httpServer = http.createServer(app)

sequelize.sync()

console.log('Sync database', 'postgresql://localhost:5432/fitness_app')

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
