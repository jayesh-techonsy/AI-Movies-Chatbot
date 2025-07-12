// // backend/agent/chatAgent.js

// import { config } from 'dotenv';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
// import OpenAI from 'openai';

// config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // Initialize Pinecone
// const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

// // Langchain vector store
// const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//   pineconeIndex,
//   namespace: '__default__',
// });

// // 🧠 Extract query + filter from user prompt
// async function extractQueryAndFilters(userInput) {
//   const systemPrompt = `You're an assistant that helps extract movie search filters and query from natural language.

// Respond ONLY in this strict JSON format:
// {
//   "query": "<semantic meaning>",
//   "filters": {
//     "genre": "<optional genre string>",
//     "year": <optional year>,
//     "rating": <optional rating as number>
//   }
// }

// If any filter is not present, leave it out of "filters".`;

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     temperature: 0.2,
//     messages: [
//       { role: 'system', content: systemPrompt },
//       { role: 'user', content: userInput },
//     ],
//   });

//   const raw = response.choices[0].message.content;

//   try {
//     const parsed = JSON.parse(raw);
//     return {
//       query: parsed.query || userInput,
//       filters: parsed.filters || {},
//     };
//   } catch (e) {
//     console.warn('⚠️ Failed to parse filters from AI. Using fallback query.');
//     return { query: userInput, filters: {} };
//   }
// }

// function convertFiltersForPinecone(filters) {
//   const flatFilter = {};

//   for (const key in filters) {
//     let value = filters[key];

//     if (typeof value === 'number') {
//       // Ensure all numbers are floats, even integers
//       flatFilter[key] = parseFloat(value.toFixed(1));
//     } else if (typeof value === 'string') {
//       flatFilter[key] = value.toLowerCase();
//     } else if (typeof value === 'object' && value !== null) {
//       const nestedFilter = {};
//       for (const op in value) {
//         const val = value[op];
//         nestedFilter[op] = parseFloat(val.toFixed(1));
//       }
//       flatFilter[key] = nestedFilter;
//     }
//   }

//   return flatFilter;
// }

// // 🤖 Final handler for search
// export async function chatHandler(userInput) {
//   const { query, filters } = await extractQueryAndFilters(userInput);
//   const pineconeFilter = convertFiltersForPinecone(filters);

//   console.log('🔍 Searching for:', query);
//   console.log('📦 Filters:', JSON.stringify(pineconeFilter));

//   try {
//     const results = await vectorStore.similaritySearch(query, 5, {
//       filter: pineconeFilter,
//     });

//     if (!results.length) return '❌ No matching movies found.';

//     const formatted = results
//       .map(
//         (r, i) =>
//           `${i + 1}. ${r.metadata.title} (${r.metadata.year}) - ${r.metadata.rating}/10`
//       )
//       .join('\n');

//     return `🎬 Here are some movies I found:\n\n${formatted}`;
//   } catch (err) {
//     console.error('❌ Pinecone query error:', err.message);
//     return '⚠️ Something went wrong while searching. Please try again.';
//   }
// }


// // backend/agent/chatAgent.js

// import { config } from 'dotenv';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
// import OpenAI from 'openai';

// config();

// // 🔑 OpenAI
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // 📦 Pinecone
// const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

// // 🔗 Langchain vector store
// const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: process.env.OPENAI_API_KEY,
// });

// const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
//   pineconeIndex,
//   namespace: '__default__',
// });

// // 🧠 Extract query + filters
// async function extractQueryAndFilters(userInput) {
//   const systemPrompt = `You're an assistant that helps extract movie search filters and query from natural language.

// Respond ONLY in this strict JSON format:
// {
//   "query": "<semantic meaning>",
//   "filters": {
//     "genre": "<optional genre string>",
//     "year": <optional year>,
//     "rating": <optional rating as number>
//   }
// }

// If any filter is not present, leave it out of "filters".`;

//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     temperature: 0.2,
//     messages: [
//       { role: 'system', content: systemPrompt },
//       { role: 'user', content: userInput },
//     ],
//   });

//   const raw = response.choices[0].message.content;

//   try {
//     const parsed = JSON.parse(raw);
//     return {
//       query: parsed.query || userInput,
//       filters: parsed.filters || {},
//     };
//   } catch (e) {
//     console.warn('⚠️ Failed to parse filters from AI. Using fallback.');
//     return { query: userInput, filters: {} };
//   }
// }

// // ✅ Convert and sanitize filters for Pinecone
// function convertFiltersForPinecone(filters) {
//   const sanitized = {};

//   for (const key in filters) {
//     let value = filters[key];

//     if (key === 'year' || key === 'rating') {
//       const num = Number(value);
//       if (!isNaN(num)) sanitized[key] = Math.floor(num); // force integer
//     } else if (key === 'genre' && typeof value === 'string') {
//       sanitized[key] = value.toLowerCase();
//     }
//   }

//   return sanitized;
// }

// // 🤖 Final handler
// export async function chatHandler(userInput) {
//   const { query, filters } = await extractQueryAndFilters(userInput);
//   const pineconeFilter = convertFiltersForPinecone(filters);

//   console.log('🔍 Searching for:', query);
//   console.log('📦 Filters:', pineconeFilter);
//   console.log(
//     '🧪 Filter Types:',
//     Object.fromEntries(Object.entries(pineconeFilter).map(([k, v]) => [k, typeof v]))
//   );

//   try {
//     const results = await vectorStore.similaritySearch(query, 5, {
//       filter: pineconeFilter,
//     });

//     if (!results.length) return '❌ No matching movies found.';

//     const formatted = results
//       .map(
//         (r, i) =>
//           `${i + 1}. ${r.metadata.title} (${r.metadata.year}) - ${r.metadata.rating}/10`
//       )
//       .join('\n');

//     return `🎬 Here are some movies I found:\n\n${formatted}`;
//   } catch (err) {
//     console.error('❌ Pinecone query error:', err.message);
//     return `❌ Error querying Pinecone: ${err.message}`;
//   }
// }


// backend/agent/chatAgent.js

import { config } from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
import OpenAI from 'openai';

config();

// 🔑 OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📦 Pinecone
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

// 🔗 Langchain vector store
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  namespace: '__default__',
});

// 🧠 Extract query + filters
async function extractQueryAndFilters(userInput) {
  const systemPrompt = `You're an assistant that helps extract movie search filters and query from natural language.

Respond ONLY in this strict JSON format:
{
  "query": "<semantic meaning>",
  "filters": {
    "genre": "<optional genre string>",
    "year": <optional year>,
    "rating": <optional rating as number>
  }
}

If any filter is not present, leave it out of "filters".`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0.2,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userInput },
    ],
  });

  const raw = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(raw);
    return {
      query: parsed.query || userInput,
      filters: parsed.filters || {},
    };
  } catch (e) {
    console.warn('⚠️ Failed to parse filters from AI. Using fallback.');
    return { query: userInput, filters: {} };
  }
}

// 🤖 Final handler
export async function chatHandler(userInput) {
  const { query, filters } = await extractQueryAndFilters(userInput);

  console.log('🔍 Searching for:', query);
  console.log('🎯 Using filters:', filters);

  try {
    // Step 1: Semantic search (no filters)
    const results = await vectorStore.similaritySearch(query, 25);

    if (!results.length) return '❌ No matching movies found.';

    // Step 2: Format results for OpenAI
    const movieList = results.map((r) => ({
      title: r.metadata.title,
      description: r.metadata.description || '',
      year: r.metadata.year,
      rating: r.metadata.rating,
      genre: r.metadata.genre || '',
    }));

    // Step 3: Ask OpenAI to apply filters
    const filterPrompt = `
You are a smart movie assistant. From the list below, filter and return the best matching movies based on the user's request.

User request: "${userInput}"

Movies:
${JSON.stringify(movieList, null, 2)}

Instructions:
- Return a list of 3–5 movies that best match the user request.
- Respond in this format:

🎬 Top movies:
1. Title (Year) - Rating/10
2. ...
    `.trim();

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.3,
      messages: [
        { role: 'user', content: filterPrompt },
      ],
    });

    return aiResponse.choices[0].message.content;
  } catch (err) {
    console.error('❌ Error during movie filtering:', err.message);
    return `❌ Error processing request: ${err.message}`;
  }
}
