const app = require("./src/app");
const db = require("./src/config/database");
require("dotenv").config();

const PORT = process.env.PORT || 5004;

// Test database connection before starting server
const startServer = async () => {
  console.log("🚀 Starting server...");

  // Test database connection
  const dbConnected = await db.testConnection();
  if (!dbConnected) {
    console.error("❌ Cannot start server: Database connection failed");
    console.log("💡 Make sure PostgreSQL is running and check your .env file");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 Visit http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
