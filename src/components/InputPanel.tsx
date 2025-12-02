import { Textarea } from "@/components/ui/textarea";

interface InputPanelProps {
  input: string;
  onChange: (value: string) => void;
}

const InputPanel = ({ input, onChange }: InputPanelProps) => {
  return (
    <div className="input-container flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border">
        <label className="text-sm font-medium text-muted-foreground">
          Input (optional)
        </label>
      </div>
      <Textarea
        value={input}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter program input here (stdin)..."
        className="flex-1 resize-none border-0 bg-transparent font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0 scrollbar-thin p-4"
      />
    </div>
  );
};

export default InputPanel;
