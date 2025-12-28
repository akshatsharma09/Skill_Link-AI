# 🚀 SkillLink AI

<div align="center">
  <img src="client/public/hero-illustration.svg" alt="SkillLink AI Logo" width="150" height="150">
  <h2>AI-Powered Skill Marketplace</h2>
  <p>Connect skilled workers with local businesses through intelligent matching and secure transactions.</p>
  <br>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18+-61dafb.svg" alt="React"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18+-339933.svg" alt="Node.js"></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28.svg" alt="Firebase"></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248.svg" alt="MongoDB"></a>
</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📖 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📞 Contact](#-contact)

## ✨ Features

### For Workers
- 🤖 AI-powered job matching
- 👤 Skill profile management
- ⏰ Real-time availability tracking
- 📄 Document verification
- ⭐ Rating & review system
- 💰 Earnings tracking

### For Businesses
- 🎯 Smart worker discovery
- 📝 Easy job posting
- 🔒 Verified worker profiles
- 📅 Real-time booking
- 💳 Secure payments
- 📊 Business analytics

### Core Technology
- 🧠 AI matching engine
- 📍 Location-based services
- 🔔 Real-time notifications
- 🔐 Secure authentication

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 18, Vite, TailwindCSS, React Router |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **Authentication** | Firebase Auth, JWT |
| **AI/ML** | Google Vertex AI |
| **Deployment** | Docker, Azure |

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/akshatsharma09/Skill_Link-AI.git
   cd skilllink-ai
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Configure your environment variables
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173  # Frontend
   http://localhost:5000  # Backend API
   ```

## 📖 Usage

### API Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/jobs` - Browse jobs
- `POST /api/v1/jobs` - Create job posting
- `GET /api/v1/skills` - View available skills

### Environment Variables
Create `.env` file in server directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
# Add other required variables
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the project
2. 🌿 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. 💻 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Akshat Sharma** - [@akshatsharma09](https://github.com/akshatsharma09)

Project Link: [https://github.com/akshatsharma09/Skill_Link-AI](https://github.com/akshatsharma09/Skill_Link-AI)

---

<div align="center">
  <p>Made with ❤️ for the gig economy</p>
</div>
