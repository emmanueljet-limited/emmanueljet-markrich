import { FileText, Sparkles, Trash2 } from 'lucide-react';

interface HeaderProps {
  onLoadTemplate: () => void;
  onClear: () => void;
}

export const Header = ({ onLoadTemplate, onClear }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-lavender sticky top-0 z-40 px-4 py-3 sm:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-600 text-white p-2 rounded-xl shadow-md shadow-primary-200">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-black flex items-center gap-2">
              MarkRich
              <span className="text-xs font-semibold bg-lavender text-primary px-2.5 py-0.5 rounded-full border border-primary/30">
                emmanueljet
              </span>
            </h1>
            <p className="text-xs text-graphite">Pure, semantic rich-text copying without style-bloat</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onLoadTemplate}
            className="text-sm font-medium text-primary hover:text-primary px-5 py-1.5 rounded-lg border border-primary/30 hover:bg-lavender/30 transition flex items-center gap-1.5"
            aria-label="Load Template"
          >
            <Sparkles className="w-4 h-4" />
            Load Template
          </button>
          <button
            onClick={onClear}
            className="text-sm font-medium text-rose-600 hover:text-rose-700 px-3 py-1.5 rounded-lg border border-rose-100 hover:bg-rose-50 transition flex items-center gap-1.5"
            aria-label="Clear Editor"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>
    </header>
  );
};
