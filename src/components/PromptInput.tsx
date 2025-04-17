
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

interface PromptInputProps {
    onSubmit: (prompt: string) => void;
    isLoading: boolean;
}

const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
    const [prompt, setPrompt] = useState("");
    const [localIsLoading, setLocalIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            toast({
                title: "Prompt Vacío",
                description: "Por favor, ingresa un prompt antes de enviar.",
                variant: "destructive",
            });
            return;
        }

        try {
            setLocalIsLoading(true);
            const backendUrl = 'http://localhost:3000/api/enhance-prompt';

            const response = await axios.post(backendUrl, {
                prompt: prompt
            });

            if (response.status === 200 && response.data.enhancedPrompt) {
                onSubmit(response.data.enhancedPrompt);
                toast({
                    title: "¡Éxito!",
                    description: "Tu prompt ha sido mejorado exitosamente.",
                });
            } else {
                toast({
                    title: "Error del Servidor",
                    description: "Error al mejorar el prompt en el servidor.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error al llamar al backend:", error);
            toast({
                title: "Error de Conexión",
                description: "No se pudo conectar al servidor backend. Asegúrate de que el servidor esté en funcionamiento.",
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

export default PromptInput;
