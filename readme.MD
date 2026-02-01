# Medi-Store Server

A comprehensive backend API for an online pharmacy/medical store platform built with Express.js, TypeScript, and PostgreSQL. This system supports multi-role authentication (Customer, Seller, Admin) with features for medicine catalog management, order processing, and customer reviews.

## Features

### Core Functionality
- **Multi-role Authentication** - Customer, Seller, and Admin roles with role-based access control (RBAC)
- **Medicine Catalog** - Browse and search medicines by category with detailed information
- **Order Management** - Complete order lifecycle from placement to delivery
- **Review System** - Customers can rate and review medicines
- **Seller Dashboard** - Sellers manage their medicine inventory and order fulfillment
- **Admin Panel** - Comprehensive admin controls for users, medicines, orders, and categories

### Business Features
- Category-based medicine organization
- Prescription-required medicine handling
- Inventory management with stock tracking
- Order status tracking (PLACED → PROCESSING → SHIPPED → DELIVERED)
- Payment status tracking (PENDING, PAID, FAILED, REFUNDED)
- User account management with status control (ACTIVE, BANNED, SUSPENDED)
- Medicine approval workflow (DRAFT → PENDING → APPROVED/REJECTED)

## Technology Stack

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js v5.2.1
- **Database:** PostgreSQL
- **ORM:** Prisma v7.3.0 with PostgreSQL adapter
- **Authentication:** better-auth v1.4.18

### Additional Libraries
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **http-status-codes** - Standardized HTTP status codes
- **pg** - PostgreSQL client

### Development Tools
- **TypeScript** - Type-safe development
- **tsx** - TypeScript execution with watch mode
- **ESBuild/Bundler** - Module resolution

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or bun package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd medi-store-server
```

2. Install dependencies:
```bash
npm install
# or using bun
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with the required variables (see Environment Variables section)

5. Set up the database:
```bash
npx prisma generate
npx prisma migrate deploy
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/medi_store

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_BASE_URL=http://localhost:5000

# Application
APP_URL=http://localhost:3000

# Email Configuration (Optional)
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

## Database Setup

The application uses PostgreSQL with Prisma ORM. The schema includes the following models:

### Main Models
- **User** - Multi-role users (CUSTOMER, SELLER, ADMIN)
- **Medicine** - Product catalog with categories
- **Order** - Order management with items
- **Review** - Customer reviews and ratings
- **Category** - Medicine categorization

### Authentication Models
- **Session** - User session management
- **Account** - OAuth provider accounts
- **Verification** - Email/phone verification

Run migrations:
```bash
npx prisma migrate dev
```

Seed the database (if seed file exists):
```bash
npx prisma db seed
```

## Running the Project

### Development Mode
```bash
npm run dev
# or
bun run dev
```
The server will start with hot-reload enabled at `http://localhost:5000`

### Production Mode
```bash
# Build the project
npm run build

# Start the server
npm start
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints
```
POST   /api/auth/sign-up          # Register new user
POST   /api/auth/sign-in          # Login
POST   /api/auth/sign-out         # Logout
GET    /api/auth/session          # Get current session
```

### Public Endpoints
```
GET    /api/v1/medicines          # List all medicines
GET    /api/v1/medicines/:id      # Get medicine details
GET    /api/v1/categories         # List all categories
GET    /api/v1/reviews/medicine/:id  # Get reviews for a medicine
```

### Customer Endpoints (Requires CUSTOMER role)
```
GET    /api/v1/orders             # Get customer's orders
GET    /api/v1/orders/:id         # Get order details
POST   /api/v1/orders/:id         # Create new order
GET    /api/v1/reviews            # Get user's reviews
POST   /api/v1/reviews/:id        # Create review
PUT    /api/v1/reviews/:id        # Update review
DELETE /api/v1/reviews/:id        # Delete review
```

### Seller Endpoints (Requires SELLER role)
```
GET    /api/v1/seller/orders      # Get seller's orders
POST   /api/v1/seller/medicines/create  # Create medicine
PUT    /api/v1/seller/medicines/:id     # Update medicine
DELETE /api/v1/seller/medicines/:id     # Delete medicine
PATCH  /api/v1/seller/orders/:id        # Update order status
```

### Admin Endpoints (Requires ADMIN role)
```
GET    /api/v1/admin/users        # List all users
GET    /api/v1/admin/medicines    # List all medicines
GET    /api/v1/admin/orders       # List all orders
GET    /api/v1/admin/orders/:id   # Get order details
PATCH  /api/v1/admin/users/:id    # Update user status
POST   /api/v1/admin/categories   # Create category
PATCH  /api/v1/admin/categories/:id  # Update category
DELETE /api/v1/admin/categories/:id  # Delete category
```

## Project Structure

```
medi-store-server/
├── src/
│   ├── modules/              # Feature modules (MVC pattern)
│   │   ├── admin/           # Admin management
│   │   ├── medicine/        # Medicine catalog
│   │   ├── order/           # Order management
│   │   ├── review/          # Product reviews
│   │   └── seller/          # Seller operations
│   ├── config/              # Configuration management
│   ├── constants/           # Application constants
│   ├── helpers/             # Utility helpers
│   ├── lib/                 # Library setup (Auth, Prisma)
│   ├── middlewares/         # Express middleware
│   ├── types/               # TypeScript type definitions
│   ├── routes/              # Route aggregation
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── prisma/                  # Database schema & migrations
│   └── schema.prisma        # Prisma schema file
├── generated/               # Auto-generated Prisma client
├── dist/                    # Compiled output
├── .env                     # Environment variables (not in git)
├── .env.example             # Environment template
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies & scripts
└── README.md                # This file
```

## User Roles & Permissions

### CUSTOMER
- Browse and search medicines
- Place and track orders
- Write and manage reviews
- View order history

### SELLER
- Manage medicine inventory (CRUD operations)
- View and fulfill orders
- Update order status
- Track sales

### ADMIN
- Manage all users (view, update status, ban/suspend)
- Manage all medicines (approve/reject listings)
- Manage all orders
- Manage categories (CRUD operations)
- Platform-wide oversight

## Development

### Module Pattern
Each feature module follows the MVC pattern:
- **Route** (`*.route.ts`) - Route definitions with middleware
- **Controller** (`*.controller.ts`) - Request handlers
- **Service** (`*.service.ts`) - Business logic using Prisma

### Adding a New Module
1. Create folder in `src/modules/`
2. Implement route, controller, and service files
3. Register routes in `src/routes/index.ts`

### Database Migrations
```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (development only)
npx prisma migrate reset
```

### Prisma Studio
View and edit database data:
```bash
npx prisma studio
```

## Deployment

The project is configured for deployment on Render and Vercel:

1. Set environment variables in your hosting platform
2. Ensure DATABASE_URL points to production PostgreSQL
3. Run migrations in production:
```bash
npx prisma migrate deploy
```
4. Build and start the application

## Error Handling

The API uses standardized error responses:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```

## Success Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "statusCode": 200,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please create an issue in the repository.

---

**Happy Coding!** 🚀
