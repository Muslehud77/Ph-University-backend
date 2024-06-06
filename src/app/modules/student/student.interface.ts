import { Model, Types } from 'mongoose';
import { TUserName } from '../../interfaceSchemaValidation/userName';

export type TGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
};

export interface TLocalGuardian extends TGuardian {
  address: string;
}

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: {
    father: TGuardian;
    mother: TGuardian;
  };
  localGuardian: TLocalGuardian;
  profileImg?: string;

  isDeleted: boolean;
};

//* for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

//*for creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
