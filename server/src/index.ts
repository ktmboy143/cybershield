import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import env from './config/env.js';
import { connectDB } from './config/db.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests. Please try again later.' }
  })
);

app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  if (env.nodeEnv === 'production' && !env.jwtSecret) {
    throw new Error('JWT_SECRET must be configured in production.');
  }
  if (env.nodeEnv === 'production' && !env.clientUrl) {
    throw new Error('CLIENT_URL must be configured in production.');
  }

  const connected = await connectDB();
  if (env.nodeEnv === 'production' && !connected) {
    throw new Error('MONGODB_URI must connect successfully in production.');
  }

  app.listen(env.port, env.host, () => {
    console.log(`CYBERSHIELD API listening on ${env.host}:${env.port}`);
  });
}

startServer().catch((error: Error) => {
  console.error(`Unable to start CYBERSHIELD API: ${error.message}`);
  process.exitCode = 1;
});
