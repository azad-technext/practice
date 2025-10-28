const db = require("../config/database");

// GET all items
exports.getAllData = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM name_data ORDER BY id ASC;");
    res.status(200).json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Database error in getAllData:", err.message);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};

// POST a new item
exports.createItem = async (req, res) => {
  const { name, status } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  console.log(name, status);
  try {
    console.log("with params:", [name, status]);
    const query =
      "INSERT INTO name_data (name, status) VALUES($1, $2) RETURNING *;";
    const result = await db.query(query, [name, status]);
    res
      .status(201)
      .json({ success: true, message: "Item created", data: result.rows[0] });
  } catch (err) {
    console.error("Database error in createItem:", err.message);
    res
      .status(500)
      .json({ error: "Database operation failed", details: err.message });
  }
};
