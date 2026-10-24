import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite server
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'Aurelia Travel Oasis API (MERN TypeScript)',
    timestamp: new Date().toISOString()
  });
});

// Main API routes
app.use('/api', apiRouter);

// Start server and connect DB
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[Aurelia Travel Backend] Server running cleanly on http://localhost:${PORT}`);
  });
};

startServer();
