import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on('connect', () => {
  console.log('✅ Connected to the PostgreSQL database!');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connection test successful');
    return true;
  } catch (err) {
    console.error('❌ Database connection test failed:', (err as Error).message);
    return false;
  }
};

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
