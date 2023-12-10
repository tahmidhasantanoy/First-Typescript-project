import z from 'zod';

//admin created student here
export const userValidationSchema = z.object({
  // id : z.string(),
  password: z
    .string({
      invalid_type_error: 'Password is require',
    })
    .optional(),
  //   needPasswordChange: z.boolean().default(true).optional(), //we set this from model
  //   role: z.enum(['student', 'faculty', 'admin']), //role is define by their url(user url)
  //   status: z.enum(['In-progress', 'Blocked']),//so admin don't need to say exlicitly this
  //   isDeleted: z.boolean().default(false).optional(), // admin says default is false
});
