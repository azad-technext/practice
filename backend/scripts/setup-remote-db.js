const db = require("../src/config/database");

async function setupRemoteDatabase() {
  try {
    console.log("🔍 Setting up database for remote droplet...");

    // Test connection first
    await db.query("SELECT NOW()");
    console.log("✅ Database connection successful");

    // Check if table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'name_data'
      );
    `);

    const tableExists = tableCheck.rows[0].exists;

    if (tableExists) {
      console.log('✅ Table "name_data" already exists');

      // Check if it has the right structure
      const columns = await db.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'name_data'
        ORDER BY ordinal_position;
      `);

      const columnNames = columns.rows.map((row) => row.column_name);
      console.log("📊 Existing columns:", columnNames.join(", "));

      // Check if we need to add missing columns
      if (!columnNames.includes("id")) {
        console.log('⚠️  Missing "id" column - this might cause issues');
      }
      if (!columnNames.includes("name")) {
        console.log('⚠️  Missing "name" column - this might cause issues');
      }

      console.log("✅ Database is ready to use!");
    } else {
      console.log('❌ Table "name_data" does not exist');
      console.log(
        "💡 You need to create the table manually or ask your database admin to run:"
      );
      console.log(`
CREATE TABLE name_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
      `);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);

    if (error.message.includes("permission denied")) {
      console.log(
        "💡 Permission denied - you need CREATE privileges or ask your DB admin to create the table"
      );
    } else if (error.message.includes("connection")) {
      console.log("💡 Check your .env file database credentials");
    }

    process.exit(1);
  }
}

setupRemoteDatabase();
