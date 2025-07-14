// // // backend/agent/chatAgent.js

// // import { config } from 'dotenv';
// // import { OpenAIEmbeddings } from '@langchain/openai';
// // import { Pinecone } from '@pinecone-database/pinecone';
// // import { PineconeStore } from '@langchain/community/vectorstores/pinecone';
// // import OpenAI from 'openai';

// // config();

// // // 🔑 OpenAI
// // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // // 📦 Pinecone
// // const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// // const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

// // // 🔗 Langchain vector store
// // const embeddings = new OpenAIEmbeddings({
// //   openAIApiKey: process.env.OPENAI_API_KEY,
// // });

// // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
// //   pineconeIndex,
// //   namespace: '__default__',
// // });

// // // 🧠 Extract query + filters
// // async function extractQueryAndFilters(userInput) {
// //   const systemPrompt = `You're an assistant that helps extract movie search filters and query from natural language.

// // Respond ONLY in this strict JSON format:
// // {
// //   "query": "<semantic meaning>",
// //   "filters": {
// //     "genre": "<optional genre string>",
// //     "year": <optional year>,
// //     "rating": <optional rating as number>
// //   }
// // }

// // If any filter is not present, leave it out of "filters".`;

// //   const response = await openai.chat.completions.create({
// //     model: 'gpt-3.5-turbo',
// //     temperature: 0.2,
// //     messages: [
// //       { role: 'system', content: systemPrompt },
// //       { role: 'user', content: userInput },
// //     ],
// //   });

// //   const raw = response.choices[0].message.content;

// //   try {
// //     const parsed = JSON.parse(raw);
// //     return {
// //       query: parsed.query || userInput,
// //       filters: parsed.filters || {},
// //     };
// //   } catch (e) {
// //     console.warn('⚠️ Failed to parse filters from AI. Using fallback.');
// //     return { query: userInput, filters: {} };
// //   }
// // }

// // // 🤖 Final handler
// // export async function chatHandler(userInput) {
// //   const { query, filters } = await extractQueryAndFilters(userInput);

// //   console.log('🔍 Searching for:', query);
// //   console.log('🎯 Using filters:', filters);

// //   try {
// //     // Step 1: Semantic search (no filters)
// //     const results = await vectorStore.similaritySearch(query, 25);

// //     if (!results.length) return '❌ No matching movies found.';

// //     // Step 2: Format results for OpenAI
// //     const movieList = results.map((r) => ({
// //       title: r.metadata.title,
// //       description: r.metadata.description || '',
// //       year: r.metadata.year,
// //       rating: r.metadata.rating,
// //       genre: r.metadata.genre || '',
// //     }));

// //     // Step 3: Ask OpenAI to apply filters
// //     const filterPrompt = `
// // You are a smart movie assistant. From the list below, filter and return the best matching movies based on the user's request.

// // User request: "${userInput}"

// // Movies:
// // ${JSON.stringify(movieList, null, 2)}

// // Instructions:
// // - Return a list of 3–5 movies that best match the user request.
// // - Respond in this format:

// // 🎬 Top movies:
// // 1. Title (Year) - Rating/10
// // 2. ...
// //     `.trim();

// //     const aiResponse = await openai.chat.completions.create({
// //       model: 'gpt-4',
// //       temperature: 0.3,
// //       messages: [
// //         { role: 'user', content: filterPrompt },
// //       ],
// //     });

// //     return aiResponse.choices[0].message.content;
// //   } catch (err) {
// //     console.error('❌ Error during movie filtering:', err.message);
// //     return `❌ Error processing request: ${err.message}`;
// //   }
// // }


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

// // 🤖 Final handler
// export async function chatHandler(userInput) {
//   const { query, filters } = await extractQueryAndFilters(userInput);

//   console.log('🔍 Searching for:', query);
//   console.log('🎯 Using filters:', filters);

//   try {
//     // Step 1: Semantic search
//     const results = await vectorStore.similaritySearch(query, 25);
//     if (!results.length) return '❌ No matching movies found.';

//     // Step 2: Format and apply filters manually
//     let movieList = results.map((r) => ({
//       title: r.metadata.title,
//       description: r.metadata.description || '',
//       year: r.metadata.year,
//       rating: r.metadata.rating,
//       genre: r.metadata.genre || '',
//     }));

//     // 🧠 Hard filter in JS (optional but improves accuracy)
//     if (filters.year) {
//       movieList = movieList.filter(m => m.year === filters.year);
//     }
//     if (filters.genre) {
//       movieList = movieList.filter(m => m.genre.toLowerCase().includes(filters.genre.toLowerCase()));
//     }
//     if (filters.rating) {
//       movieList = movieList.filter(m => m.rating >= filters.rating);
//     }

//     if (movieList.length === 0) return '❌ No movies found matching your filters.';

//     const formattedPrompt = `
// You are a smart movie assistant. From the list below, pick the top 3–5 movies that best match the user's request.

// User request: "${userInput}"

// Movies:
// ${JSON.stringify(movieList, null, 2)}

// Instructions:
// - Only include movies that match the user's request (genre: ${filters.genre || 'any'}, year: ${filters.year || 'any'}, rating: ${filters.rating || 'any'}).
// - Format the response like this:

// 🎬 Here are some ${filters.genre ? filters.genre + ' ' : ''}movies from ${filters.year || 'recent years'}:
// • Title (Year) – ⭐ Rating/10
// • ...
// Let me know if you'd like more info about any of them!
//     `.trim();

//     const aiResponse = await openai.chat.completions.create({
//       model: 'gpt-4',
//       temperature: 0.3,
//       messages: [{ role: 'user', content: formattedPrompt }],
//     });

//     return aiResponse.choices[0].message.content;
//   } catch (err) {
//     console.error('❌ Error during movie filtering:', err.message);
//     return `❌ Error processing request: ${err.message}`;
//   }
// }


// backend/agent/chatAgent.js

// import { config } from 'dotenv';
// import OpenAI from 'openai';
// import { Pinecone } from '@pinecone-database/pinecone';

// config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
// const pineconeIndex = await pinecone.index(process.env.PINECONE_INDEX);

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
// }`;

//   const res = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     temperature: 0.2,
//     messages: [
//       { role: 'system', content: systemPrompt },
//       { role: 'user', content: userInput },
//     ],
//   });

//   try {
//     const parsed = JSON.parse(res.choices[0].message.content);
//     return {
//       query: parsed.query || userInput,
//       filters: parsed.filters || {},
//     };
//   } catch (e) {
//     return { query: userInput, filters: {} };
//   }
// }

// export async function chatHandler(userInput) {
//   const { query, filters } = await extractQueryAndFilters(userInput);
//   console.log('🔍 Query:', query);
//   console.log('🎯 Filters:', filters);

//   try {
//     // Step 1: Embed user query
//     const embeddingRes = await openai.embeddings.create({
//       model: 'text-embedding-3-small',
//       input: query,
//       dimensions: 1536,
//     });

//     const userEmbedding = embeddingRes.data[0].embedding;

//     // Step 2: Vector similarity search
//     const searchRes = await pineconeIndex.query({
//       vector: userEmbedding,
//       topK: 30,
//       includeMetadata: true,
//     });

//     const matches = searchRes.matches.map((m) => m.metadata);

//     // Step 3: Filter (optional, loose)
//     let filtered = matches;
//     if (filters.genre) {
//       filtered = filtered.filter((m) =>
//         m.genre?.toLowerCase().includes(filters.genre.toLowerCase())
//       );
//     }
//     if (filters.year) {
//       filtered = filtered.filter((m) => Number(m.year) === Number(filters.year));
//     }
//     if (filters.rating) {
//       filtered = filtered.filter((m) => Number(m.rating) >= Number(filters.rating));
//     }

//     if (!filtered.length) return '❌ No movies found matching your filters.';

//     const prompt = `
// You are a helpful movie assistant. Here is a list of candidate movies based on the user's query:
// User Query: "${userInput}"

// Movies:
// ${JSON.stringify(filtered, null, 2)}

// Instructions:
// - Pick 3–5 best matching movies.
// - Format like this:

// 🎬 Here are some [optional genre/year] movies:
// • Title (Year) – ⭐ Rating/10
// • ...
// Let me know if you'd like more info about any of them!
// `.trim();

//     const aiRes = await openai.chat.completions.create({
//       model: 'gpt-4',
//       temperature: 0.3,
//       messages: [{ role: 'user', content: prompt }],
//     });

//     return aiRes.choices[0].message.content;
//   } catch (err) {
//     console.error('❌ Error in chatHandler:', err.message);
//     return '❌ Something went wrong. Try again later.';
//   }
// }


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

// // 🤖 Final handler
// export async function chatHandler(userInput) {
//   try {
//     // 1️⃣ Semantic search with full query
//     const results = await vectorStore.similaritySearch(userInput, 20);
//     if (!results.length) return '❌ No matching movies found.';

//     const movies = results.map((r) => ({
//       title: r.metadata.title,
//       description: r.metadata.description || '',
//       year: r.metadata.year,
//       rating: r.metadata.rating,
//       genre: r.metadata.genre || '',
//     }));

//     // 2️⃣ Let GPT do the intelligent reasoning + filtering
//     const prompt = `
// You are a helpful movie assistant.

// A user asked: "${userInput}"

// Here are some movies retrieved semantically:
// ${JSON.stringify(movies.slice(0, 10), null, 2)}

// Instructions:
// - Recommend 3–5 movies that best match the request.
// - If no perfect matches exist, explain briefly and suggest close ones.
// - Use a conversational tone.
// - Respond naturally, like a chatbot.
// - Optionally include: Title, Year, Genre, Rating, short Description.

// Begin response:
// `;

//     const aiResponse = await openai.chat.completions.create({
//       model: 'gpt-4',
//       temperature: 0.5,
//       messages: [{ role: 'user', content: prompt }],
//     });

//     return aiResponse.choices[0].message.content.trim();
//   } catch (err) {
//     console.error('❌ Error during movie query:', err.message);
//     return `❌ Error processing request: ${err.message}`;
//   }
// }


// import { config } from 'dotenv';
// import { OpenAIEmbeddings } from '@langchain/openai';
// import { Pinecone } from '@pinecone-database/pinecone';
// import { PineconeStore } from '@langchain/pinecone'; 
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

// // ✅ Classify if the message is a movie query
// async function isMovieQuery(input) {
//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     temperature: 0,
//     messages: [
//       {
//         role: "system",
//         content: `
// You're an assistant that classifies user input.

// If the input is a movie-related query (e.g. about genres, titles, years, ratings, recommendations), respond with "true".

// If the input is a casual greeting, small talk, or unrelated to movies, respond with "false".

// Respond with only "true" or "false".`,
//       },
//       { role: "user", content: input },
//     ],
//   });

//   return response.choices[0].message.content.trim() === "true";
// }

// // 🧠 Extract query + filters
// async function extractQueryAndFilters(userInput) {
//   const systemPrompt = `You're an assistant that extracts movie search filters and the query from user messages.

// Respond ONLY in this JSON format:
// {
//   "query": "<semantic meaning>",
//   "filters": {
//     "genre": "<optional genre>",
//     "year": <optional year>,
//     "rating": <optional rating>
//   }
// }

// Leave out any filter that is not present.`;

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

// // 🤖 Main chat handler
// export async function chatHandler(userInput) {
//   const isQuery = await isMovieQuery(userInput);

//   if (!isQuery) {
//     return "👋 Hi there! How can I help you with movies today?";
//   }

//   const { query, filters } = await extractQueryAndFilters(userInput);
//   console.log('🔍 Searching for:', query);
//   console.log('🎯 Using filters:', filters);

//   try {
//     // Step 1: Semantic search
//     const results = await vectorStore.similaritySearch(query, 25);

//     if (!results.length) return '❌ No matching movies found.';

//     // Step 2: Normalize results
//     let filtered = results.map((r) => ({
//       title: r.metadata.title,
//       description: r.metadata.description || '',
//       year: r.metadata.year,
//       rating: r.metadata.rating,
//       genre: r.metadata.genre || '',
//     }));

//     // Step 3: Apply filters
//     if (filters.genre) {
//       filtered = filtered.filter((m) =>
//         m.genre?.toLowerCase().includes(filters.genre.toLowerCase())
//       );
//     }
//     if (filters.year) {
//       filtered = filtered.filter((m) =>
//         m.year && Number(m.year) === Number(filters.year)
//       );
//     }
//     if (filters.rating) {
//       filtered = filtered.filter((m) =>
//         m.rating && Number(m.rating) >= Number(filters.rating)
//       );
//     }

//     const finalMovies = filtered.length ? filtered : results.map((r) => ({
//       title: r.metadata.title,
//       description: r.metadata.description || '',
//       year: r.metadata.year,
//       rating: r.metadata.rating,
//       genre: r.metadata.genre || '',
//     }));

//     // Step 4: GPT formats the final answer
//     const filterPrompt = `
// You are a helpful movie assistant. From the movie list below, return the best 3–5 matches for the user query.

// User request: "${userInput}"

// Movies:
// ${JSON.stringify(finalMovies.slice(0, 15), null, 2)}

// Instructions:
// - List 3–5 relevant movies with title, year, and rating.
// - Add a dynamic intro based on genre/year if possible.
// - Keep each description short (1–2 lines max).
// - End with: "Let me know if you'd like more info about any of them."
// `.trim();

//     const aiResponse = await openai.chat.completions.create({
//       model: 'gpt-4',
//       temperature: 0.3,
//       messages: [{ role: 'user', content: filterPrompt }],
//     });

//     return aiResponse.choices[0].message.content;
//   } catch (err) {
//     console.error('❌ Error during movie filtering:', err.message);
//     return `❌ Error processing request: ${err.message}`;
//   }
// }


import { config } from 'dotenv';
import OpenAI from 'openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';

config();

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Pinecone setup
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

// Embeddings
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Vector store
const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  namespace: '__default__',
});

// Determine if user input is a movie query
async function isMovieQuery(input) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You're an assistant that classifies user input.

If the input is a movie-related query (e.g. about genres, titles, years, ratings, recommendations), respond with "true".

If the input is a casual greeting, small talk, or unrelated to movies, respond with "false".

Respond with only "true" or "false".`,
      },
      { role: "user", content: input },
    ],
  });

  return response.choices[0].message.content.trim() === "true";
}

// Extract filters
async function extractQueryAndFilters(userInput) {
  const systemPrompt = `You're an assistant that extracts movie search filters and the query from user messages.

Respond ONLY in this JSON format:
{
  "query": "<semantic meaning>",
  "filters": {
    "genre": "<optional genre>",
    "year": <optional year>,
    "rating": <optional rating>
  }
}

Leave out any filter that is not present.`;

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

// Main chat handler
export async function chatHandler(userInput) {
  const isQuery = await isMovieQuery(userInput);

  if (!isQuery) {
    return "👋 Hi there! How can I help you with movies today?";
  }

  const { query, filters } = await extractQueryAndFilters(userInput);
  console.log('🔍 Searching for:', query);
  console.log('🎯 Using filters:', filters);

  try {
    const results = await vectorStore.similaritySearch(query, 25);

    if (!results.length) return '❌ No matching movies found.';

    let filtered = results.map((r) => ({
      title: r.metadata.title,
      description: r.metadata.description || '',
      year: r.metadata.year,
      rating: r.metadata.rating,
      genre: r.metadata.genre || '',
    }));

    if (filters.genre) {
      filtered = filtered.filter((m) =>
        m.genre?.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }
    if (filters.year) {
      filtered = filtered.filter((m) =>
        m.year && Number(m.year) === Number(filters.year)
      );
    }
    if (filters.rating) {
      filtered = filtered.filter((m) =>
        m.rating && Number(m.rating) >= Number(filters.rating)
      );
    }

    const finalMovies = filtered.length ? filtered : results.map((r) => ({
      title: r.metadata.title,
      description: r.metadata.description || '',
      year: r.metadata.year,
      rating: r.metadata.rating,
      genre: r.metadata.genre || '',
    }));

    const filterPrompt = `
You are a helpful movie assistant. From the movie list below, return the best 3–5 matches for the user query.

User request: "${userInput}"

Movies:
${JSON.stringify(finalMovies.slice(0, 15), null, 2)}

Instructions:
- List 3–5 relevant movies with title, year, and rating.
- Add a dynamic intro based on genre/year if possible.
- Keep each description short (1–2 lines max).
- End with: "Let me know if you'd like more info about any of them."
`.trim();

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      temperature: 0.3,
      messages: [{ role: 'user', content: filterPrompt }],
    });

    return aiResponse.choices[0].message.content;
  } catch (err) {
    console.error('❌ Error during movie filtering:', err.message);
    return `❌ Error processing request: ${err.message}`;
  }
}
