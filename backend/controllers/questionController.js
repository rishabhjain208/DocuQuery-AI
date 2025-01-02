const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const prisma = new PrismaClient();
const { ansByOpenAi } = require("../services/OpenAI");

const formatAnswer = (answer) => {
  return `
    <h1>${answer.split("\n\n")[0]}</h1>
    ${answer
      .split("\n\n")
      .slice(1)
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("")}
  `;
};

module.exports.uploadPdf = async (req, res) => {
  try {
    const pdfLink = req.body.pdfurl;

    if (!pdfLink || typeof pdfLink !== "string") {
      return res.status(400).json({
        success: false,
        message: "A valid PDF URL is required",
      });
    }

    // Attempt to fetch and parse the PDF
    let pdfContent = null;
    try {
      const response = await axios.get(pdfLink, {
        responseType: "arraybuffer",
      });
      const pdfBuffer = Buffer.from(response.data);
      const parsedPdf = await pdfParse(pdfBuffer);
      pdfContent = parsedPdf.text?.trim() || null;
    } catch (error) {
      console.warn("Failed to parse PDF content:", error.message);
      // Proceed with saving the PDF URL even if parsing fails
    }

    // Save to the database
    const uploadedPdf = await prisma.uploadedPdf.create({
      data: {
        pdfurl: pdfLink,
        content: pdfContent,
      },
    });

    res.status(200).json({
      success: true,
      message: "File uploaded and content extracted successfully",
      pdfurl: uploadedPdf,
    });
  } catch (error) {
    console.error("Error uploading PDF:", error.message);
    res.status(500).json({ success: false, message: "File upload failed" });
  }
};

module.exports.askQuestion = async (req, res) => {
  try {
    const question = req.body.question;

    // Generate the answer using OpenAI
    const rawAnswer = await ansByOpenAi(question);

    // Format the answer
    // const formattedAnswer = formatAnswer(rawAnswer);

    // Save the question and formatted answer to the database
    const newQuestion = await prisma.question.create({
      data: { question, answer: rawAnswer },
    });

    // Send the response
    res.status(200).json({ success: true, saved_Ques: newQuestion });
  } catch (error) {
    console.error("Error in askQuestion:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to process the question." });
  }
};

module.exports.getQuestion = async (req, res) => {
  const { questionId } = req.params;
  const question = await prisma.question.findUnique({
    where: { id: parseInt(questionId) },
  });

  if (!question) {
    return res
      .status(404)
      .json({ success: false, message: "Question not found" });
  }
  res.status(200).json({ success: true, question });
};
