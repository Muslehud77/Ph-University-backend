import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbUri = process.env.DATABASE_URI;
const port = process.env.PORT;
const hashSaltRounds = parseInt(process.env.HASH_SALT as string) as number;
const defaultPassword = process.env.DEFAULT_PASS as string;
const node_env = process.env.NODE_ENV as string;
const jwt_access_secret = process.env.JWT_ACCESS_SECRET as string;
const jwt_refresh_secret = process.env.JWT_REFRESH_SECRET as string;
const jwt_access_expiresIn = process.env.JWT_ACCESS_EXPIRES_IN as string;
const jwt_refresh_expiresIn = process.env.JWT_REFRESH_EXPIRES_IN as string; 

const NODE_MAILER_EMAIL = process.env.NODE_MAILER_EMAIL;
const NODE_MAILER_PASSWORD = process.env.NODE_MAILER_PASSWORD;
const RESET_PASSWORD_UI_LINK = process.env.RESET_PASSWORD_UI_LINK;

export default {
  dbUri,
  port,
  hashSaltRounds,
  defaultPassword,
  node_env,
  jwt_access_secret,
  jwt_refresh_secret,
  jwt_access_expiresIn,
  jwt_refresh_expiresIn,
  NODE_MAILER_EMAIL,
  NODE_MAILER_PASSWORD,
  RESET_PASSWORD_UI_LINK,
};
