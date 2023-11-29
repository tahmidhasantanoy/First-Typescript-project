import { Request, Response } from 'express';
import { studentServices } from './student.sevice';

// Controller just work with req & res
const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student; //get data

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
