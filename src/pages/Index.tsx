import { useState } from "react";
import Header from "@/components/Header";
import CodeEditor from "@/components/CodeEditor";
import InputPanel from "@/components/InputPanel";
import OutputConsole from "@/components/OutputConsole";
import { executeCode } from "@/lib/codeExecutor";
import { toast } from "@/hooks/use-toast";

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Shas Codes\\n");
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

      <Header onRun={handleRun} isRunning={isRunning} />

      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 h-full">
          {/* Editor Panel */}
          <div className="lg:w-[70%] flex-shrink-0 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="relative">
              <CodeEditor code={code} onChange={setCode} />
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-[30%] flex flex-col gap-4 min-h-[50vh] lg:min-h-0">
            <div className="h-[25vh] lg:h-[35%] relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative h-full">
                <InputPanel input={input} onChange={setInput} />
              </div>
            </div>

            <div className="flex-1 min-h-[25vh] relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative h-full">
                <OutputConsole
                  output={output}
                  error={error}
                  exitCode={exitCode}
                  isRunning={isRunning}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Run Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-xl shadow-cyan-500/50 active:scale-95 transition-all duration-200 disabled:opacity-50 hover:shadow-2xl hover:shadow-cyan-500/60"
          >
            {isRunning ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-6xl font-bold tracking-widest select-none pointer-events-none">
  SHAS CODES
</div>

    </div>
  );
};

export default Index;
