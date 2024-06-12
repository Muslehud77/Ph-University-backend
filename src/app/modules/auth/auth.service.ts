import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { userModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (loginUserData : TLoginUser)=>{

  
    //check if the user is exist

    const isUserExists = await userModel.findOne({id:loginUserData.id})
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND,"User does not exists!")
    }

    //check if the user is deleted
    if(isUserExists.isDeleted !== false){
        throw new AppError(httpStatus.FORBIDDEN,"User is deleted!")
    }
    //check if the user is blocked
    if(isUserExists.status === "blocked"){
        throw new AppError(httpStatus.FORBIDDEN,"User is blocked!")
    }

    //Access Granted : Send AccessToken , RefreshToken

}

export const authServices = {
    loginUser
}