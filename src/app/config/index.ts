import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const dbUri = process.env.DATABASE_URI;
const port = process.env.PORT;
const hashSaltRounds = 12;

export default { dbUri, port, hashSaltRounds };
