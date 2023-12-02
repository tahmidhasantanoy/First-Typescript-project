// import { Schema, connection, model } from 'mongoose';

import { Model } from 'mongoose';

// Create an interface
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};

export type TName = {
  firstName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contact: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TName;
  gender: 'Male' | 'Female'; //type literal
  email: string;
  address: string;
  contact: string;
  bloodGroup?: 'A' | 'B' | 'AB' | 'O';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isActive: 'active' | 'inActive';
  isDeleted: boolean;
};

// custom instance method
export type InstanceStudentMethods = {
  isStudentExist(id: string): Promise<TStudent | null>;
};

export type InstanceStudentModel = Model<
  TStudent,
  Record<string, never>,
  InstanceStudentMethods
>;

// static method
export interface StaticStudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;
}
