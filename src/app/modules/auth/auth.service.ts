import { TLoginUser } from "./auth.interface";

const loginUser = async (loginUserData : TLoginUser)=>{

    console.log(loginUserData);

}

export const authServices = {
    loginUser
}