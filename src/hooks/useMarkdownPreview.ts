import { marked } from 'marked';
import { useState, useEffect } from 'react';
import { cleanHtmlForClipboard } from '@/lib/htmlParser';

export const useMarkdownPreview = (markdown: string) => {
  const [parsedHtml, setParsedHtml] = useState<string>('');
  const [cleanHtml, setCleanHtml] = useState<string>('');
  const [words, setWords] = useState<number>(0);
  const [chars, setChars] = useState<number>(0);
  const [readTime, setReadTime] = useState<number>(0);

  useEffect(() => {
    const updatePreviews = async () => {
      if (markdown.trim() === '') {
        setParsedHtml('');
        setCleanHtml('');
        setWords(0);
        setChars(0);
        setReadTime(0);
        return;
      }

      const html = await marked.parse(markdown);
      setParsedHtml(html);
      setCleanHtml(cleanHtmlForClipboard(html));

      const cleanText = markdown.trim();
      const w = cleanText === '' ? 0 : cleanText.split(/\s+/).length;
      setWords(w);
      setChars(markdown.length);
      setReadTime(Math.ceil(w / 200));
    };

    updatePreviews();
  }, [markdown]);

  return { parsedHtml, cleanHtml, words, chars, readTime };
};
