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
  name: {
    type: studentNameSchema,
    required: [true, 'Please! Enter your name.'],
  },
  //   name: {
  //     firstName: { type: String },
  //     lastName: { type: String },
  //   },
  gender: {
    type: String,
    enum: {
      values: ['Female', 'Male'],
      message: 'Gender must be Male or Female.{VALUE} is not valid',
    },
    required: true,
  }, //enum type
  email: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A', 'AB', 'B', 'O'],
  },
  guardian: {
    type: studentGuardianSchema,
    required: true,
  },
  //   guardian: {
  //     fatherName: { type: String },
  //     fatherOccupation: { type: String },
  //     fatherContact: { type: String },
  //     motherName: { type: String },
  //     motherContact: { type: String },
  //     motherOccupation: { type: String },
  //   },
  localGuardian: {
    type: studentLocalGuardianSchema,
    required: true,
  },
  //   localGuardian: {
  //     name: { type: String },
  //     occupation: { type: String },
  //     address: { type: String, required: true },
  //     contact: { type: String, required: true },
  //   },
  isActive: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
});

// create a model
export const StudentModel = model<Student>('Student', studentSchema); // may be here
