import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express'

import { models } from '../db'
import * as userService from "../service/UserServices"
import {User} from "../repository/User";
import {userInfoRequest} from "./getUser";
import {getUserById} from "../service/UserServices";

const router: Router = Router()

const {
    Program
} = models

export default () => {
    router.post('/', async (req: Request, res: Response, _next: NextFunction) => {
        const user = await userService.getUserById(req.body as userInfoRequest)

        const filteredUsers = {
            name: user.name,
            surname: user.surname,
            age: user.age,
            nickname: user.nickname
        }

        return res.json({
            data: filteredUsers,
            message: 'User'
        })
    })

    return router
}