import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(student);//built in instance from model || insert student data

  // creating instance from studentModel with interface
  const studentInstanceFromStudentModel = new StudentModel(studentData);
  const result = studentInstanceFromStudentModel.save(); //built in instance method
  // console.log(result); // why data not stored
  return result;
};

const getAllData = async () => {
  const getStudentResultFromDB = await StudentModel.find();
  return getStudentResultFromDB;
};

const getSingleStudent = async (studentId: string) => {
  const singleStudent = await StudentModel.findOne({ id: studentId });
  return singleStudent;
};

export const studentServices = {
  createStudentIntoDB,
  getAllData,
  getSingleStudent,
};
