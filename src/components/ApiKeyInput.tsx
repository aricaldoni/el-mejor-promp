
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key, Eye, EyeOff } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeyChange }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    } else {
      // If no API key is found, open the dialog
      setDialogOpen(true);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      if (!apiKey.startsWith("sk-")) {
        toast({
          title: "Clave API Inválida",
          description: "La clave API de OpenAI debe comenzar con 'sk-'",
          variant: "destructive",
        });
        return;
      }

      localStorage.setItem("openai-api-key", apiKey);
      onApiKeyChange(apiKey);
      setDialogOpen(false);
      
      toast({
        title: "Clave API Guardada",
        description: "Tu clave API de OpenAI ha sido guardada correctamente.",
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Key className="h-4 w-4" />
          Clave API
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clave API de OpenAI</DialogTitle>
          <DialogDescription>
            Ingresa tu clave API de OpenAI para usar esta aplicación. Tu clave se almacena localmente en tu navegador.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showApiKey ? "Ocultar clave API" : "Mostrar clave API"}
                </span>
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleSaveApiKey} 
            disabled={!apiKey.trim().startsWith("sk-")}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyInput;
