'use client';

import { Info } from 'lucide-react';
import { useState } from 'react';

import { copyRichTextToClipboard, copyToClipboard, downloadAsFile } from '@/lib/exportUtils';
import { useMarkdownPreview } from '@/hooks/useMarkdownPreview';
import { DEFAULT_MARKDOWN } from '@/constants/templates';
import type { Template } from '@/lib/getTemplates';
import { useToast } from '@/hooks/useToast';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EditorPanel } from '@/components/EditorPanel';
import { PreviewPanel } from '@/components/PreviewPanel';
import { TemplateModal } from '@/components/TemplateModal';
import { ToastContainer } from '@/components/ToastContainer';

interface ClientPageProps {
  templates: Template[];
}

const ClientPage = ({ templates }: ClientPageProps) => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MARKDOWN);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const { toasts, showToast } = useToast();
  const { parsedHtml, cleanHtml, words, chars, readTime } = useMarkdownPreview(markdown);

  const loadTemplate = (template: Template) => {
    setMarkdown(template.content);
    setIsModalOpen(false);
    showToast('Loaded template successfully!', 'success');
  };

  return (
    <>
      <ToastContainer toasts={toasts} />
      <Header 
        onLoadTemplate={() => setIsModalOpen(true)}
        onClear={() => {
          setMarkdown('');
          showToast('Editor cleared.', 'info');
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 flex flex-col gap-6">
        <div className="bg-lavender/30 border border-primary-200 rounded-xl p-4 flex gap-3 text-primary shadow-sm">
          <div className="text-primary shrink-0 mt-0.5">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-sm leading-relaxed">
            <span className="font-semibold">How this works:</span> Standard Markdown editors copy inline styles,
            such as fonts, colors, and rigid layout structures, which clutter destination canvases upon pasting.
            <strong> MarkRich</strong> strips out custom styling parameters entirely and provides compliant, clean structural
            elements. Target systems, including Google Docs and Microsoft Word, read this schema cleanly and automatically
            adopt your default document theme rules.
          </div>
        </div>

        <TemplateModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          templates={templates}
          onSelect={loadTemplate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch flex-1">
          <EditorPanel
            markdown={markdown}
            setMarkdown={setMarkdown}
            words={words}
            chars={chars}
            readTime={readTime}
          />
          <PreviewPanel
            parsedHtml={parsedHtml}
            cleanHtml={cleanHtml}
            onCopyRich={() => copyRichTextToClipboard(markdown, cleanHtml, showToast)}
            onCopyRaw={(format) => copyToClipboard(format, markdown, cleanHtml, showToast)}
            onDownload={(ext) => downloadAsFile(ext, markdown, cleanHtml, showToast)}
          />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ClientPage;
