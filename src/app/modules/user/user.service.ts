import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';
import { userValidation } from './user.validation';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {
    id: '203010001',
    password: password || config.defaultPassword,
    role: 'student',
  };

  //creating a user first 
 
  const newUser = await userModel.create(userData);
  // console.log(newUser);
  console.log(studentData);
  if(Object.keys(newUser).length){
    studentData.id = newUser.id
    studentData.user =  newUser._id
    const newStudent = await Student.create(studentData)
    return newStudent
  }

};

export const userServices = {
  createStudentIntoDB,
};
