import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as regService from "../service/HandlerService"

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.post('/', async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const createNewExercise = await regService.createNewExercise(req.body as exerciseRequest);
            if (createNewExercise == null) {
                return res.json({
                    message: 'The exercise was not created!'
                })
            }

            return res.json({
                data: createNewExercise,
                message: 'The exercise was created'
            })
        }catch (error) {
            return res.status(500).json({
                error: 'Error creating program'
            });
        }
    })

    return router
}

export interface exerciseRequest {
    difficulty: string;
    name: string;
    programID: number;
}
