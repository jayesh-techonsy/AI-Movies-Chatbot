import express from "express";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    const index = await pinecone.index(process.env.PINECONE_INDEX);

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: "__default__",
    });

    const results = await vectorStore.similaritySearch(message, 5);

    const movies = results.map((r, i) => ({
      title: r.metadata.title,
      year: r.metadata.year,
      rating: r.metadata.rating,
      description: r.metadata.description,
    }));

    return res.json({
      answer: `🎬 Top movies based on your query:\n\n` + 
        movies.map((m, i) => `${i + 1}. ${m.title} (${m.year}) - ⭐ ${m.rating}`).join("\n"),
    });

  } catch (err) {
    console.error("❌ Error handling chat request:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
