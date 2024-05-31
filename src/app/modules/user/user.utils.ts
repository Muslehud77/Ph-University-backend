import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

import { userModel } from "./user.model";

// for making id we will need year semesterCode 4 digit number

const findLastStudentId = async ()=>{
    const lastStudent = await userModel
      .findOne({ role: 'student' }, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();
    return lastStudent?.id ? lastStudent?.id : undefined;
}

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = '0'
    const lastStudentId = await findLastStudentId();
    const lastStudentSemesterYear = lastStudentId?.substring(0,4)
    const lastStudentSemesterCode = lastStudentId?.substring(4,6)
    const currentSemesterCode = payload.code
    const currentSemesterYear = payload.year

    //if lastSemester year and code matches with the current year and code it will reassign the value of currentId with lastStudent id otherwise the the id counting will start again 
    if(lastStudentId&& lastStudentSemesterCode=== currentSemesterCode && lastStudentSemesterYear === currentSemesterYear){
        currentId = lastStudentId.substring(4)
    }
   
   
      let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
      incrementId = `${payload.year}${payload.code}${incrementId}`;
      return incrementId;
   
};
