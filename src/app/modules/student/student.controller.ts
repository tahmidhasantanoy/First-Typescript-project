import { Request, Response } from 'express';
import { studentServices } from './student.sevice';
import Joi from 'joi';

// Controller just work with req & res
const createStudent = async (req: Request, res: Response) => {
  try {
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

    const studentSchema = Joi.object({
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

    const student = req.body.student; //get data

    const { error, value } = studentSchema.validate(student);
    console.log(error, value);

    // will call to service
    const serviceResult = await studentServices.createStudentIntoDB(student);
    // console.log(serviceResult); //don't find

    // sending response
    res.json({
      success: true,
      message: 'Student create successfully',
      data: serviceResult,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Can't create student data",
      data: err,
    });

    console.log(`catch err : ${err}`);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const getStudentResultFromDB = await studentServices.getAllData();

    res.status(200).json({
      success: true,
      message: 'All student are found',
      data: getStudentResultFromDB,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params; //des
    const singleStudentResultFromDB =
      await studentServices.getSingleStudent(studentId);

    res.status(200).json({
      success: true,
      message: 'One student data is found',
      data: singleStudentResultFromDB,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentController = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
