import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

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



//pre save middleware/hook : will work on create() save() method
userSchema.pre('save', async function () {
  //hashing password and save into DB
  const user = this as TUser;
  const encryptedPassword = await bcrypt.hash(user.password, config.hashSaltRounds);

  user.password = encryptedPassword;
});

//post save middleware/hook
userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook : we saved our data');

  doc.password = '';

  next();
});


export const userModel = model<TUser>('User',userSchema)