
import { useState } from "react";
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

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    try {
      const result = await enhancePrompt({ prompt });
      setEnhancedPrompt(result);
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
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
                <EnhancedPrompt prompt={enhancedPrompt} />
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
                  <Zap className="h-4 w-4 text-primary" />
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
