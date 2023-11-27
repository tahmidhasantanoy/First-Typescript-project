import { Schema, connection, model } from 'mongoose';


// Create an interface
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  moherOccupation: string;
  motherContact: string;
};

export type Name = {
  firstName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  address: string;
  contact: string;
};

export type Student = {
  id: string;
  name: Name;
  gender: "Male" | "Female"; //type literal
  email: string;
  address: string;
  contact: string;
  bloodGroup?: 'A' | 'B' | 'AB' | 'O';
  guardian: Guardian;
  localGuardian: LocalGuardian;
  isActive : "active" | "inActive"
};
