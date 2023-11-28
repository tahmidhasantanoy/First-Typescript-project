import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student); //insert student data

  console.log(result); // why data not stored
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
