import { Request, Response } from 'express';
import { studentServices } from './student.sevice';

// Controller just work with req & res
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body; //get data

    // will call to service
    const serviceResult = await studentServices.createStudentIntoDB(student);

   // sending response 
    res.json({
      success: true,
      message: 'Student create successfully',
      data: serviceResult,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentController = {
  createStudent,
};
