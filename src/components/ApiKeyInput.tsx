
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { enhancePrompt } from "@/utils/openai";  // Import enhancePrompt

interface PromptInputProps {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
}

const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
    const [prompt, setPrompt] = useState("");
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast({
                title: "Empty Prompt",
                description: "Please enter a prompt before submitting.",
                variant: "destructive",
            });
            return;
        }

        onSubmit(prompt);
        try {
            setIsLoading(true);
            // Call the enhancePrompt function and pass the API key
            const enhanced = await enhancePrompt({prompt: prompt, apiKey:""});
            onSubmit(enhanced)
            toast({
                title: "Prompt Mejorado",
                description: "Tu prompt ha sido mejorado exitosamente.",
            });
            // TODO: Implement function to Log Data to backend
        } catch (error: any) {
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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && e.ctrlKey) {
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full space-y-2">
            <div className="flex justify-between">
                <label htmlFor="prompt" className="text-sm font-medium">
                    Tu Prompt
                </label>
                <span className="text-xs text-muted-foreground">
                    Presiona Ctrl+Enter para enviar
                </span>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                    id="prompt"
                    placeholder="🔍 Dinos qué necesitas, nosotros afinamos el prompt por ti..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[120px] resize-y"
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? (
                        <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"/>
                            Mejorando...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4"/>
                            Mejorar Prompt
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default PromptInput;
