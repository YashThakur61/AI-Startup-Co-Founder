import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

export async function generateJSON<T>(
  systemPrompt: string,
  userMessage: string
): Promise<T> {
  const client = getOpenAIClient();
  
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 4096,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  try {
    return JSON.parse(content) as T;
  } catch {
    throw new Error(`Failed to parse OpenAI response as JSON: ${content.substring(0, 200)}`);
  }
}
