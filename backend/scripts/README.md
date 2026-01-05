# Backend Scripts

## Register Admin Accounts

This script registers the two admin accounts for the Equity Properties admin dashboard.

### Admin Accounts

1. **Nexerve**
   - Email: `teamNexerve@equityprop.in`
   - Password: `NexerveIn@1`

2. **Gaurav Chaudhary**
   - Email: `adminOne@equityprop.in`
   - Password: `EquityNextProp@123`

### How to Run

1. Make sure your `.env` file is configured with MongoDB connection:
   ```env
   MONGODB_URI=mongodb://localhost:27017/equity-properties
   ```

2. Run the registration script:
   ```bash
   npm run register-admins
   ```

   Or directly:
   ```bash
   node scripts/registerAdmins.js
   ```

### What it does

- Connects to MongoDB
- Checks if accounts already exist (skips if they do)
- Creates the two admin accounts with hashed passwords
- Displays success messages for each account created

### Notes

- The script is idempotent - you can run it multiple times safely
- If an account already exists, it will skip that account
- Passwords are automatically hashed using bcrypt
- Both accounts are created with `admin` role

### Troubleshooting

**Error: Cannot connect to MongoDB**
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env` file
- Verify network connectivity

**Error: User already exists**
- This is normal if you've run the script before
- The script will skip existing users and continue

