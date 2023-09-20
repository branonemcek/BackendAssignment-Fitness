import {registerReq} from "../routes/registration";
import * as userDatabase from "../repository/User";
import * as jwtService from "../service/JwtService"
import {User} from "../repository/User";
import {logInMessage, logInReq} from "../routes/logIn";

export const unverified = 0;

export const registerNewAccount = async (request: registerReq) => {

const existUser = await userDatabase.findByEmailAndRole(request.email, request.role);
if(existUser != null) {
    console.log('User already exist');

    return existUser;
}

const createdUser = await userDatabase.create({
    email: request.email,
    password: request.password,
    name: request.name,
    nickname: request.nickname,
    surname: request.surname,
    age: request.age,
    role: request.role,
    verified: unverified
});

    await sendVerificationEmail(createdUser);

    return createdUser;
}

//in this case I used the user ID, in reality I would add additional columns to the users database (verification code..), and a function to generate this code, then I would use this unique code to verify the user
export const sendVerificationEmail = async (user: User): Promise<void> => {
    const url = "http://localhost:8000/verifyEmail/" + user.id;

    //TODO add and setup firebase
    console.log(url);
}

export const userVerified = async (userId: number): Promise<void> => {
    const user = await userDatabase.findById(userId);

    if(user == null) {
        console.log("User not found");
        console.log(userId);
    }

    user.verified = 1;
    //user.verification_code = "";
    await userDatabase.updateUser(user);
}


export const logIn = async (request: logInReq): Promise<logInMessage> => {
    const user = await userDatabase.findByEmail(request.email);
    const jwtToken = await jwtService.jwtWebTokenCreate(user.id);

    if (user == null) {
        console.log("Email is not correct!");
        return null;
    }

    if (user !== null) {
        try {
            if(request.password === user.password) {
                //const jwtToken = await jwtService.generateFromUser(user);
                //TODO ADD JWT TOKEN CREATE
                return {
                    userId: user.id,
                    token: jwtToken
                };
            }
            if(request.password != user.password) {
                console.log("Password is not correct!");
                return null;
            }
        } catch (error) {
            console.error("Error log In by email");
           return error;
        }
    }


}
