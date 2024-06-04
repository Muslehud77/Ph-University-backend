import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { userModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const studentId = { id: id };

  if (!(await Student.isUserExists(id))) {
    throw new AppError(404, 'Student not found');
  }

  try {
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    );

    console.log(deletedStudent);

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete student');
    }

    //transaction -2
    const deletedUser = await userModel.findOneAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST,'Could not delete student')
  }
};

const updateStudentInDB = async (
  id: string,
  studentData: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } =
    studentData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*

   "student": {
      "name": {
        "firstName": "Alice",
        "middleName": "M",
        "lastName": "Smith"
      },

  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  /*

 "guardian": {
        "father": {
          "name": "John Smith",
          "occupation": "Engineer",
          "contactNumber": "1234567890"
        },
        "mother": {
          "name": "Jane Smith",
          "occupation": "Teacher",
          "contactNumber": "0987654321"
        }
      },

*/

  if (guardian && Object.keys(guardian).length) {
    for (const [parent, details] of Object.entries(guardian)) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`guardian.${parent}.${key}`] = value;
      }
    }
  }

  /*

  "localGuardian": {
        "name": "Robert Johnson",
        "occupation": "Doctor",
        "contactNumber": "1122334455",
        "address": "789 Local Guardian St, City, Country"
      },

*/

if(localGuardian && Object.keys(localGuardian).length){
  for(const [key,value] of Object.entries(localGuardian)){
    modifiedUpdatedData[`localGuardian.${key}`] = value
  }
}



  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    
  });
  return result;
};

export const studentServices = {
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};
