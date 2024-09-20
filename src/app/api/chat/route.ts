import * as dotenv from 'dotenv';
import OpenAI from 'openai';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const modelId = process.env.OPENAI_MODEL_ID || '';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Corpo da requisição:", body);

        const { messages } = body;

        const result = await openai.chat.completions.create({
            model: modelId,
            messages,
            max_tokens: 250,
            temperature: 0.8,
        });
    
        const completion = result.choices[0].message
        return new Response(JSON.stringify({ role: "system", content: completion }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Erro ao gerar o texto:', error);
        return new Response('Erro interno do servidor', { status: 500 });
    }
}
