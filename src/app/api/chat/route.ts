import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import * as dotenv from 'dotenv';
dotenv.config();

// Cria a instância do OpenAI
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict'
});

export async function POST(req: Request) {
  try {
      const { messages } = await req.json();

      if (!Array.isArray(messages)) {
          return new Response('Mensagem inválida', { status: 400 });
      }

      const result = await streamText({
          model: openai('gpt-3.5-turbo'),
          messages,
      });

      // console.log(text)

      return result.toDataStreamResponse()

      // Retorna a resposta com o text
  } catch (error) {
      console.error('Erro ao gerar o texto:', error);
      return new Response('Erro interno do servidor', { status: 500 });
  }
}
