import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as regService from "../service/AuthorizationService"

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.post('/', async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const logIn = await regService.logIn(req.body as logInReq);
            if (logIn == null) {
                return res.json({
                    message: 'Email or password is not correct!'
                })
            }

            return res.json({
                data: logIn,
                message: 'LogIn'
            })
        }catch (error) {
            return res.status(500).json({
                error: 'Error creating program'
            });
        }
    })

    return router
}

export interface logInReq {
    email: string;
    password: string;
}

export interface logInMessage {
    userId: number;
    token?: string;
}
