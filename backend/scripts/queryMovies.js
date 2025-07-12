import { config } from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

config(); // Load environment variables

const run = async () => {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = await pinecone.index(process.env.PINECONE_INDEX); // Must await this!

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: "__default__",
  });

  const results = await vectorStore.similaritySearch("Best movies of 2009", 5);

  console.log("Top similar movies:");
  results.forEach((r, i) => {
    console.log(`${i + 1}. ${r.metadata.title} (${r.metadata.year})`);
  });
};

run();