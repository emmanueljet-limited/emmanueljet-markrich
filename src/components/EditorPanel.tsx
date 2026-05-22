import {
  Bold, Italic, Strikethrough, Quote, Code, List,
  ListOrdered, Table, Link as LinkIcon, Edit3
} from 'lucide-react';
import { useRef, useEffect } from 'react';

interface EditorPanelProps {
  markdown: string;
  setMarkdown: (val: string) => void;
  words: number;
  chars: number;
  readTime: number;
}

export const EditorPanel = ({ markdown, setMarkdown, words, chars, readTime }: EditorPanelProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineCounterRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current && lineCounterRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const insertMarkdown = (prefix: string, suffix: string) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const text = markdown;
    const selectedText = text.substring(start, end);

    const replacement = prefix + selectedText + suffix;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setMarkdown(newText);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
      }
    }, 0);
  };

  const insertHeader = () => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const text = markdown;
    const lastNewline = text.lastIndexOf('\n', start - 1);
    const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

    const currentLine = text.substring(lineStart, start);

    let newText = '';
    if (currentLine.startsWith('# ')) {
      newText = text.substring(0, lineStart) + '## ' + currentLine.slice(2) + text.substring(start);
    } else if (currentLine.startsWith('## ')) {
      newText = text.substring(0, lineStart) + '### ' + currentLine.slice(3) + text.substring(start);
    } else if (currentLine.startsWith('### ')) {
      newText = text.substring(0, lineStart) + currentLine.slice(4) + text.substring(start);
    } else {
      newText = text.substring(0, lineStart) + '# ' + currentLine + text.substring(start);
    }

    setMarkdown(newText);
  };

  const insertTable = () => {
    const tableTemplate = `
| Header 1 | Header 2 |
| :--- | :--- |
| Row 1 Col 1 | Row 1 Col 2 |
| Row 2 Col 1 | Row 2 Col 2 |
`;
    insertMarkdown('', tableTemplate);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        insertMarkdown('**', '**');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        insertMarkdown('*', '*');
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'h') {
        e.preventDefault();
        insertHeader();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const lineCount = markdown.split('\n').length || 1;

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-lavender overflow-hidden h-170">
      <div className="bg-white/50 border-b border-lavender px-4 py-2 flex flex-wrap items-center justify-between gap-2 select-none">
        <div className="flex items-center flex-wrap gap-1">
          <button onClick={() => insertMarkdown('**', '**')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Bold text" title="Bold (Ctrl+B)">
            <Bold className="w-4 h-4" />
          </button>
          <button onClick={() => insertMarkdown('*', '*')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Italic text" title="Italic (Ctrl+I)">
            <Italic className="w-4 h-4" />
          </button>
          <button onClick={() => insertMarkdown('~~', '~~')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Strikethrough" title="Strikethrough">
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-primary/30 mx-1"></div>

          <button onClick={insertHeader} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Heading" title="Heading (Ctrl+H)">
            <span className="font-extrabold text-xs">H#</span>
          </button>
          <button onClick={() => insertMarkdown('> ', '')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Quote" title="Quote">
            <Quote className="w-4 h-4" />
          </button>
          <button onClick={() => insertMarkdown('`', '`')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Inline Code" title="Inline Code">
            <Code className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-primary/30 mx-1"></div>

          <button onClick={() => insertMarkdown('- ', '')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Bullet List" title="Bullet List">
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => insertMarkdown('1. ', '')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Numbered List" title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </button>
          <button onClick={insertTable} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Table" title="Table">
            <Table className="w-4 h-4" />
          </button>
          <button onClick={() => insertMarkdown('[Link Text](', 'https://example.com)')} className="p-1.5 text-graphite hover:bg-lavender/40 hover:text-primary rounded-lg transition" aria-label="Link" title="Link">
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs font-semibold text-primary bg-lavender px-2.5 py-1 rounded-md border border-primary/20 flex items-center gap-1">
          <Edit3 className="w-3.5 h-3.5" /> MD Editor
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        <div
          ref={lineCounterRef}
          className="w-12 bg-white/40 border-r border-lavender py-4 text-right pr-3 text-primary code-font text-sm select-none overflow-hidden h-full"
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 resize-none border-none outline-none focus:ring-0 p-4 code-font text-sm text-black leading-relaxed overflow-y-auto"
          placeholder="Write or paste your Markdown here..."
          aria-label="Markdown input"
        ></textarea>
      </div>

      <div className="bg-white/40 border-t border-lavender px-4 py-2.5 flex items-center justify-between text-xs text-graphite">
        <div className="flex items-center gap-4">
          <span><strong className="text-black">{words}</strong> words</span>
          <span><strong className="text-black">{chars}</strong> characters</span>
          <span><strong className="text-black">{readTime}</strong> min read</span>
        </div>
        <div className="font-semibold text-primary">Markdown Input</div>
      </div>
    </div>
  );
};
