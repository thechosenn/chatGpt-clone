const express = require("express");
const {searchController} = require("../controllers/openiaController");

const router = express.Router();

//route
router.post("/search", searchController);

module.exports = router;