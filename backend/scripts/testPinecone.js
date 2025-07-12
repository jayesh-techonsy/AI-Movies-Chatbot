import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from 'openai';

// Initialize Supabase (optional, not used here directly)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const index = pinecone.Index(process.env.PINECONE_INDEX);

async function testPinecone() {
  try {
    // Generate embedding
    const text = "Hello world from Pinecone test!";
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      dimensions: 512
    });

    const embedding = embeddingResponse.data[0].embedding;
    console.log(`✅ Generated embedding: ${embedding.length} dimensions`);

    // Upsert vector
    const vector = {
      id: 'test-1',
      values: embedding,
      metadata: { text }
    };

    console.log("📦 Upserting vector:", vector);

    const upsertResponse = await index.upsert([vector]);
    console.log(`✅ Upserted into Pinecone: ${JSON.stringify(upsertResponse)}`);

    // Query back the same vector
    const queryEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      dimensions: 512
    });

    const queryResponse = await index.query({
      topK: 3,
      vector: queryEmbedding.data[0].embedding,
      includeMetadata: true
    });

    console.log("🔍 Query result:", JSON.stringify(queryResponse, null, 2));
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

testPinecone();
