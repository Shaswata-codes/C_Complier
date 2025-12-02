interface ExecutionResult {
  output: string;
  error: string;
  exitCode: number;
}

const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

export async function executeCode(code: string, input: string): Promise<ExecutionResult> {
  try {
    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "c",
        version: "*",
        files: [
          {
            name: "main.c",
            content: code,
          },
        ],
        stdin: input,
        compile_timeout: 10000,
        run_timeout: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Check for compilation errors
    if (data.compile && data.compile.code !== 0) {
      return {
        output: "",
        error: data.compile.stderr || data.compile.output || "Compilation failed",
        exitCode: data.compile.code,
      };
    }

    // Get run output
    const run = data.run || {};
    const stdout = run.stdout || "";
    const stderr = run.stderr || "";
    const exitCode = run.code ?? 0;

    // Handle timeout
    if (run.signal === "SIGKILL") {
      return {
        output: stdout,
        error: stderr + "\nExecution timed out (3 second limit)",
        exitCode: 124,
      };
    }

    return {
      output: stdout,
      error: stderr,
      exitCode,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return {
      output: "",
      error: `Failed to execute code: ${message}`,
      exitCode: 1,
    };
  }
}
