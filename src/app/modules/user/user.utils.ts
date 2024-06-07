import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { Admin } from '../admin/admin.model';

import { userModel } from './user.model';

// for making id we will need year, semesterCode and 4 digit number

const findLastStudentId = async () => {
  const lastStudent = await userModel
    .findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = '0';
  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payload.code;
  const currentSemesterYear = payload.year;

  //if lastSemester year and code matches with the current year and code it will reassign the value of currentId with lastStudent id otherwise the the id counting will start again
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentSemesterYear === currentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdmin = (await Admin.findOne().sort('-createdAt').select('id')) as {
    [key: string]: string;
  };

  return lastAdmin?.id ? lastAdmin.id : null;
};

export const generateAdminId = async () => {
  const lastAdminId = await findLastAdminId();
 
  let id = '0';
  if (lastAdminId) {
    const increment = (Number(lastAdminId.substring(1, 5)) + 1)
      .toString()
      .padStart(4, '0');
    id = `A${increment}`;
  } else {
    id = `A${(Number(id) + 1).toString().padStart(4, '0')}`;
  }
  return id as string;
};
