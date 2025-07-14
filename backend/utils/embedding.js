// backend/utils/embedding.js
// const axios = require('axios');
import dotenv from 'dotenv'
import('dotenv').config();

const getEmbedding = async (text) => {
  const res = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      input: text,
      model: 'text-embedding-3-small',
      dimensions: 512 // optional, but keeps it clear
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  return res.data.data[0].embedding;
};

module.exports = getEmbedding;
