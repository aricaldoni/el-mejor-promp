
interface EnhancePromptOptions {
  prompt: string;
  apiKey: string;
}

export async function enhancePrompt({ prompt, apiKey }: EnhancePromptOptions): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a prompt engineering expert. Your task is to take a user's prompt and enhance it to get better results from ChatGPT. 
            Follow these guidelines:
            1. Make the prompt more specific and detailed
            2. Add relevant context that was implied but not stated
            3. Structure the prompt with clear formatting for better readability
            4. Include appropriate instructions on tone, format, and audience if missing
            5. Consider adding constraints or specific requirements to guide the AI
            6. Do not invent or add information that drastically changes the original intent
            
            Return only the enhanced prompt, without explanations or additional text. Do not include 'Enhanced Prompt:' or other headers.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}
