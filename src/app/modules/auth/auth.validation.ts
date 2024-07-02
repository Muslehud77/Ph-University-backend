import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required.' }),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});

const changePasswordSchema = z.object({
  body: z.object({
    // id: z.string({ required_error: 'Id is required.' }),
    newPassword: z.string({ required_error: 'Password is required.' }),
    oldPassword: z.string({ required_error: 'Old Password is required.' }),
  }),
});


const refreshTokenValidationSchema = z.object({
  cookies: z.object({
   
    refreshToken: z.string({ required_error: 'RefreshToken is required.' }),
    
  }),
});


const forgetPasswordValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: "User id required"
    })
  })
})


export const AuthValidation = {
  loginValidationSchema,
  changePasswordSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidation,
};
