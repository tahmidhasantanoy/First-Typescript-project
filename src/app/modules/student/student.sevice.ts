import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);//built in instance from model || insert student data

  // creating instance from studentModel with interface
  const studentInstanceFromStudentModel = new Student(studentData); //create instance

  if (await studentInstanceFromStudentModel.isStudentExist(studentData.id)) {
    throw new Error('User already exist.');
  }

  const result = studentInstanceFromStudentModel.save(); //built in instance method || insert student data
  // console.log(result); // why data not stored

  return result;
};

const getAllData = async () => {
  const getStudentResultFromDB = await Student.find();
  return getStudentResultFromDB;
};

const getSingleStudent = async (studentId: string) => {
  const singleStudent = await Student.findOne({ id: studentId });
  return singleStudent;
};

// studentSchema.methods.isStudentExist = async (id: string) => {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

export const studentServices = {
  createStudentIntoDB,
  getAllData,
  getSingleStudent,
};
