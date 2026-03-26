import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const testLogin = async () => {
  await connectDB();
  
  const email = 'admin@example.com';
  const password = '123456';
  
  const user = await User.findOne({ email });
  
  if (user) {
    console.log('User found:', user.email);
    console.log('User isAdmin:', user.isAdmin);
    console.log('User status:', user.status);
    console.log('Stored hash:', user.password);
    
    const isMatch = await user.matchPassword(password);
    console.log('Password match (matchPassword method):', isMatch);
    
    const isDirectMatch = await bcrypt.compare(password, user.password);
    console.log('Password match (direct bcrypt.compare):', isDirectMatch);
    
    // Check if it's double hashed
    // A single hash starts with $2a$ or $2b$ and has length around 60
    // If we hash '123456' manually once:
    const manualHash = bcrypt.hashSync(password, 10);
    console.log('Manual single hash example:', manualHash);
  } else {
    console.log('User NOT found. Please run seeder.');
  }
  
  process.exit();
};

testLogin();
