import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/database.js';

// Load environment variables
dotenv.config();

// Admin accounts to register
const adminAccounts = [
  {
    name: 'Nexerve',
    email: 'teamNexerve@equityprop.in',
    password: 'NexerveIn@1',
    role: 'admin',
  },
  {
    name: 'Gaurav Chaudhary',
    email: 'adminOne@equityprop.in',
    password: 'EquityNextProp@123',
    role: 'admin',
  },
];

async function registerAdmins() {
  try {
    // Connect to database
    await connectDB();

    console.log('Starting admin registration...\n');

    for (const account of adminAccounts) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: account.email });

      if (existingUser) {
        console.log(`⚠️  User with email ${account.email} already exists. Skipping...`);
        continue;
      }

      // Create user
      const user = await User.create(account);

      console.log(`✅ Successfully registered: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}\n`);
    }

    console.log('Admin registration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error registering admins:', error);
    process.exit(1);
  }
}

// Run the script
registerAdmins();

