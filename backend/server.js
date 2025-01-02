require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const questionRoutes = require("./routes/questionRoutes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/questions", questionRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await prisma.$connect();
  console.log("Connected to the database.");
});
