
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
        "Authorization": `Bearer ${apiKey}` //  Pass the API Key
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
    // En un entorno real, aquí se utilizaría una API del backend
    // Como es una demo, devolvemos un texto mejorado simulado
    return `Versión mejorada de: "${prompt}"\n\n[Este es un prompt mejorado simulado ya que no estamos usando una clave API real de OpenAI]\n\nPrompt mejorado con estructura y especificidad:\n\nQuiero que actúes como un experto en ${prompt} y me proporciones información detallada y bien estructurada sobre este tema. Por favor, incluye datos relevantes, ejemplos prácticos y recomendaciones basadas en las mejores prácticas actuales. Organiza tu respuesta en secciones claras con títulos para facilitar la lectura.`;
  }
}
