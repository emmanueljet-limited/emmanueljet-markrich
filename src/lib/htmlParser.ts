export const cleanHtmlForClipboard = (html: string): string => {
  if (typeof window === 'undefined') return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const allElements = doc.body.querySelectorAll('*');

  allElements.forEach(el => {
    const tag = el.tagName.toLowerCase();
    const attrs = Array.from(el.attributes);

    attrs.forEach(attr => {
      const attrName = attr.name.toLowerCase();
      const isHref = attrName === 'href' && tag === 'a';
      const isSrcOrAlt = (attrName === 'src' || attrName === 'alt') && tag === 'img';
      const isTableParam = (attrName === 'colspan' || attrName === 'rowspan') && (tag === 'td' || tag === 'th');

      if (!isHref && !isSrcOrAlt && !isTableParam) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return `<div style="background-color: transparent; background: transparent; color: inherit;">${doc.body.innerHTML}</div>`;
};
