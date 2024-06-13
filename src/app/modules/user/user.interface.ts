import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";
export type TUserRole = keyof typeof USER_ROLE
export interface TUser {
    id: string;
    password:string;
    isPasswordNeedsChange:boolean;
    role: 'student' | 'admin' | 'faculty';
    status : 'in-progress' | 'blocked';
    isDeleted:boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isUserHasAccess(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
