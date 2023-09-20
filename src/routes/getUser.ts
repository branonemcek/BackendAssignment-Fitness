import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as userService from "../service/UserServices"

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.post('/', async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const user = await userService.getUserById(req.body as userInfoRequest)
            return res.json({
                data: user,
                message: 'User Info'
            })
        }catch (error) {
            return res.status(500).json({
                error: 'Error creating program'
            });
        }
    })


    return router
}

export interface userInfoRequest {
    id: number;
}