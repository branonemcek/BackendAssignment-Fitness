import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as userService from "../service/UserServices"
import {User} from "../repository/User";

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
        const allUsers = await userService.getAllUsersNoAdmin()

        const filteredUsers = allUsers.map<User>(user => ({
            id: user.id,
            nickName: user.nickname
        }));

        return res.json({
            data: filteredUsers,
            message: 'Filtered list of Users'
        })
    })

    return router
}