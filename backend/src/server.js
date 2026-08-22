import app from './app.js';
import { connectDB } from './config/db.js';
import config from './config/env.js';

const startServer = async () => {
  // 1. Connect to MongoDB first
  await connectDB();

  // 2. Start the Express Server only after a successful DB connection
  const server = app.listen(config.PORT, () => {
    console.log(`[Server] VerifyX Backend running on port ${config.PORT}`);
    console.log(`[Server] Health Check: http://localhost:${config.PORT}/api/health`);
  });

  // Graceful shutdown handling for unhandled promises
  process.on('unhandledRejection', (err) => {
    console.error(`[Fatal] Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();