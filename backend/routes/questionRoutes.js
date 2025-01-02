const express = require("express");
const {
  // uploadPdf,
  askQuestion,
  getQuestion,
  uploadPdf,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/uploadpdf", uploadPdf);
router.post("/ask", askQuestion);
router.get("/:questionId", getQuestion);

module.exports = router;
