import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  
  // creating instance from studentModel with interface
  const studentInstanceFromStudentModel = new Student(studentData); //create instance
  
  /* Custom method */
  // if (await studentInstanceFromStudentModel.isStudentExist(studentData.id)) {
    //   throw new Error('User already exist.');
    // }
    
    /* Instance method */
    if (await Student.isUserExist(studentData.id)) {
      throw new Error('User already exist');
    }
    
    // const result = await Student.create(studentData); //built in instance from model || insert student data
    const result = studentInstanceFromStudentModel.save(); //built in instance method || insert student data
  // console.log(result); // why data not stored

  return result;
};

const getAllData = async () => {
  const getStudentResultFromDB = await Student.find();
  return getStudentResultFromDB;
};

const getSingleStudent = async (studentId: string) => {
  // const singleStudent = await Student.findOne({ id: studentId });

  const singleStudent = await Student.aggregate([
    { $match: { id: studentId } },
  ]);
  return singleStudent;
};

const deleteStudentFromDB = async (studentId: string) => {
  const deleteResult = await Student.updateOne(
    { id: studentId },
    { isDeleted: true },
  );
  return deleteResult;
};

//custom static method

export const studentServices = {
  createStudentIntoDB,
  getAllData,
  getSingleStudent,
  deleteStudentFromDB,
};
