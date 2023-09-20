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
    router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
        const allUsers = await userService.getAllUsers()
        return res.json({
            data: allUsers,
            message: 'List of Users'
        })
    })

    return router
}
