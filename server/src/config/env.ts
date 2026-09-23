import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../../');
dotenv.config({ path: resolve(projectRoot, '.env') });

const nodeEnv = process.env.NODE_ENV || 'development';

const env = {
  port: Number(process.env.PORT || 5000),
  host: process.env.HOST || '0.0.0.0',
  jwtSecret: process.env.JWT_SECRET || (nodeEnv === 'production' ? '' : 'cybershield-local-dev-secret'),
  clientUrl: process.env.CLIENT_URL || (nodeEnv === 'production' ? '' : 'http://localhost:5173'),
  mongoUri: process.env.MONGODB_URI || '',
  nodeEnv
};

export default env;
