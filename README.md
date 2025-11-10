<div align="center">
  <img src="client/public/hero-illustration.svg" alt="SkillLink AI Logo" width="200" height="200">
  <h1>SkillLink AI</h1>
  <p><strong>AI-Powered Skill Marketplace for Gig Workers & Local Businesses</strong></p>
  <p>Connect skilled workers with local businesses through intelligent matching, secure transactions, and verified profiles.</p>
  <br>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-16+-green.svg" alt="Node.js"></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18+-blue.svg" alt="React"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-7+-green.svg" alt="MongoDB"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-4+-black.svg" alt="Express.js"></a>
</div>

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏁 Getting Started](#-getting-started)
- [📚 API Documentation](#-api-documentation)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## Overview

SkillLink AI is a modern platform that connects skilled workers with local businesses, leveraging AI for optimal matching. The platform facilitates efficient discovery, booking, and management of skilled services while ensuring quality and trust through various verification mechanisms.

## ✨ Features

| For Workers | For Businesses | Core Technology | Security & Performance |
|-------------|----------------|-----------------|-------------------------|
| 🔍 AI-powered job matching | 🎯 Smart worker matching | 🤖 AI matching engine | ✅ Input validation (Joi) |
| 👤 Skill profile management | 📝 Job posting & management | 📍 Location-based services | 🛡️ Rate limiting |
| ⏰ Real-time availability | 🔒 Worker verification status | 💳 Secure payments | 🔐 Security headers (Helmet) |
| 📄 Document verification | 📅 Real-time booking | 📄 Document verification | 🔑 Password reset tokens |
| ⭐ Rating & review system | 💰 Payment processing | ⭐ Rating system | 📊 Response compression |
| 💰 Earnings tracking | 📈 Service quality tracking | 🔔 Real-time notifications | 📄 Pagination |
| 📚 Skill recommendations | 📊 Business analytics | | 📝 Structured logging (Winston) |
| | | | 🚨 Custom error handling |
| | | | 🏷️ API versioning (/api/v1/) |
| | | | ❤️ Health check endpoint |

## 🛠️ Tech Stack

| Category | Technology | Description |
|----------|------------|-------------|
| **Frontend** | React (with Vite) | Modern UI library for building interactive interfaces |
| | React Router | Declarative routing for React applications |
| | TailwindCSS | Utility-first CSS framework for rapid styling |
| | Axios | HTTP client for making API requests |
| | Context API | State management solution built into React |
| **Backend** | Node.js with Express | Server-side JavaScript runtime and web framework |
| | MongoDB with Mongoose | NoSQL database and ODM for data modeling |
| | JWT | JSON Web Tokens for secure authentication |
| | bcrypt | Password hashing library for security |
| | Multer | Middleware for handling file uploads |
| | Nodemailer | Email sending library for notifications |
| | Joi | Schema validation for input sanitization |
| | Winston | Structured logging for better debugging |
| | Express-rate-limit | Rate limiting middleware for API protection |
| | Helmet | Security headers middleware |
| | Compression | Response compression for performance |
| | Mongoose-paginate-v2 | Pagination plugin for large datasets |

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/akshatsharma09/Skill_Link-AI
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

## 📸 Screenshots

*Add screenshots of your application here to showcase the UI and features.*

<!-- Example:
![Home Page](screenshots/home.png)
![Dashboard](screenshots/dashboard.png)
![Job Matching](screenshots/job-matching.png)
-->

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. 💻 Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. 🚀 Push to the branch (\`git push origin feature/AmazingFeature\`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Akshat Sharma** - [@akshatsharma09](https://github.com/akshatsharma09)

Project Link: [https://github.com/akshatsharma09/Skill_Link-AI](https://github.com/akshatsharma09/Skill_Link-AI)
