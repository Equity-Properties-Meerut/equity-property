# Equity Properties Backend API

Backend API for the Equity Properties real estate platform built with Node.js, Express, MongoDB, and Cloudinary.

## Features

- Property management (CRUD operations)
- Inquiry management
- User authentication and authorization
- Image uploads via Cloudinary
- RESTful API design
- Error handling middleware
- Input validation

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Cloudinary** - Image storage and management
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/equity-properties
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

3. Register admin accounts:
```bash
npm run register-admins
```

This will create two admin accounts:
- **Nexerve**: `teamNexerve@equityprop.in` / `NexerveIn@1`
- **Gaurav Chaudhary**: `adminOne@equityprop.in` / `EquityNextProp@123`

**Note:** The registration script is idempotent - you can run it multiple times safely. It will skip accounts that already exist.

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user (Admin only)
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (Admin only)
- `PUT /api/properties/:id` - Update property (Admin only)
- `DELETE /api/properties/:id` - Delete property (Admin only)
- `PATCH /api/properties/:id/status` - Update property status (Admin only)
- `GET /api/properties/stats/dashboard` - Get dashboard stats (Admin only)

### Inquiries
- `POST /api/inquiries` - Create inquiry (Public)
- `GET /api/inquiries` - Get all inquiries (Admin only)
- `GET /api/inquiries/:id` - Get single inquiry (Admin only)
- `PUT /api/inquiries/:id` - Update inquiry (Admin only)
- `DELETE /api/inquiries/:id` - Delete inquiry (Admin only)
- `GET /api/inquiries/stats` - Get inquiry stats (Admin only)

## Authentication

Most routes require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Image Uploads

Property images are uploaded to Cloudinary. The API accepts:
- `displayImage` - Single image file (required)
- `additionalImages` - Multiple image files (optional)

Use `multipart/form-data` when uploading images.

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Development

- Use `npm run dev` for development with auto-reload
- Use `npm start` for production

