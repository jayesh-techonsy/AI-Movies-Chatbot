import { config } from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/community/vectorstores/pinecone';

config();

async function run() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = await pinecone.index(process.env.PINECONE_INDEX);

  const embeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY });
  const store = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: '__default__',
  });

  const results = await store.similaritySearch('test', 3);
  console.log('🔍 Sample metadata types:');
  results.forEach((r) => {
    console.log({
      title: r.metadata?.title,
      year: r.metadata?.year,
      yearType: typeof r.metadata?.year,
      ratingType: typeof r.metadata?.rating,
      genreType: typeof r.metadata?.genre,
    });
  });
}

run();
