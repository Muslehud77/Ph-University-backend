import { TStudent } from './student.interface';
import { Student } from './student.model';


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
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
};
