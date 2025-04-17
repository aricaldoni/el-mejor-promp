
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyInputProps {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
}

const ApiKeyInput = ({ onSubmit, isLoading }: ApiKeyInputProps) => {
    const [prompt, setPrompt] = useState("");
    const [localIsLoading, setLocalIsLoading] = useState(false);
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

        try {
            setLocalIsLoading(true);
            // Call the backend instead of direct OpenAI
            const response = await fetch('http://localhost:3000/api/enhance-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });
            
            if (response.ok) {
                const data = await response.json();
                onSubmit(data.enhancedPrompt);
                toast({
                    title: "Prompt Mejorado",
                    description: "Tu prompt ha sido mejorado exitosamente.",
                });
            } else {
                throw new Error('Error from server');
            }
        } catch (error) {
            console.error("Failed to enhance prompt:", error);
            toast({
                title: "Mejora Fallida",
                description: "Hubo un error al mejorar tu prompt. Por favor intenta de nuevo más tarde.",
                variant: "destructive",
            });
        } finally {
            setLocalIsLoading(false);
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
                    disabled={localIsLoading || isLoading}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={localIsLoading || isLoading || !prompt.trim()}
                >
                    {localIsLoading || isLoading ? (
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

export default ApiKeyInput;
