const db = require("../src/config/database");

async function testTable() {
  try {
    console.log("🔍 Testing direct table access...");

    // Try to query the table directly
    try {
      const result = await db.query("SELECT * FROM name_data LIMIT 1;");
      console.log("✅ Table exists and is accessible!");
      console.log(`📊 Current row count: ${result.rows.length}`);
      if (result.rows.length > 0) {
        console.log("📝 Sample row:", result.rows[0]);
      }
    } catch (tableError) {
      console.log("❌ Direct table query failed:", tableError.message);
      
      // Check what tables exist
      const tables = await db.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
      `);
      
      console.log("📋 Available tables in public schema:");
      tables.rows.forEach(row => {
        console.log(`  - ${row.table_name}`);
      });
    }

    // Test insert
    try {
      console.log("🧪 Testing insert...");
      const insertResult = await db.query(
        "INSERT INTO name_data (name) VALUES ($1) RETURNING *;",
        ["Test Item"]
      );
      console.log("✅ Insert successful:", insertResult.rows[0]);
      
      // Clean up test data
      await db.query("DELETE FROM name_data WHERE name = $1;", ["Test Item"]);
      console.log("🧹 Test data cleaned up");
    } catch (insertError) {
      console.log("❌ Insert test failed:", insertError.message);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

testTable();
