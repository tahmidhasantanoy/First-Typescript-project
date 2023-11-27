import { Student } from './student.interface';
import { StudentModal } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModal.create(student);  //insert student data 
  return result;
};

export const studentServices = {
  createStudentIntoDB,
};
