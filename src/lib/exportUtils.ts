import type { ToastType } from '@/hooks/useToast';

type ShowToast = (message: string, type?: ToastType) => void;

export const copyRichTextToClipboard = async (
  markdown: string,
  cleanHtml: string,
  showToast: ShowToast
) => {
  if (markdown.trim() === '') {
    showToast('Please enter some markdown before copying!', 'error');
    return;
  }

  const htmlToCopy = cleanHtml;
  const plainTextToCopy = markdown;

  try {
    const htmlBlob = new Blob([htmlToCopy], { type: 'text/html' });
    const plainTextBlob = new Blob([plainTextToCopy], { type: 'text/plain' });

    const data = [new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': plainTextBlob
    })];

    await navigator.clipboard.write(data);
    showToast('Rich Text copied! Ready to paste into Google Docs.', 'success');
    return;
  } catch (err) {
    console.warn('Direct Clipboard API write blocked or unsupported. Falling back to secure event interception.', err);
  }

  let copySuccess = false;
  const copyListener = (e: ClipboardEvent) => {
    e.clipboardData?.setData('text/html', htmlToCopy);
    e.clipboardData?.setData('text/plain', plainTextToCopy);
    e.preventDefault();
    copySuccess = true;
  };

  document.addEventListener('copy', copyListener);

  try {
    const dummy = document.createElement('span');
    dummy.textContent = 'processing';
    dummy.style.position = 'fixed';
    dummy.style.left = '-9999px';
    dummy.style.top = '0';
    dummy.style.opacity = '0';
    document.body.appendChild(dummy);

    const range = document.createRange();
    range.selectNode(dummy);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);

    document.execCommand('copy');

    selection?.removeAllRanges();
    document.body.removeChild(dummy);
  } catch (fallbackErr) {
    console.error('Synchronous copy interception failed:', fallbackErr);
  }

  document.removeEventListener('copy', copyListener);

  if (copySuccess) {
    showToast('Rich Text copied cleanly to clipboard!', 'success');
  } else {
    showToast('Copying failed. Please copy the clean source tab manually.', 'error');
  }
};

export const copyToClipboard = (
  format: 'markdown' | 'html',
  markdown: string,
  cleanHtml: string,
  showToast: ShowToast
) => {
  const textToCopy = format === 'markdown' ? markdown : cleanHtml;

  if (textToCopy.trim() === '') {
    showToast('Nothing to copy!', 'error');
    return;
  }

  try {
    navigator.clipboard.writeText(textToCopy);
    showToast(`Copied ${format === 'markdown' ? 'Raw Markdown' : 'Clean HTML code'} to clipboard!`, 'info');
  } catch (err) {
    const errorMessage = `Failed to copy ${format === 'markdown' ? 'Markdown' : 'HTML'}: ${err instanceof Error ? err.message : 'Error copying format'}`;
    showToast(errorMessage, 'error');
  }
};

export const downloadAsFile = (
  extension: 'md' | 'html',
  markdown: string,
  cleanHtml: string,
  showToast: ShowToast
) => {
  if (markdown.trim() === '') {
    showToast('Write some content first before exporting!', 'error');
    return;
  }

  let fileContent = '';
  let mimeType = 'text/plain';
  let fileName = `document-${Date.now()}`;

  if (extension === 'md') {
    fileContent = markdown;
    mimeType = 'text/markdown';
    fileName += '.md';
  } else if (extension === 'html') {
    fileContent = cleanHtml;
    mimeType = 'text/html';
    fileName += '.html';
  }

  const blob = new Blob([fileContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Downloaded successfully as ${fileName}`, 'success');
};
