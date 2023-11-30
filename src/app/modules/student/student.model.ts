import { Schema, model /* connect */ } from 'mongoose';
import { Guardian, LocalGuardian, Name, Student } from './student.interface';
import validator from 'validator';

// Create a Schema corres

const studentNameSchema = new Schema<Name>({
  firstName: {
    type: String,
    required: true,
    maxlength: [20, 'First name is not more than 20 characers'],
    validate: function (data: string) {
      // console.log(data);
      const firstName =
        data.charAt(0).toUpperCase() + data.slice(1).toLocaleLowerCase();
      // console.log(firstName);
      return data === firstName;
    },
  },
  lastName: {
    type: String,
    validate: {
      validator: (data: string) => validator.isAlpha(data),
      message: 'Must be alpha',

      // {
      //   console.log(data);
      //   console.log(validator.isAlpha(data));
      // },
      // message: 'Corret',
    },
  },
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
    required: [true, 'Please! Enter your name.'], //extra message
  },
  //   name: {
  //     firstName: { type: String },
  //     lastName: { type: String },
  //   },
  gender: {
    type: String,
    enum: {
      values: ['Female', 'Male'],
      message: 'Gender must be Male or Female.{VALUE} is not valid', //value is user input
    },
    required: true,
  }, //enum type
  email: {
    type: String,
    validate: {
      validator: (data: string) => validator.isEmail(data),
      message: '{VALUE} is not email type ',
    },
    required: true,
  },
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
