const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const createExpensesTable = async () => {
  try {
    console.log('Connecting to Neon Database to create expenses table...');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        type VARCHAR(10) NOT NULL DEFAULT 'debit',
        category VARCHAR(100) NOT NULL,
        expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
        description TEXT,
        created_by VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Expenses table created successfully.');
  } catch (error) {
    console.error('Error creating expenses table:', error);
  } finally {
    pool.end();
  }
};

createExpensesTable();
