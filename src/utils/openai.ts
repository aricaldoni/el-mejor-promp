
interface EnhancePromptOptions {
  prompt: string;
}

export async function enhancePrompt({ prompt }: EnhancePromptOptions): Promise<string> {
  try {
    // Obtener la API key del localStorage
    const apiKey = localStorage.getItem("openai-api-key");
    
    if (!apiKey) {
      throw new Error("No se encontró una clave API de OpenAI. Por favor, configura tu clave API.");
    }

    if (!apiKey.startsWith("sk-")) {
      throw new Error("La clave API de OpenAI parece ser inválida. Debería comenzar con 'sk-'.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Eres un experto en ingeniería de prompts. Tu tarea es mejorar los prompts proporcionados por el usuario para obtener mejores resultados de modelos de IA como ChatGPT. Mejora el prompt manteniendo la intención original pero añadiendo estructura, claridad, detalles y especificidad. El prompt mejorado debe estar en español."
          },
          {
            role: "user",
            content: `Mejora este prompt para obtener mejores resultados: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error en la API de OpenAI: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}
