/* Validation happened here */
import Joi from 'joi';

// user validation ujsing joi schema
const studentNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const studentGuardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContact: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContact: Joi.string().required(),
});

const studentLocalGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  address: Joi.string().required(),
  contact: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string(),
  name: studentNameSchema.required(),
  gender: Joi.string().valid('Female', 'Male').required(),
  email: Joi.string().email().required(),
  address: Joi.string().required(),
  contact: Joi.string().required(),
  bloodGroup: Joi.string().valid('A', 'AB', 'B', 'O'),
  guardian: studentGuardianSchema.required(),
  localGuardian: studentLocalGuardianSchema.required(),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
});

export default studentValidationSchema;
