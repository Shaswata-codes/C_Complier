import { useEffect, useRef } from "react";
import { Terminal, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface OutputConsoleProps {
  output: string;
  error: string;
  exitCode: number | null;
  isRunning: boolean;
}

const OutputConsole = ({ output, error, exitCode, isRunning }: OutputConsoleProps) => {
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output, error]);

  const hasError = error.length > 0;
  const hasOutput = output.length > 0 || hasError;

  return (
    <div className="console-container flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Output</span>
        </div>
        {exitCode !== null && !isRunning && (
          <div className="flex items-center gap-1.5">
            {exitCode === 0 ? (
              <CheckCircle className="w-3.5 h-3.5 text-success" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-destructive" />
            )}
            <span className={`text-xs ${exitCode === 0 ? 'text-success' : 'text-destructive'}`}>
              Exit code: {exitCode}
            </span>
          </div>
        )}
        {isRunning && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-primary animate-spin-slow" />
            <span className="text-xs text-primary">Running...</span>
          </div>
        )}
      </div>
      <pre
        ref={outputRef}
        className="flex-1 p-4 font-mono text-sm overflow-auto scrollbar-thin whitespace-pre-wrap break-words"
      >
        {isRunning ? (
          <span className="text-muted-foreground">Executing code...</span>
        ) : !hasOutput ? (
          <span className="text-muted-foreground">Run your code to see output here</span>
        ) : (
          <>
            {error && (
              <span className="text-destructive">{error}</span>
            )}
            {output && (
              <span className="text-foreground">{output}</span>
            )}
          </>
        )}
      </pre>
    </div>
  );
};

export default OutputConsole;
