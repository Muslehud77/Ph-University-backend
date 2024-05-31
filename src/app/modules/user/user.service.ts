import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';
import { generateStudentId } from './user.utils';


const createStudentIntoDB = async (password: string, studentData: TStudent) => {
 

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById({
    _id: studentData.admissionSemester,
  }) as TAcademicSemester;




  const userData: Partial<TUser> = {
    id: await generateStudentId(admissionSemester),
    password: password || config.defaultPassword,
    role: 'student',
  };

  //creating a user first

  const newUser = await userModel.create(userData);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
