import { Request, Response } from 'express';
import { studentServices } from './student.sevice';
// import studentValidationSchema from './student.validation';
// import { z } from 'zod';
// import StudentValidationSchema from './student.validation';

// Controller just work with req & res
// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const student = req.body.student; //get data

//     /* joi validation */
//     // const { error, value } = StudentValidationSchema.validate(student)
//     // console.log(error, value);

//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Error is occured',
//     //     error: error.details,
//     //   });
//     // }

//     /* zod validation */
//     const zodParseData = StudentValidationSchema.parse(student);

//     // will call to service
//     const serviceResult =
//       await studentServices.createStudentIntoDB(zodParseData); //send validate data
//     // console.log(serviceResult); //don't find

//     // sending response
//     res.json({
//       success: true,
//       message: 'Student create successfully',
//       data: serviceResult,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Can't create student data",
//       data: err,
//     });

//     console.log(`catch err : ${err}`);
//   }
// };

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const getStudentResultFromDB = await studentServices.getAllData();

    res.status(200).json({
      success: true,
      message: 'All student are found',
      data: getStudentResultFromDB,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: err,
    });
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
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something is wrong',
      data: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const deleteStudentResult =
      await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted student',
      data: deleteStudentResult,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      Error: err,
    });
  }
};

export const studentController = {
  // createStudent,
  getAllStudent,
  getSingleStudent,
  deleteStudent,
};
