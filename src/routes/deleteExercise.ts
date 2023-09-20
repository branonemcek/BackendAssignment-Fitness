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
            const deleteExercise = await regService.deleteExercise(req.body as exerciseDelete);

            return res.json({
                data: deleteExercise,
                message: 'The exercise was deleted'
            })
        }catch (error) {
            return res.status(500).json({
                error: 'Error creating program'
            });
        }
    })

    return router
}


export interface exerciseDelete {
    id: number;
}
