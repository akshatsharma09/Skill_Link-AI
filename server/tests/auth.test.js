import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index.js';
import User from '../src/models/User.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

describe('Auth API', () => {
  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'worker',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', userData.email);
      expect(response.body).toHaveProperty('role', userData.role);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 400 if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'worker',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      await User.create({
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: userData.role,
        profile: userData.profile,
      });

      const response = await request(app)
        .post('/api/v1/auth/register')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('message', 'User already exists');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should login user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'worker',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };

      await User.create({
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        role: userData.role,
        profile: userData.profile,
      });

      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: userData.email,
          password: userData.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('email', userData.email);
      expect(response.body).toHaveProperty('role', userData.role);
      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
  });
});
