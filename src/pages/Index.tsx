
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import PromptInput from "@/components/PromptInput";
import EnhancedPrompt from "@/components/EnhancedPrompt";
import { enhancePrompt } from "@/utils/openai";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelp, Zap } from "lucide-react";

const Index = () => {
  const [enhancedPrompt, setEnhancedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);
    // Load API key from localStorage on component mount
    useEffect(() => {
        const savedApiKey = localStorage.getItem("openai-api-key");
        if (savedApiKey) {
            setApiKey(savedApiKey);
        }
    }, []);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await enhancePrompt({ prompt:prompt, apiKey:apiKey! });
      setEnhancedPrompt(result);
      toast({
        title: "Prompt Mejorado",
        description: "Tu prompt ha sido mejorado exitosamente.",
      });
    } catch (error: any) {
      console.error("Ingresa tu prompt nuevamente:", error);
      
      toast({
        title: "Mejora Fallida",
        description: "Hubo un error al mejorar tu prompt. Por favor intenta de nuevo más tarde.",
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
              Ingresa tu prompt en español y obtén una versión optimizada y profesional en segundos.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="w-full max-w-2xl">
              <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
            </div>
            
            <div className="w-full max-w-2xl">
              {enhancedPrompt ? (
                <>
                  <div className="text-center text-sm text-muted-foreground mb-2">
                    Copia el prompt haciendo clic en el botón "Copiar al Portapapeles"
                  </div>
                  <EnhancedPrompt prompt={enhancedPrompt} />
                </>
              ) : (
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle>Tu prompt mejorado aparecerá aquí</CardTitle>
                    <CardDescription>
                      Ingresa un prompt arriba y haz clic en "Mejorar" para comenzar
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
                <CardTitle className="text-xl">Aprende mejores tecnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Aprende ingeniería de prompts mientras utilizas la herramienta.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-1">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-xl">Copia con Un Clic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Copia tu prompt con un solo clic y pégalo en ChatGPT, Deepseek, Gemini u otros.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} El Mejor Prompt. Argentina. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
