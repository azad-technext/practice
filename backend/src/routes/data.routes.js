const express = require("express");
const router = express.Router();
const dataController = require("../controllers/data.controller");

// Define API endpoints for /api/data
router.get("/", dataController.getAllData);
router.post("/", dataController.createItem);

module.exports = router;
