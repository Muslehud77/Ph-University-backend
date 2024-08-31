import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { EnrolledCourse } from './enrolledCourse.model';

import mongoose from 'mongoose';
import { TSemesterRegistration } from '../semesterRegistration/semesterRegistration.interface';
import { TCourse } from '../course/course.interface';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { calculateGradeAndPoints } from './enrolledCourse.utils';

import { userModel } from '../user/user.model';
import { TUserRole } from '../user/user.interface';
import { USER_ROLE } from '../user/user.constant';
import { JwtPayload } from 'jsonwebtoken';
import { TFaculty } from '../faculty/faculty.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const createEnrolledCourseIntoDB = async (
  id: string,
  data: { offeredCourse: string },
) => {
  //Step-1 : Check if the offered course is exists
  //Step-2 : Check if the student is already enrolled
  //step-3 : Check total credit exceeds max credit
  //Step-4 : Create an enrolled course
  //Step-5 : Update the seats on offeredCourse

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //Step-1 : Check if the offered course is exists
    const isOfferedCourseExists = await OfferedCourse.findById({
      _id: data.offeredCourse,
    })
      .populate('semesterRegistration')
      .populate('course');

    if (!isOfferedCourseExists) {
      throw new AppError(404, 'Offered course is not exists');
    }

    const {
      academicDepartment,
      semesterRegistration,
      academicSemester,
      academicFaculty,
      course,
      faculty,
      _id,
      maxCapacity,
    } = isOfferedCourseExists;

    if (maxCapacity <= 0) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'No seats left for this offered course',
      );
    }

    const { _id: student } = (await Student.findOne({ id })) as TStudent & {
      _id: string;
    };

    //Step-2 : Check if the student is already enrolled
    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
      semesterRegistration: semesterRegistration._id,
      offeredCourse: data.offeredCourse,
      student,
    });

    if (isStudentAlreadyEnrolled) {
      throw new AppError(httpStatus.CONFLICT, 'Student Already Enrolled!');
    }

    //step-3 : Check total credit exceeds max credit

    const enrolledCourses = await EnrolledCourse.aggregate([
      { $match: { semesterRegistration: semesterRegistration._id, student } },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'EnrolledCourses',
        },
      },
      {
        $unwind: '$EnrolledCourses',
      },
      {
        $group: {
          _id: null,
          totalEnrolledCredits: { $sum: '$EnrolledCourses.credits' },
        },
      },
    ]);

    const courseCredit = (course as unknown as TCourse).credits;
    const maxCredit = (semesterRegistration as unknown as TSemesterRegistration)
      .maxCredit;

    const totalEnrolledCredits = enrolledCourses.length
      ? enrolledCourses[0].totalEnrolledCredits
      : 0;

    const totalExpectedCredits = courseCredit + totalEnrolledCredits;

    if (totalExpectedCredits > maxCredit) {
      throw new AppError(httpStatus.FORBIDDEN, 'Reached maximum credit limit!');
    }
    //Step-4 : Create an enrolled course
    const result = await EnrolledCourse.create(
      [
        {
          academicDepartment,
          semesterRegistration: semesterRegistration._id,
          academicSemester,
          academicFaculty,
          course: course._id,
          faculty,
          offeredCourse: data.offeredCourse,
          student,
          isEnrolled: true,
        },
      ],
      { session },
    );

    await OfferedCourse.findByIdAndUpdate(
      { _id },
      { maxCapacity: maxCapacity - 1 },
      { session },
    );

    await session.commitTransaction();
    await session.endSession();

    return result[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      400,
      error.message || 'Something went wrong while creating enrolledCourse',
    );
  }
};

const updateEnrolledCourseIntoDB = async (
  id: string,
  enrolledCourseData: Partial<TEnrolledCourse>,
) => {
  const faculty = await Faculty.findOne({ id },{_id:1});

  if (!faculty) {
    throw new AppError(404, 'Faculty not found');
  }

  const { semesterRegistration, offeredCourse, student, courseMarks } =
    enrolledCourseData;

  
  const isOfferedCourseExists = await OfferedCourse.findById({
    _id: offeredCourse,
  });

  if (!isOfferedCourseExists) {
    throw new AppError(404, 'Offered course is not exists');
  }
  const isStudentExists = await Student.findById({
    _id: student,
  });

  if (!isStudentExists) {
    throw new AppError(404, 'Student does not exists');
  }
  const isSemesterRegistrationExists = await SemesterRegistration.findById({
    _id: semesterRegistration,
  });

  if (!isSemesterRegistrationExists) {
    throw new AppError(404, 'SemesterRegistration does not exists');
  }

  const isEnrolledCourseExists = await EnrolledCourse.findOne(
    {
      faculty: faculty._id,
      semesterRegistration,
      offeredCourse,
      student,
    },
    { _id: 1, courseMarks :1},{new:true}
  );

  if(!isEnrolledCourseExists){
    throw new AppError(httpStatus.BAD_REQUEST, 'Enrolled Course does not match with the faculty or something does not match');
  }


  
  let totalMarks = 0 
  
  if(courseMarks?.finalTerm){
    const {classTest1,classTest2,midTerm} = isEnrolledCourseExists.courseMarks
    
    totalMarks = classTest1 + classTest2 + midTerm + courseMarks?.finalTerm;
    
  }
  
  const { grade, gradePoints } = calculateGradeAndPoints(totalMarks);
  const isCompleted = courseMarks?.finalTerm ? true : false;
  
  
  
  const modifiedData : Record<string,unknown> = {}

  if(courseMarks && Object.keys(courseMarks).length){
    for(const [key,value] of Object.entries(courseMarks)){
      modifiedData[`courseMarks.${key}`] = value
    }
  }


  const result = await EnrolledCourse.findByIdAndUpdate(
    { _id: isEnrolledCourseExists._id },
    { ...modifiedData, grade, gradePoints, isCompleted },
    { new: true },
  ); 

 return result
};

const getAllEnrolledCoursesFromDB = async (user:JwtPayload,query : Record<string,unknown>)=>{

  if(user.role === USER_ROLE.faculty){
    
    
    const {_id} = await Faculty.findOne({id:user.id}).select("_id") as Pick<TFaculty,"_id">
    
    const enrollCOurseQuery = new QueryBuilder(
      EnrolledCourse.find({ faculty: _id }).populate(
        'semesterRegistration academicSemester academicFaculty offeredCourse academicDepartment course faculty student',
      ),
      query,
    )
      .search([])
      .filter()
      .sort()
      .paginate()
      .fieldQuery();
   
       const result = await enrollCOurseQuery.modelQuery;

       const meta = await enrollCOurseQuery.countTotal();

    return {result,meta};
  }else{
     const enrollCOurseQuery = new QueryBuilder(
       EnrolledCourse.find().populate(
         'semesterRegistration academicSemester academicFaculty offeredCourse academicDepartment course faculty student',
       ),
       query,
     )
       .search([])
       .filter()
       .sort()
       .paginate()
       .fieldQuery();

     const result = await enrollCOurseQuery.modelQuery;

     const meta = await enrollCOurseQuery.countTotal();

     return { result, meta };
  }

  
}

const getMyEnrolledCoursesFromDB = async(id:string)=>{
  await userModel.isUserHasAccess(id)
  const {_id} = await Student.findOne({id}).populate('_id') as {_id:string}

  const enrolledCourses = await EnrolledCourse.find({ student: _id }).populate(
    'semesterRegistration academicSemester academicFaculty offeredCourse academicDepartment course faculty',
  );

  return enrolledCourses;
  

}

export const enrolledCourseServices = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseIntoDB,
  getAllEnrolledCoursesFromDB,
  getMyEnrolledCoursesFromDB,
};
