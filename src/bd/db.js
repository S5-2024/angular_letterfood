import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config(); 

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

//  conexão com o PostgreSQL
export const db = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

// testar a conexão
async function testConnection() {
  try {
    const result = await db`SELECT NOW()`;
    console.log('Connection successful:', result);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testConnection();
