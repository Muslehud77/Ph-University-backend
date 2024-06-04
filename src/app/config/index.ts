import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbUri = process.env.DATABASE_URI;
const port = process.env.PORT;
const hashSaltRounds = parseInt(process.env.HASH_SALT as string) as number;
const defaultPassword = process.env.DEFAULT_PASS as string;
const node_env = process.env.NODE_ENV as string;

export default { dbUri, port, hashSaltRounds, defaultPassword, node_env };
