# Admin Dashboard Setup Guide

## Quick Start

The admin dashboard has been successfully installed and configured. Follow these steps to set it up and access it.

### 1. Configure Admin Credentials

Edit your `.env` file and update the admin credentials:

```env
# Admin Dashboard Credentials
ADMIN_ID=admin@henuservices.com
ADMIN_PASSWORD=YourSecurePasswordHere
JWT_SECRET=your-jwt-secret-at-least-32-characters-long-random-string
JWT_EXPIRY=24h
```

**Important:**
- Replace `YourSecurePasswordHere` with a strong, unique password
- Replace the JWT_SECRET with a random string of at least 32 characters
- **Never commit your `.env` file to version control!**

### 2. Start the Development Server

```bash
npm run dev
```

### 3. Access the Admin Panel

Navigate to: **http://localhost:3000/admin**

This will automatically redirect you to the login page.

### 4. Login

Use the credentials you set in your `.env` file:
- **Admin ID**: The value from `ADMIN_ID`
- **Password**: The value from `ADMIN_PASSWORD`

---

## Features

### Authentication & Security
- ✅ Secure JWT-based authentication
- ✅ HTTP-only cookies for session management
- ✅ Protected routes via Next.js middleware
- ✅ Automatic session expiry (24 hours)
- ✅ Server-side credential validation
- ✅ No credentials exposed in client code

### Dashboard Pages

#### 1. **Dashboard (Overview)**
- Total enrollments count
- Total revenue generated
- Completed and pending payments
- Recent enrollments feed
- Domain distribution chart

#### 2. **Enrollments**
- View all internship applications
- Filter by status (pending/completed/failed)
- Search by name, email, or role
- Export filtered data to CSV
- Sortable columns

#### 3. **Payments & Transactions**
- View all payment records
- Filter by payment status
- Revenue summary cards
- Invoice number tracking
- Payment method display
- Export to CSV

#### 4. **Users / Applicants**
- Consolidated user profiles
- Enrollment history per user
- Total spending per user
- Contact information

#### 5. **Settings**
- System information
- Session configuration
- Security settings
- Data management details

---

## Data Storage

The admin dashboard uses **Firebase Firestore cloud database** for all data storage.

**Firestore Collections:**
- `enrollments` - All internship enrollments
- `payments` - All payment transactions

**Benefits:**
- ✅ Cloud-based storage (accessible from anywhere)
- ✅ Real-time data synchronization
- ✅ Automatic backups and scaling
- ✅ Secure with Firebase security rules

**Note:** Data is automatically stored in your Firebase project configured in `.env`

---

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/validate` - Validate session
- `POST /api/admin/auth/logout` - Logout

### Data Access
- `GET /api/admin/enrollments` - Fetch enrollments (with filters)
- `GET /api/admin/payments` - Fetch payments (with filters)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/export` - Export data as CSV

**Query Parameters for Filters:**
- `domain` - Filter by domain category
- `subDomain` - Filter by specific role
- `status` - Filter by status (pending/completed/failed)
- `startDate` - Filter from date
- `endDate` - Filter to date
- `search` - Search term

---

## Security Best Practices

1. **Environment Variables**
   - Keep `.env` file secure and never commit it
   - Use strong, unique passwords
   - Generate a random JWT secret (use: `openssl rand -base64 32`)

2. **Production Deployment**
   - Enable HTTPS in production
   - Set `NODE_ENV=production`
   - Use secure cookie settings
   - Change default admin credentials

3. **Access Control**
   - Only one admin account (no signup)
   - Session auto-expires after 24 hours
   - Logout clears all sessions

---

## Troubleshooting

### Cannot Login
- Verify credentials in `.env` file match your input
- Check console for error messages
- Ensure JWT_SECRET is at least 32 characters

### Session Expires Immediately
- Check JWT_EXPIRY setting in `.env`
- Clear browser cookies and try again
- Restart development server

### Data Not Showing
- Ensure payment flow is completing successfully
- Check Firebase Console for data in `enrollments` and `payments` collections
- View browser console for API errors
- Verify Firebase configuration in `.env` file

### CSV Export Not Working
- Check browser console for errors
- Ensure data exists in the selected filters
- Try exporting without filters first

---

## Tech Stack

- **Framework**: Next.js 16.1.1
- **Database**: Firebase Firestore
- **Authentication**: jose (JWT) + Firebase Auth
- **Password Hashing**: bcrypt
- **UI**: React 19.2.3, Framer Motion
- **Styling**: Tailwind CSS
- **Date Formatting**: date-fns
- **Icons**: Lucide React

---

## Support

For issues or questions:
1. Check this README
2. View console logs for errors
3. Ensure all dependencies are installed (`npm install`)
4. Restart development server

---

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── dashboard/
│   │   │   └── page.tsx         # Dashboard overview
│   │   ├── enrollments/
│   │   │   └── page.tsx         # Enrollments management
│   │   ├── payments/
│   │   │   └── page.tsx         # Payments tracking
│   │   ├── users/
│   │   │   └── page.tsx         # Users overview
│   │   └── settings/
│   │       └── page.tsx         # Settings
│   └── api/
│       └── admin/
│           ├── auth/            # Authentication endpoints
│           ├── enrollments/     # Enrollments API
│           ├── payments/        # Payments API
│           ├── stats/           # Statistics API
│           └── export/          # CSV export API
├── components/
│   └── admin/
│       └── AdminSidebar.tsx     # Sidebar navigation
├── lib/
│   ├── auth.ts                  # Auth utilities
│   └── data-store.ts            # Data persistence
├── types/
│   └── admin.ts                 # TypeScript types
└── middleware.ts                # Route protection

data/
├── enrollments.json             # Auto-generated on first enrollment
└── payments.json                # Auto-generated on first payment
```

---

Happy managing! 🎉
