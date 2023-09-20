import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as regService from "../service/AuthorizationService"
import {validateRegistration} from "../service/ValidatioServise";

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.post('/', validateRegistration,async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const newRegistration = await regService.registerNewAccount(req.body as registerReq);


            return res.json({
                data: newRegistration,
                message: 'New registration'
            })
        }catch (error) {
            return res.status(500).json({
                error: 'Error creating program'
            });
        }
    })

    return router
}

export interface registerReq {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    age: number;
    role: number;
}
