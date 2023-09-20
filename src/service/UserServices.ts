import * as userDatabase from "../repository/User"
import {userInfoRequest} from "../routes/getUser";
import {userUpdateRequest} from "../routes/userUpdate";
import {User} from "../repository/User";

export const getUserById = async (request: userInfoRequest) => {
    const user = await userDatabase.findById(request.id);
    return user
}

export const getAllUsers = async () => {
    const allUsers = await userDatabase.getAllUsers();
    return allUsers
}

export const userUpdate = async (user: userUpdateRequest) => {
    const userDb = await userDatabase.findById(user.id);
    if (userDb == null) {
        console.log("User not found");
        return;
    }
    //TODO rework user update solution update each row separately

    const updatedUser = await userDatabase.updateUser(user as User);
    return updatedUser;
}

export const getAllUsersNoAdmin = async () => {
    const allUsers = await userDatabase.getAllUsers();
    return allUsers;
}