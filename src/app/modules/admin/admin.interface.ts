import { Types } from 'mongoose';
import { TUserName } from '../../interfaceSchemaValidation/userName';

export type TAdmin = {
  id: string;
  user: Types.ObjectId;

  designation: string;
  name: TUserName;
  gender: 'male' | 'female' | 'others';
  dateOfBirth?: string;
  email: string;
  contactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: boolean;
};
