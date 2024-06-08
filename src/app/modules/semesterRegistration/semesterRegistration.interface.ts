import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'upcoming' | 'ongoing' | 'ended';
  startDate : Date;
  endDate : Date;
  startTime: Date;
  endTime: Date  
};
