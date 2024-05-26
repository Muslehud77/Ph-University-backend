import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const student = new Student(studentData); // create an instance

  // const result = await student.save(); // build in instance method

  // if(await student.isUserExists(studentData.id)){
  //   throw new Error("User already exists!")
  // }

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }

  const result = await Student.create(studentData); // build in static method

  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  // const studentId = { id: id };

  // const result = await Student.findOne(studentId);
  const result = await Student.aggregate([{ $match: { id } }]);

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const studentId = { id: id };
  const result = await Student.updateOne(studentId, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
};
