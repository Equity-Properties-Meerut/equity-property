# Admin Dashboard Setup Guide

## Authentication Setup

The admin dashboard uses backend authentication. Two admin accounts are pre-configured and must be registered via a backend script.

### Admin Accounts

1. **Nexerve**
   - Name: Nexerve
   - Email: `teamNexerve@equityprop.in`
   - Password: `NexerveIn@1`

2. **Gaurav Chaudhary**
   - Name: Gaurav Chaudhary
   - Email: `adminOne@equityprop.in`
   - Password: `EquityNextProp@123`

### Registration Process

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Make sure MongoDB is running and `.env` is configured**

3. **Run the registration script:**
   ```bash
   npm run register-admins
   ```

   This will:
   - Connect to MongoDB
   - Check if accounts exist (skips if they do)
   - Create both admin accounts with hashed passwords
   - Display success messages

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

5. **Start the admin dashboard:**
   ```bash
   cd admin
   npm run dev
   ```

6. **Login at:** `http://localhost:3001/admin/login`

### Features

- ✅ Backend authentication (JWT tokens)
- ✅ User name displayed in navbar
- ✅ User email displayed in navbar
- ✅ User avatar with initials
- ✅ Protected routes
- ✅ Auto-redirect for authenticated/unauthenticated users
- ✅ Logout functionality

### User Menu Display

The user menu in the navbar shows:
- User's name (e.g., "Nexerve" or "Gaurav Chaudhary")
- User's email address
- Avatar with user's initials
- Dropdown with:
  - Contact Support
  - Logout

### Notes

- Registration is done via backend script only (no frontend registration)
- Login is connected to backend API
- JWT tokens are stored in localStorage
- Tokens are automatically included in API requests

