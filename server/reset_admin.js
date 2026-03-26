import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const resetAdmin = async () => {
  await connectDB();
  
  const email = 'admin@example.com';
  const password = '123456';
  
  let user = await User.findOne({ email });
  
  if (user) {
    console.log('User found, updating password...');
    user.password = password; // Set plain text, let pre-save hook hash it
    user.isAdmin = true;
    user.status = 'active';
    await user.save();
    console.log('Admin user updated and password hashed by hook.');
  } else {
    console.log('User not found, creating new admin...');
    await User.create({
      name: 'Admin User',
      email,
      password,
      isAdmin: true,
      status: 'active'
    });
    console.log('Admin user created and password hashed by hook.');
  }
  
  // Verify again
  const verifiedUser = await User.findOne({ email });
  const isMatch = await verifiedUser.matchPassword(password);
  console.log('Final verification - Password match:', isMatch);
  
  process.exit();
};

resetAdmin();
