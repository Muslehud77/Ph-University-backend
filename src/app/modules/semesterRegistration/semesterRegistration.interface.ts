import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  startDate : string;
  endDate : string;
  startTime: string;
  endTime: string  
};
