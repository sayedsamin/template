import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';
import { requestLogger } from './middleware/logging.js';
import logger from './utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/tasks', taskRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error('Application Error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    userId: req.user?.id
  });
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});