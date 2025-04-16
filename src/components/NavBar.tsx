
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

const NavBar = () => {
  return (
    <nav className="border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-semibold text-xl">El Mejor Prompt</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground" asChild>
            <a href="https://github.com/your-username/el-mejor-prompt" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
