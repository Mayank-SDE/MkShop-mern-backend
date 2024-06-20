import bcrypt from 'bcrypt';
import ErrorHandler from './utilityClass.js';

export const hashPassword = async (password: string) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    return new ErrorHandler('Password was not hashed', 400);
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    return new ErrorHandler('Error comparing password', 400);
  }
};
