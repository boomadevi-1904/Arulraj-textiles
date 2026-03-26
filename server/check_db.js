import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const checkUser = async () => {
  const admin = await User.findOne({ email: 'admin@example.com' });
  if (admin) {
    console.log('Admin found:', admin.email);
    const isMatch = await admin.matchPassword('123456');
    console.log('Password match:', isMatch);
  } else {
    console.log('Admin not found');
  }
  process.exit();
};

checkUser();
