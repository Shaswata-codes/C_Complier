import { Play, Code2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onRun: () => void;
  isRunning: boolean;
}

const Header = ({ onRun, isRunning }: HeaderProps) => {
  return (
    <header className="bg-header border-b border-border px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 glow-primary-sm">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Online C Compiler</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Write, compile, and run C code</p>
          </div>
        </div>
        <Button
          onClick={onRun}
          disabled={isRunning}
          className="glow-primary hover:glow-primary gap-2 px-5"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="hidden sm:inline">Running</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="hidden sm:inline">Run</span>
            </>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
