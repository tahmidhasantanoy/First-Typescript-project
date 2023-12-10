import config from '../../config';
import { NewUser, TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TUser) => {
  const user: NewUser = {};

  //if admin not set password
  if (!password) {
    user.password = config.default_password as string;
  } else {
    user.password = password;
  }

  // set a role to student
  user.role = 'student';

  //we can't find auto generate id , so working manual id
  user.id = '2030010001';

  //   creating user first
  const result = await User.create(user);  //My Q is why all field aren't assign??

  //After creating user then create student
  if (Object.keys(result).length) {
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const userService = {
  createStudentIntoDB,
};
