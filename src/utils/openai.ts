
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
            content: `Actúa como un ingeniero experto en prompts. Revisa y mejora el siguiente prompt para que sea más claro, específico y efectivo para obtener mejores resultados de una IA generativa. Devuelve SOLO el prompt mejorado, sin añadir explicaciones, saludos ni texto introductorio.`,
          },
          {
            role: "user",
            content: `Prompt original: ${prompt}`,
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
