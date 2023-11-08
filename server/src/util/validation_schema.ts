import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';

export const IUserSchema = yup.object().shape({
  name: yup.string()
           .trim()
           .required("Name is missing.")
           .min(3, "Name is too short.")
           .max(20, "Name is too long."),
  email: yup.string()
            .required("Email is missing.")
            .email("Invalid email id."),
  password: yup.string()
               .trim()
               .required("Password is missing.")
               .min(8, "Password is too short.")
               .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password requires 1 lowercase, 1 uppercase, 1 number, and 1 special character.")
});

export const TokenAndIDValidation = yup.object().shape({
  token: yup.string()
            .trim()
            .required("Invalid token!"),
  userId: yup.string()
             .transform(function(value) { 
                if (this.isType(value) && isValidObjectId(value))
                  return value;
                return "";
             })
             .required("Invalid userId!")
});

export const UpdatePasswordSchema = yup.object().shape({
  token: yup.string()
            .trim()
            .required("Invalid token!"),
  userId: yup.string()
             .transform(function(value) { 
                if (this.isType(value) && isValidObjectId(value))
                  return value;
                return "";
             })
             .required("Invalid userId!"),
  password: yup.string()
               .trim()
               .required("Password is missing.")
               .min(8, "Password is too short.")
               .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/, "Password requires 1 lowercase, 1 uppercase, 1 number, and 1 special character.")
});

export const SignInValidationSchema = yup.object().shape({
  email: yup.string()
            .required("Email is missing.")
            .email("Invalid email id."),
  password: yup.string()
               .trim()
               .required("Password is missing.")
})