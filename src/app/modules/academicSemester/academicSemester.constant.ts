import {
  TAcademicSemesterCode,
  TAcademicSemesterCodeMapper,
  TAcademicSemesterName,
  TMonth,
} from './academicSemester.interface';

export const AcademicMonths: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];


 export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

export const AcademicNames: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const AcademicCodes: TAcademicSemesterCode[] = ['01', '02', '03'];
