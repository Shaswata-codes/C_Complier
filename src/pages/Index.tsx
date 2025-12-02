import { useState } from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import InputPanel from "@/components/InputPanel";
import OutputConsole from "@/components/OutputConsole";
import { executeCode } from "@/lib/codeExecutor";
import { toast } from "@/hooks/use-toast";

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Example with input
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    printf("You entered: %d\\n", num);
    
    return 0;
}`;

const Index = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [input, setInput] = useState("42");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (!code.trim()) {
      toast({
        title: "No code to run",
        description: "Please write some C code first",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    setOutput("");
    setError("");
    setExitCode(null);

    try {
      const result = await executeCode(code, input);
      setOutput(result.output);
      setError(result.error);
      setExitCode(result.exitCode);

      if (result.exitCode === 0 && !result.error) {
        toast({
          title: "Success",
          description: "Code executed successfully",
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Execution failed";
      setError(message);
      setExitCode(1);
      toast({
        title: "Execution failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onRun={handleRun} isRunning={isRunning} />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Editor Panel - 70% on desktop */}
          <div className="lg:w-[70%] flex-shrink-0">
            <CodeEditor code={code} onChange={setCode} />
          </div>
          
          {/* Right Panel - Input + Output stacked */}
          <div className="lg:w-[30%] flex flex-col gap-4 min-h-[50vh] lg:min-h-0">
            <div className="h-[25vh] lg:h-[35%]">
              <InputPanel input={input} onChange={setInput} />
            </div>
            <div className="flex-1 min-h-[25vh]">
              <OutputConsole
                output={output}
                error={error}
                exitCode={exitCode}
                isRunning={isRunning}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Run Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-primary shadow-lg active:scale-95 transition-transform disabled:opacity-50"
        >
          {isRunning ? (
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default Index;
