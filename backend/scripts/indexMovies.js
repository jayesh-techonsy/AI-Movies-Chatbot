// import { createClient } from '@supabase/supabase-js';
// import { OpenAI } from 'openai';
// import { Pinecone } from '@pinecone-database/pinecone';
// import dotenv from 'dotenv';

// dotenv.config();

// // 🔗 Setup Supabase
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// // 🤖 Setup OpenAI
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // 📦 Setup Pinecone
// const pinecone = new Pinecone();
// const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

// async function generateDescription(title) {
//   const prompt = `Write a one-sentence movie description for the movie titled "${title}".`;

//   const chat = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: prompt }],
//   });

//   return chat.choices[0]?.message?.content?.trim();
// }

// async function embedText(text) {
//   const embedding = await openai.embeddings.create({
//     model: 'text-embedding-ada-002',
//     input: text,
//   });

//   return embedding.data[0].embedding;
// }

// async function indexMovies() {
//   const { data: movies, error } = await supabase.from('movies').select('*');

//   if (error) {
//     console.error('❌ Error fetching movies:', error);
//     return;
//   }

//   for (const movie of movies) {
//     const { id, title, year, rating } = movie;

//     try {
//       const description = await generateDescription(title);
//       const inputText = `${title}. ${description}`;
//       const vector = await embedText(inputText);

//       await pineconeIndex.upsert([
//         {
//           id: `movie-${id}`,
//           values: vector,
//           metadata: {
//             title,
//             description,
//             year,
//             rating,
//           },
//         },
//       ]);

//       console.log(`✅ Indexed: ${title}`);
//     } catch (err) {
//       console.error(`❌ Failed for ${title}:`, err.message);
//     }
//   }
// }

// indexMovies();


import { createClient } from '@supabase/supabase-js';
import { OpenAI } from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

// 🔗 Setup Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 🤖 Setup OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📦 Setup Pinecone
const pinecone = new Pinecone();
const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

async function generateDescription(title) {
  const prompt = `Write a one-sentence movie description for the movie titled "${title}".`;

  const chat = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return chat.choices[0]?.message?.content?.trim();
}

async function embedText(text) {
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return embedding.data[0].embedding;
}

async function indexMovies() {
  const { data: movies, error } = await supabase.from('movies').select('*');

  if (error) {
    console.error('❌ Error fetching movies:', error);
    return;
  }

  for (const movie of movies) {
    const { id, title, year, rating, genre } = movie;

    try {
      const description = await generateDescription(title);
      const inputText = `${title}. ${description}`;
      const vector = await embedText(inputText);

      await pineconeIndex.upsert([
        {
          id: `movie-${id}`,
          values: vector,
          metadata: {
            title,
            description,
            genre: genre?.toLowerCase() || undefined, // normalize genre
            year: Number(year),                      // ✅ force to number
            rating: Number(rating),                  // ✅ force to number
          },
        },
      ]);

      console.log(`✅ Indexed: ${title}`);
    } catch (err) {
      console.error(`❌ Failed for ${title}:`, err.message);
    }
  }
}

indexMovies();
