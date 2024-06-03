import { TStudent } from './student.interface';
import { Student } from './student.model';


const getStudentByIdFromDB = async (id: string) => {
 
  const result = await Student.findById({ _id: id })
    .populate('user')
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });;

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
  const studentId = { id: id };
  const result = await Student.updateOne(studentId, { isDeleted: true });
  return result;
};

export const studentServices = {
  getStudentByIdFromDB,
  getAllStudentsFromDB,
  deleteStudentFromDB,
};
