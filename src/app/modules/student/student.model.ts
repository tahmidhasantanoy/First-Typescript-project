import { Schema, model /* connect */ } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TName,
  TStudent,
  // InstanceStudentMethods,
  InstanceStudentModel,
  StaticStudentModel,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

// Create a Schema 
const studentNameSchema = new Schema<TName>({
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

const studentGuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String },
  motherContact: { type: String, required: true },
});

const studentLocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String },
  address: { type: String, required: true },
  contact: { type: String, required: true },
});

export const studentSchema = new Schema<
  TStudent,
  InstanceStudentModel,
  StaticStudentModel
  // InstanceStudentMethods
>(
  {
    id: { type: String },
    password: {
      type: String,
      max: [20, 'password not over 20 characters'],
      required: [true, 'Please! Enter your name.'], //extra message
    },
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

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true }, //call virtual when json data is coming
  },
);

// Mongoose middleware pre | hooks
studentSchema.pre('save', async function (next) {
  console.log(this, 'pre hook : work before save our data');

  // hash password
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

// Mongoose middleware post | hooks
studentSchema.post('save', function (doc, next) {
  console.log(this, 'post hook : work after save our data');
  doc.password = ''; //Password field show empty
  next();
});

// Mongoose middleware query | hooks
studentSchema.pre('find', function (next) {
  console.log(this);
  this.find({ isDeleted: /* false */ { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  console.log(this);
  this.find({ isDeleted: /* false */ { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Schema for custom instance methods
studentSchema.methods.isStudentExist = async function (id: string) {
  const existingStudentResult = await Student.findOne({ id: id });
  return existingStudentResult;
};

// Schema for custom static methods
studentSchema.static('isUserExist', async function existUserOrNot(id: string) {
  const existingStudentResult = await Student.findOne({ id: id });
  return existingStudentResult;
});

// Mongoose virtual
studentSchema.virtual('full-name').get(function () {
  return `${this.name.firstName} ${this.name.lastName}`;
});

// create a model
export const Student = model<
  TStudent,
  StaticStudentModel /* InstanceStudentModel */
>('Student', studentSchema); // creating model based on Student interface || student =  Model
