import { Types } from "mongoose";

export type TCourseMarks = {
    classTest1 : number;
    midterm:number;
    classTest2:number;
    finalTerm: number
}


export type TEnrolledCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  offeredCourse: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  student: Types.ObjectId;
  isEnrolled : boolean;
  courseMarks: TCourseMarks;
  grade: "A+" | "A" | "A-" | "B" | "B-" | "C" | "D" | "F" | "N/A"
  gradePoints: number;
  isCompleted: boolean;
};