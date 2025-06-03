import { createClient } from '@supabase/supabase-js'
import Cerebras from '@cerebras/cerebras_cloud_sdk'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const cerebrasClient = new Cerebras({
  apiKey: process.env.NEXT_PUBLIC_CEREBRAS_API_KEY!,
});

const pineconeApiKey = process.env.PINECONE_API_KEY!;
const pineconeIndexUrl = 'https://cari-stpm-nsayt3o.svc.aped-4627-b74a.pinecone.io';

async function generateQueryEmbedding(query: string): Promise<number[]> {
  try {
    const response = await fetch(`${pineconeIndexUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': pineconeApiKey,
      },
      body: JSON.stringify({
        vector: query, // Replace with the actual embedding vector if available
        topK: 5, // Number of results to retrieve
        includeMetadata: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Embedding generation failed: ${response.status}`);
    }

    const result = await response.json();
    return result.matches.map((match: any) => match.vector); // Adjust based on Pinecone's response structure
  } catch (error) {
    console.error('Error generating embedding with Pinecone:', error);
    throw error;
  }
}

async function getRelevantChunks(query: string) {
  try {
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: await generateQueryEmbedding(query),
      match_count: 5
    });
    if (error) throw error;
    return data.map((row: any) => row.text);
  } catch (error) {
    console.error('Error getting relevant chunks:', error);
    return [];
  }
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function generateResponse(query: string): Promise<string> {
  try {
    const relevantChunks = await getRelevantChunks(query);

    const completionCreateResponse = await cerebrasClient.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Context: ${relevantChunks.join('. ')}\nQuestion: ${query}\nAnswer:`,
        },
      ],
      model: 'llama3.1-8b',
    }) as ChatCompletionResponse;

    return completionCreateResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    return "I apologize, but I'm having trouble generating a response right now. Please try again later.";
  }
}