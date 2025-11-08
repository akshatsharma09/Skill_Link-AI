# SkillLink AI

AI-Powered Skill Marketplace for Gig Workers & Local Businesses

## Overview

SkillLink AI is a modern platform that connects skilled workers with local businesses, leveraging AI for optimal matching. The platform facilitates efficient discovery, booking, and management of skilled services while ensuring quality and trust through various verification mechanisms.

## Features

### For Workers
- AI-powered job matching
- Skill profile management
- Real-time availability settings
- Document verification
- Rating and review system
- Earnings tracking
- Skill development recommendations

### For Businesses
- Smart worker matching
- Job posting and management
- Worker verification status
- Real-time booking
- Payment processing
- Service quality tracking
- Business analytics

### Core Technology
- AI matching engine
- Location-based services
- Secure payment processing
- Document verification
- Rating system
- Real-time notifications

### Security & Performance
- Input validation and sanitization (Joi)
- Rate limiting on authentication and job routes
- Security headers (Helmet)
- Password reset with secure tokens
- Response compression
- Pagination for large datasets
- Structured logging (Winston)
- Custom error handling
- API versioning (/api/v1/)
- Health check endpoint

## Tech Stack

### Frontend
- React (with Vite)
- React Router for navigation
- TailwindCSS for styling
- Axios for API requests
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads
- Nodemailer for email notifications
- Joi for input validation
- Winston for structured logging
- Express-rate-limit for rate limiting
- Helmet for security headers
- Compression for response compression
- Mongoose-paginate-v2 for pagination

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/skilllink-ai.git
cd skilllink-ai
\`\`\`

2. Install server dependencies:
\`\`\`bash
cd server
npm install
\`\`\`

3. Install client dependencies:
\`\`\`bash
cd ../client
npm install
\`\`\`

4. Set up environment variables:
   - Create a .env file in the server directory using .env.example as a template
   - Fill in your MongoDB URI, JWT secret, and other required variables

5. Start the development servers:

For the backend:
\`\`\`bash
cd server
npm run dev
\`\`\`

For the frontend:
\`\`\`bash
cd client
npm run dev
\`\`\`

## API Documentation

The API uses versioning with base path `/api/v1/`. All endpoints require authentication unless specified as public.

### Authentication Endpoints
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password with token
- `GET /api/v1/auth/profile` - Get user profile (protected)
- `PUT /api/v1/auth/profile` - Update user profile (protected)

### Job Endpoints (All Protected)
- `POST /api/v1/jobs` - Create a new job
- `GET /api/v1/jobs` - Get all jobs (with pagination)
- `GET /api/v1/jobs/matched` - Get AI-matched jobs for user
- `GET /api/v1/jobs/:id` - Get job by ID
- `POST /api/v1/jobs/:id/apply` - Apply for a job
- `PUT /api/v1/jobs/:id/status` - Update job status
- `PUT /api/v1/jobs/:id/complete` - Mark job as completed

### Skill Endpoints
- `GET /api/v1/skills` - Get all skills (public)
- `GET /api/v1/skills/:id` - Get skill by ID (public)
- `GET /api/v1/skills/:id/recommendations` - Get skill recommendations (protected)
- `POST /api/v1/skills` - Create/update skill (admin only)
- `PUT /api/v1/skills/:id/demand-metrics` - Update skill demand metrics (admin only)

### Health Check
- `GET /health` - Server health status

The API documentation is available at [/api-docs](http://localhost:5000/api-docs) when running the server locally.

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)
Project Link: [https://github.com/yourusername/skilllink-ai](https://github.com/yourusername/skilllink-ai)