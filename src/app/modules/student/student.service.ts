import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import { userModel } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findById({ _id: id })
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

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldQuery();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal()
  
  return {result,meta};
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const studentId = { _id: id };

  if (!(await Student.isUserExists(id))) {
    throw new AppError(404, 'Student not found');
  }

  try {
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findByIdAndUpdate(
      studentId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete student');
    }

    //transaction -2
    const deletedUser = await userModel.findOneAndUpdate(
      { _id: deletedStudent?.user },
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
    throw new AppError(httpStatus.BAD_REQUEST, 'Could not delete student');
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

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
    },
  );
  return result;
};

export const studentServices = {
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
  updateStudentInDB,
};

//* old code for filtering sorting pagination fields

// const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
// Define searchable fields for students
// const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

// Destructure the query object to extract specific parameters
// const { searchTerm, sort, limit, page, fields, ...queryObject } = query;

// Define the search term, defaulting to an empty string if not provided
// const search = searchTerm || '';

// Create the search query to find students based on searchable fields
// const searchQuery = Student.find({
//   $or: studentSearchableFields.map(field => ({
//     [field]: { $regex: search, $options: 'i' }, // Use regular expressions for case-insensitive search
//   })),
// });

// Apply additional query filters and populate related fields
// const filterQuery = searchQuery
//   .find(queryObject)
//   .populate('user')
//   .populate('admissionSemester')
//   .populate({
//     path: 'academicDepartment',
//     populate: {
//       path: 'academicFaculty',
//     },
//   });

// Determine sorting order, defaulting to '-createdAt' if not provided
// const sorting = (sort as string) || '-createdAt';

// Apply sorting to the query
// const sortQuery = filterQuery.sort(sorting);

// Determine pagination parameters, defaulting to page 1 and no limit if not provided
// const pageNumber = Number(page as string) || 1;
// const limitDataCount = Number(limit as string) || 0;
// const skip = page ? (pageNumber - 1) * limitDataCount : 0;

// Apply pagination to the query
// const paginateQuery = sortQuery.skip(skip).limit(limitDataCount);

// Define the fields to show in the result, defaulting to excluding '__v' if not provided
// const fieldsToShow = fields ? (fields as string).replace(',', ' ') : '-__v';

// Select only the specified fields in the final query
// const fieldQuery = await paginateQuery.select(fieldsToShow);

// Return the final query result
// return fieldQuery;
// };
