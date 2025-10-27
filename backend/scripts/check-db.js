const db = require("../src/config/database");

async function checkDatabase() {
  try {
    console.log("🔍 Checking database connection and tables...");

    // Test connection
    const connectionTest = await db.query("SELECT NOW()");
    console.log("✅ Database connection successful");

    // Check if name_data table exists
    const tableCheck = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'name_data'
      );
    `);

    const tableExists = tableCheck.rows[0].exists;
    console.log(`📋 Table 'name_data' exists: ${tableExists}`);

    if (tableExists) {
      // Check table structure
      const columns = await db.query(`
        SELECT column_name, data_type, is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'name_data'
        ORDER BY ordinal_position;
      `);

      console.log("📊 Table structure:");
      columns.rows.forEach((col) => {
        console.log(
          `  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`
        );
      });

      // Check existing data
      const dataCount = await db.query("SELECT COUNT(*) FROM name_data");
      console.log(`📈 Existing records: ${dataCount.rows[0].count}`);

      // Show sample data
      const sampleData = await db.query("SELECT * FROM name_data");
      if (sampleData.rows.length > 0) {
        console.log("📝 Sample data:");
        sampleData.rows.forEach((row) => {
          console.log(`  - ID: ${row.id}, Name: ${row.name}`);
        });
      }
    } else {
      console.log("❌ Table does not exist - needs to be created");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Database check failed:", error.message);
    process.exit(1);
  }
}

checkDatabase();
