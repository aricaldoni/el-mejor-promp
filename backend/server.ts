
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Prisma setup
const prisma = new PrismaClient();

// OpenAI setup - Add explicit OpenAI API key check
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error("ERROR: OPENAI_API_KEY is not set in your environment variables");
  console.error("Please add your OpenAI API key to the .env file: OPENAI_API_KEY=your-key");
  process.exit(1);
}

const openai = new OpenAI({
    apiKey: openaiApiKey,
});

app.post('/api/enhance-prompt', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert prompt engineer. Your task is to improve prompts provided by the user for better results from AI models like ChatGPT. Enhance the prompt while maintaining the original intent, but adding structure, clarity, details, and specificity. The enhanced prompt must be in Spanish.",
                },
                {
                    role: "user",
                    content: `Improve this prompt for better results: ${prompt}`,
                },
            ],
            temperature: 0.5,
            max_tokens: 1000,
        });

        const enhancedPrompt = completion.choices[0].message.content;

        // Log data to the database (using Prisma)
        try {
            const newPromptLog = await prisma.promptLog.create({
                data: {
                    uniqueId: Math.random().toString(36).substring(2, 15), // Generate a random string for unique ID
                    initialPrompt: prompt,
                    enhancedPrompt: enhancedPrompt || '',
                    dateAndTime: new Date(), // Current date and time
                },
            });

            console.log('Prompt Log Created:', newPromptLog);
        } catch (dbError) {
            console.error("Database error:", dbError);
            // Continue with the response even if DB logging fails
        }

        res.json({ enhancedPrompt });
    } catch (error) {
        console.error("Error processing prompt:", error);
        res.status(500).json({ error: 'Failed to enhance prompt. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
