# Equity Properties Admin Dashboard

Admin dashboard for managing properties and inquiries for the Equity Properties real estate platform.

## Features

- 🔐 Authentication with JWT
- 📊 Dashboard with statistics
- 🏠 Property management (CRUD operations)
- 📝 Inquiry management
- 📸 Image uploads via Cloudinary
- 📱 Fully responsive design
- 🎨 Beautiful UI with Framer Motion animations

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **React Context** - State management

## Setup Instructions

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the `admin` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** Make sure your backend server is running on port 5000 (or update the URL accordingly).

### 3. Run Development Server

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3001`

## Backend Connection

The admin dashboard connects to the backend API. Make sure:

1. **Backend server is running** on `http://localhost:5000`
2. **MongoDB is connected** in your backend
3. **Cloudinary is configured** in your backend
4. **Environment variables are set** in both frontend and backend

## First Time Setup

1. **Start the backend server:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Create an admin user** (you can use the register endpoint or create directly in MongoDB):
   ```bash
   # Using curl or Postman
   POST http://localhost:5000/api/auth/register
   {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "yourpassword",
     "role": "admin"
   }
   ```

3. **Login to the admin dashboard** at `http://localhost:3001/admin/login`

## Project Structure

```
admin/
├── app/
│   ├── admin/
│   │   ├── login/          # Login page
│   │   ├── page.tsx        # Dashboard
│   │   ├── add-property/   # Add property form
│   │   ├── my-properties/  # Properties list
│   │   └── inquiries/      # Inquiries management
│   └── layout.tsx          # Root layout
├── components/
│   ├── admin-navbar.tsx    # Top navigation
│   ├── admin-sidebar.tsx   # Sidebar navigation
│   └── ui/                 # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── api.ts              # API utility functions
└── data/
    └── meerut-areas.json   # Meerut areas data
```

## API Integration

All API calls are handled through `lib/api.ts`. The following endpoints are used:

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - Register (Admin only)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `PATCH /api/properties/:id/status` - Update status
- `GET /api/properties/stats/dashboard` - Dashboard stats

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries/:id` - Update inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry
- `GET /api/inquiries/stats` - Inquiry stats

## Authentication Flow

1. User logs in at `/admin/login`
2. JWT token is stored in `localStorage`
3. Token is included in all API requests
4. Protected routes check authentication
5. User can logout, which clears the token

## Troubleshooting

### "Failed to fetch" errors
- Check if backend server is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### Authentication issues
- Clear localStorage and try logging in again
- Check if JWT token is being sent in requests
- Verify backend authentication middleware

### Image upload issues
- Verify Cloudinary configuration in backend
- Check file size limits (max 5MB)
- Ensure correct file formats (jpg, png, webp)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

3. Start the production server:
   ```bash
   npm start
   ```

