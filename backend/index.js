// // backend/index.js
// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// app.get("/api/hello", (req, res) => {
//   res.json({ message: "Hello from backend!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import chatRoute from "./routes/chatRoute.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/chat", chatRoute);

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { chatHandler } from "./chatAgent.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const answer = await chatHandler(message);
    res.json({ answer });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ answer: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
