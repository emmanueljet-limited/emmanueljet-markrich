import { useRef } from 'react';
import { ShieldCheck, Info, Eraser } from 'lucide-react';

interface SandboxProps {
  onClear: () => void;
}

export const Sandbox = ({ onClear }: SandboxProps) => {
  const pasteBoxRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    if (pasteBoxRef.current) pasteBoxRef.current.innerHTML = '';
    onClear();
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-lavender shadow-sm flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-1">
        <h3 className="text-base font-semibold text-black flex items-center gap-2 mb-2">
          <ShieldCheck className="text-primary w-5 h-5" />
          Sandbox Paste-Test Area
        </h3>
        <p className="text-sm text-graphite mb-4 leading-relaxed">
          Test your clipboard format here! After clicking <span className="bg-lavender text-primary px-1.5 py-0.5 rounded font-bold text-xs border border-primary/20">Copy Rich Text</span>, click inside the box on the right and paste (<kbd className="px-1 py-0.5 bg-white border rounded text-xs">Ctrl+V</kbd> or <kbd className="px-1 py-0.5 bg-white border rounded text-xs">Cmd+V</kbd>).
          You&apos;ll see it pastes instantly using your system/browser&apos;s clean default text styling without bringing in any styling artifacts or weird backgrounds.
        </p>
        <div className="flex gap-2 text-xs text-primary bg-lavender/30 p-3 rounded-lg border border-primary/20">
          <Info className="w-4 h-4 shrink-0 text-primary mt-0.5" />
          <span>If it pastes beautifully here using the box&apos;s default font setting, it will paste with native Google Docs font settings.</span>
        </div>
      </div>

      <div className="w-full md:w-112.5 shrink-0">
        <div
          ref={pasteBoxRef}
          contentEditable={true}
          className="w-full min-h-35 max-h-55 overflow-y-auto p-4 bg-white border border-dashed border-primary rounded-xl outline-none focus:border-primary focus:bg-lavender/10 text-black text-sm transition paste-box"
          data-placeholder="Click here and Paste to test..."
        ></div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-graphite">Pastes formatted rich text directly</span>
          <button
            onClick={handleClear}
            className="text-xs font-bold text-graphite hover:text-rose-600 transition flex items-center gap-1"
            aria-label="Clear sandbox"
          >
            <Eraser className="w-3.5 h-3.5" /> Clear sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
