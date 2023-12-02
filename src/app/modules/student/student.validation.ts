/* Validation happened here */
// import Joi from 'joi';
import { z } from 'zod';

// user validation ujsing joi schema
// const studentNameSchema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string().required(),
// });

// const studentGuardianSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   fatherContact: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required(),
//   motherContact: Joi.string().required(),
// });

// const studentLocalGuardianSchema = Joi.object({
//   name: Joi.string().required(),
//   occupation: Joi.string().required(),
//   address: Joi.string().required(),
//   contact: Joi.string().required(),
// });

// const studentValidationSchema = Joi.object({
//   id: Joi.string(),
//   name: studentNameSchema.required(),
//   gender: Joi.string().valid('Female', 'Male').required(),
//   email: Joi.string().email().required(),
//   address: Joi.string().required(),
//   contact: Joi.string().required(),
//   bloodGroup: Joi.string().valid('A', 'AB', 'B', 'O'),
//   guardian: studentGuardianSchema.required(),
//   localGuardian: studentLocalGuardianSchema.required(),
//   isActive: Joi.string().valid('active', 'inActive').default('active'),
// });



 // validation uising zod schema
const NameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (data) =>
        data ===
        data.charAt(0).toUpperCase() + data.slice(1).toLocaleLowerCase(),
      {
        message:
          'First name should start with an uppercase letter followed by lowercase letters',
      },
    ),
  lastName: z.string().refine((data) => /^[A-Za-z]+$/.test(data), {
    message: 'Last name must only contain alphabetic characters',
  }),
});

const GuardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContact: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContact: z.string(),
});

const LocalGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  address: z.string(),
  contact: z.string(),
});

const StudentValidationSchema = z.object({
  id: z.string(),
  password : z.string().max(20),
  name: NameSchema,
  gender: z
    .enum(['Female', 'Male'])
    .refine((data) => data === 'Female' || data === 'Male', {
      message: 'Gender must be Female or Male',
    }),
  email: z.string().email(),
  address: z.string(),
  contact: z.string(),
  bloodGroup: z.enum(['A', 'AB', 'B', 'O']),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  isActive: z.enum(['active', 'inActive']).default('active'),
});

export default StudentValidationSchema;
