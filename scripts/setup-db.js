const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config({ path: '.env.local' });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Read the schema file
    const schemaPath = path.join(__dirname, "../database/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Execute the schema
    await pool.query(schema);

    console.log("✅ Database setup completed successfully!");
    console.log("Tables created and sample data inserted.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    process.exit(1);
  }
}

setupDatabase();
