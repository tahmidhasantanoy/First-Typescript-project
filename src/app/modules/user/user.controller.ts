import { Request, Response } from 'express';
import { userService } from './user.service';
import { userValidationSchema } from './user.validation';

const createStudent = async (req: Request, res: Response) => {
    try {
      const {password,student} = req.body.student; //get data
  
      /* joi validation */
      // const { error, value } = StudentValidationSchema.validate(student)
      // console.log(error, value);
  
      // if (error) {
      //   res.status(500).json({
      //     success: false,
      //     message: 'Error is occured',
      //     error: error.details,
      //   });
      // }
  
      /* zod validation */
      const zodParseData = userValidationSchema.parse(student);
  
      // will call to service
      const serviceResult =
        await userService.createStudentIntoDB(password,student); //send validate data
      // console.log(serviceResult); //don't find
  
      // sending response
      res.json({
        success: true,
        message: 'Student create successfully',
        data: serviceResult,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "Can't create student data",
        data: err,
      });
  
      console.log(`catch err : ${err}`);
    }
  };

    res.status(200).json({
      success: true,
      message: 'Student create Successfully',
      data: createStudentResult,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: err,
    });
  }
};

export const userController = {
  createStudent,
};
