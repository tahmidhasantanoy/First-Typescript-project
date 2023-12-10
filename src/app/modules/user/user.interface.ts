export type TUser = { //T for type
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'student' | 'faculty' | 'admin';
  status: 'In-progress' | 'Blocked';
  isDeleted: boolean;
};


export type NewUser = {
    password: string;
    role: string;
    id: string;
  };
