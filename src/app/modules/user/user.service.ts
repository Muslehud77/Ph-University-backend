import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { userModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {
    id: '203010001',
    password: password || config.defaultPassword,
    role: 'student',
  };

  //creating a user first 
  const result = await userModel.create(userData);

  if(Object.keys(result).length){
    studentData.id = result.id
    studentData.user =  result._id
  }

  const student = await Student.create()

  return result;
};

export const userServices = {
  createStudentIntoDB,
};
