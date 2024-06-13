import { Types } from 'mongoose';

export type TDays =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type TAssignedSchedules = [
  {
    days: TDays[];
    startTime: string;
    endTime: string;
  },
];

export type TNewSchedules = {
  days: TDays[];
  startTime: string;
  endTime: string;
};

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDays[];
  startTime: string;
  endTime: string;
};
