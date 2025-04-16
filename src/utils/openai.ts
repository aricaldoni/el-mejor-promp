
interface EnhancePromptOptions {
  prompt: string;
}

export async function enhancePrompt({ prompt }: EnhancePromptOptions): Promise<string> {
  try {
    // En un entorno real, esta URL sería reemplazada por tu función de Supabase Edge
    // Ejemplo: const response = await fetch('https://[proyecto-id].supabase.co/functions/v1/enhance-prompt', {
    const response = await fetch("/api/enhance-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.enhancedPrompt;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}
