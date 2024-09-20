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

        const { prompt } = body;

        if (!prompt || typeof prompt !== 'string') {
            return new Response('O prompt deve ser uma string válida.', { status: 400 });
        }

        const result = await openai.completions.create({
            model: modelId,
            prompt: prompt,
            max_tokens: 150,
            temperature: 0.2,
            stop: ["\n", "Como", "Por que", "Qual"],
            frequency_penalty: 1.0,
            presence_penalty: 0.8,
            top_p: 0.9,
            
        });
        

        const completion = result.choices[0].text
        return new Response(JSON.stringify({ role: "system", content: completion }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Erro ao gerar o texto:', error);
        return new Response('Erro interno do servidor', { status: 500 });
    }
}
