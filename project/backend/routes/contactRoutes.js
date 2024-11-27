const express = require("express");
const router = express.Router();
const { createContact } = require("../Controllers/contactController");




// POST route to save contact information
router.post("/contact", createContact);



;


module.exports = router;
