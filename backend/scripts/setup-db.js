const fs = require("fs");
const path = require("path");
const db = require("../src/config/database");

async function setupDatabase() {
  try {
    console.log("Setting up database...");

    // Read the schema file
    const schemaPath = path.join(__dirname, "../database/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Execute the schema
    await db.query(schema);

    console.log("✅ Database setup completed successfully!");
    console.log("Tables created and sample data inserted.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    process.exit(1);
  }
}

setupDatabase();
