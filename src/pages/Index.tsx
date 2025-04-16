
import { useState } from "react";
import NavBar from "@/components/NavBar";
import PromptInput from "@/components/PromptInput";
import EnhancedPrompt from "@/components/EnhancedPrompt";
import ApiKeyInput from "@/components/ApiKeyInput";
import { enhancePrompt } from "@/utils/openai";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CircleHelp, Zap } from "lucide-react";

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePromptSubmit = async (prompt: string) => {
    if (!apiKey) {
      toast({
        title: "Clave API Requerida",
        description: "Por favor, introduce tu clave API de OpenAI primero.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await enhancePrompt({ prompt, apiKey });
      setEnhancedPrompt(result);
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
      toast({
        title: "Mejora Fallida",
        description: "Hubo un error al mejorar tu prompt. Por favor verifica tu clave API e intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                El Mejor Prompt
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Transforma tus ideas básicas en instrucciones poderosas y detalladas 
              que generan mejores resultados de ChatGPT.
            </p>
          </div>

          <div className="flex justify-end mb-4">
            <ApiKeyInput onApiKeyChange={setApiKey} />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
            </div>
            <div className="flex items-center justify-center md:hidden">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <div className="h-full w-px bg-border"></div>
              </div>
            </div>
            <div>
              {enhancedPrompt ? (
                <EnhancedPrompt prompt={enhancedPrompt} />
              ) : (
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle>Tu prompt mejorado aparecerá aquí</CardTitle>
                    <CardDescription>
                      Ingresa un prompt a la izquierda y haz clic en "Mejorar" para comenzar
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-xl">Mejores Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Obtén respuestas más precisas, detalladas y creativas de la IA utilizando prompts expertamente elaborados.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <CircleHelp className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-xl">Aprende con Ejemplos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Estudia las mejoras para aprender técnicas efectivas de ingeniería de prompts para uso futuro.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-xl">Copiar con Un Clic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Copia tu prompt mejorado con un solo clic y pégalo directamente en ChatGPT.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} El Mejor Prompt. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
