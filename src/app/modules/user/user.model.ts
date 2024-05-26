import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

const requiredString = {type:String,required:true} 

const userSchema = new Schema<TUser>({
  id: requiredString,
  password: requiredString,
  isPasswordNeedsChange: { type: Boolean,default:true },
  role: {type:String, enum: {values:['student','admin','faculty']},required:true },
  status: {type:String, enum: {values:['in-progress','blocked','faculty']},default:"in-progress" },
  isDeleted: {type:Boolean,default:false}
},{
    timestamps:true
});


export const userModel = model<TUser>('User',userSchema)