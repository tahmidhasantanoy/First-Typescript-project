import { Schema, model /* connect */ } from 'mongoose';
import { Guardian, LocalGuardian, Name, Student } from './student.interface';

// Create a Schema corres

const studentNameSchema = new Schema<Name>({
  firstName: { type: String, required: true },
  lastName: { type: String },
});

const studentGuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  moherOccupation: { type: String },
  motherContact: { type: String, required: true },
});

const studentLocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: studentNameSchema,
  //   name: {
  //     firstName: { type: String },
  //     lastName: { type: String },
  //   },
  gender: ['Female', 'Male'], //enam type
  email: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  bloodGroup: ['A', 'AB', 'B', 'O'],
  guardian: studentGuardianSchema,
  //   guardian: {
  //     fatherName: { type: String },
  //     fatherOccupation: { type: String },
  //     fatherContact: { type: String },
  //     motherName: { type: String },
  //     motherContact: { type: String },
  //     motherOccupation: { type: String },
  //   },
  localGuardian: studentLocalGuardianSchema,
  //   localGuardian: {
  //     name: { type: String },
  //     occupation: { type: String },
  //     address: { type: String, required: true },
  //     contact: { type: String, required: true },
  //   },
  isActive: ['active', 'inActive'],
});

// create a model
export const StudentModel = model<Student>('Student', studentSchema); // may be here
