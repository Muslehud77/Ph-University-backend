import { Schema, model } from "mongoose";
import { TCourseFaculty } from "./courseFaculty.interface";




const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {type: Schema.Types.ObjectId,required:true,ref:"Course"},
    faculties : [{type:Schema.Types.ObjectId,ref:"Faculty"}]
})

export const CourseFaculty = model<TCourseFaculty>('CourseFaculty',courseFacultySchema);

