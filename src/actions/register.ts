'use server';

import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const register = async (values: {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
}) => {
  const { email, password, name, surname, username } = values;

  try {
    await connectDB();

    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: 'Email already exists!' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      name,
      surname,
      password: hashedPassword,
    });

    await user.save();

    return { success: 'User registered successfully!' };
  } catch (e) {
    console.error('Error during registration:', e);
    return { error: 'An unexpected error occurred during registration' };
  }
};
