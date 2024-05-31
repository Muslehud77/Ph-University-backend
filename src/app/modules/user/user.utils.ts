import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { Student } from "../student/student.model";
import { StudentModel } from './../student/student.interface';
import { userModel } from "./user.model";

// for making id we will need year semesterCode 4 digit number

const lastStudentId = async ()=>{
    const lastStudent = await userModel
      .findOne({ role: 'student' }, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();
    return lastStudent?.id ? lastStudent?.id.slice(-4) : undefined;
}

export const generateStudentId = async (payload: TAcademicSemester) => {
   
    const currentId = await lastStudentId() || '0'
    // getting the last student id
   
      let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
      incrementId = `${payload.year}${payload.code}${incrementId}`;
      return incrementId;
   
};
