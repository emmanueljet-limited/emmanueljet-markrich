import { useState } from 'react';
import { Eye, Download, FileDown, FileCode, Copy, ClipboardCopy } from 'lucide-react';

interface PreviewPanelProps {
  parsedHtml: string;
  cleanHtml: string;
  onCopyRich: () => void;
  onCopyRaw: (format: 'markdown' | 'html') => void;
  onDownload: (ext: 'md' | 'html') => void;
}

export const PreviewPanel = ({ parsedHtml, cleanHtml, onCopyRich, onCopyRaw, onDownload }: PreviewPanelProps) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'html'>('visual');

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-lavender overflow-hidden h-170">
      <div className="bg-white/50 border-b border-lavender px-4 py-2 flex items-center justify-between">
        <div className="flex bg-lavender/50 p-1 rounded-xl border border-primary/10">
          <button
            onClick={() => setActiveTab('visual')}
            className={`tab-btn px-4 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'visual' ? 'bg-white text-primary shadow-sm' : 'text-graphite hover:text-primary'}`}
            aria-label="Visual Preview Tab"
          >
            Visual Preview
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`tab-btn px-4 py-1.5 text-xs font-bold rounded-lg transition ${activeTab === 'html' ? 'bg-white text-primary shadow-sm' : 'text-graphite hover:text-primary'}`}
            aria-label="Clean HTML Preview Tab"
          >
            Clean HTML Preview
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 relative bg-white">
        {activeTab === 'visual' && (
          <div className="prose max-w-none text-black space-y-4 visual-preview">
            {parsedHtml ? (
              <div dangerouslySetInnerHTML={{ __html: parsedHtml }} />
            ) : (
              <div className="text-graphite text-center py-20">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-40 text-primary" />
                <p className="text-sm">Type some markdown to see the live rendering...</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'html' && (
          <div className="h-full flex flex-col gap-2">
            <p className="text-xs text-graphite mb-2">This is the exact, simplified markup parsed for copying. Notice there are <strong>no classes, no styling variables, and no backgrounds injected</strong>.</p>
            <pre className="flex-1 p-4 bg-black text-lavender rounded-xl overflow-auto text-xs code-font select-all border border-primary/20">
              <code>{cleanHtml || '<!-- Clean output empty -->'}</code>
            </pre>
          </div>
        )}
      </div>

      <div className="bg-white/50 border-t border-lavender p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="text-xs text-graphite text-center sm:text-left">
          <p className="font-bold text-primary">Optimized for:</p>
          <p>Google Docs, Word, Outlook, & Notion</p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
          <div className="relative group">
            <button className="px-3.5 py-3 bg-lavender text-primary hover:bg-primary/30 font-bold rounded-xl text-sm transition flex items-center justify-center gap-1.5" aria-label="Export Options">
              <Download className="w-4 h-4" />
            </button>
            <div className="hidden absolute bottom-14 right-0 bg-white border border-lavender shadow-xl rounded-xl p-2 w-48 text-left group-hover:flex hover:flex z-10 flex-col gap-1">
              <button onClick={() => onDownload('md')} className="w-full text-left px-3 py-2 text-xs font-semibold text-graphite hover:bg-lavender/30 rounded-lg flex items-center gap-2" aria-label="Download as MD">
                <FileDown className="w-3.5 h-3.5 text-primary" /> Download as .MD
              </button>
              <button onClick={() => onDownload('html')} className="w-full text-left px-3 py-2 text-xs font-semibold text-graphite hover:bg-lavender/30 rounded-lg flex items-center gap-2" aria-label="Download Clean HTML">
                <FileCode className="w-3.5 h-3.5 text-primary" /> Download Clean HTML
              </button>
              <button onClick={() => onCopyRaw('markdown')} className="w-full text-left px-3 py-2 text-xs font-semibold text-graphite hover:bg-lavender/30 rounded-lg flex items-center gap-2" aria-label="Copy Raw Markdown">
                <Copy className="w-3.5 h-3.5 text-secondary" /> Copy Raw Markdown
              </button>
            </div>
          </div>

          <button
            onClick={onCopyRich}
            className="flex-1 sm:flex-none px-6 py-3 bg-linear-to-br from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/25 active:scale-95 transition flex items-center justify-center gap-2"
            aria-label="Copy Rich Text"
          >
            <ClipboardCopy className="w-4 h-4" />
            Copy Rich Text
          </button>
        </div>
      </div>
    </div>
  );
};
