import { Student } from './student.interface';
import { StudentModal } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModal.create(student); //insert student data

  console.log(result); // why data not stored
  return result;
};

const getAllData = async () => {
  const getStudentResultFromDB = await StudentModal.find();
  return getStudentResultFromDB;
};


export const studentServices = {
  createStudentIntoDB,
  getAllData,
};
