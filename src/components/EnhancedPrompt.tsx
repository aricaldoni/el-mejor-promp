
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ClipboardCopy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EnhancedPromptProps {
  prompt: string | null;
}

const EnhancedPrompt = ({ prompt }: EnhancedPromptProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) return null;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Prompt Mejorado</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={copyToClipboard}
            disabled={copied}
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                ¡Copiado!
              </>
            ) : (
              <>
                <ClipboardCopy className="mr-2 h-4 w-4" />
                Copiar al Portapapeles
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap rounded-md bg-secondary p-4 text-secondary-foreground">
          {prompt}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPrompt;
