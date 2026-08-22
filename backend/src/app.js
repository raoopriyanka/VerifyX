import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import supplyChainRoutes from './routes/supplyChain.routes.js';
import verificationRoutes from './routes/verification.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Step 9: Health Endpoint
app.get('/api/health', (req, res) => {
  // Since the server only boots if the DB connects, we can safely report 'connected' here
  res.status(200).json({
    success: true,
    message: 'VerifyX API is running',
    database: 'connected'
  });
});

// Future API Routes (Placeholders to be wired up in upcoming steps)
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/supply-chain', supplyChainRoutes);
// app.use('/api/verify', verificationRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); // <-- UNCOMMENTED THIS LINE
app.use('/api/supply-chain', supplyChainRoutes);
app.use('/api/verify', verificationRoutes);
app.use('/api/users', userRoutes);

// 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Centralized Error Middleware
app.use((err, req, res, next) => {
  console.error(`[Server Error] ${err.message}`);
  
  // Do not expose internal stack traces to the client
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;