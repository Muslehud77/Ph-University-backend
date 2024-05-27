import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbUri = process.env.DATABASE_URI;
const port = process.env.PORT;
const hashSaltRounds = process.env.HASH_SALT;
const defaultPassword = process.env.DEFAULT_PASS as string;

export default { dbUri, port, hashSaltRounds, defaultPassword };
