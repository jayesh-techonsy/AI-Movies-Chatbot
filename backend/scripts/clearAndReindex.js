// scripts/clearAndReindex.js

import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

// 🔐 Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 🔐 OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🔐 Pinecone
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = process.env.PINECONE_INDEX;
const namespace = '__default__';

// 🧹 Clear all vectors in namespace
async function clearNamespace() {
  try {
    const index = pinecone.index(indexName);
    console.log(`🧹 Deleting all vectors in namespace "${namespace}"...`);
    await index._deleteAll({ namespace });
    console.log(`✅ Cleared all vectors.`);
  } catch (err) {
    console.error('❌ Failed to delete vectors:', err.message || err);
    process.exit(1);
  }
}

// 📖 Generate description using OpenAI
async function generateDescription(title) {
  const prompt = `Write a five-sentence movie description for the movie titled "${title}".`;
  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return chat.choices[0]?.message?.content?.trim();
}

// 🔢 Embed text into vector
async function embedText(text) {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });
  return embedding.data[0].embedding;
}

// 📥 Reindex from Supabase
async function reindexMovies() {
  const { data: movies, error } = await supabase.from('movies').select('*');
  if (error) {
    console.error('❌ Error fetching movies from Supabase:', error.message);
    return;
  }

  const index = pinecone.index(indexName);

  for (const movie of movies) {
    const { id, title, year, rating, genre } = movie;

    try {
      const description = await generateDescription(title);
      const inputText = `${title}. ${description}`;
      const vector = await embedText(inputText);

      await index.upsert([
        {
          id: `movie-${id}`,
          values: vector,
          metadata: {
            title,
            description,
            genre: genre?.toLowerCase() || '',
            year: year ? parseInt(year) : undefined,
            rating: rating ? parseFloat(rating) : undefined,
          },
        },
      ], { namespace });

      console.log(`✅ Re-indexed: ${title}`);
    } catch (err) {
      console.error(`❌ Failed indexing "${title}":`, err.message);
    }
  }
}

// 🚀 Run
(async () => {
  await clearNamespace();
  await reindexMovies();
})();
