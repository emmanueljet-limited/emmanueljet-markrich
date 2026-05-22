import fs from 'fs';
import path from 'path';

export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const getTemplates = (): Template[] => {
  const templatesDir = path.join(process.cwd(), 'src', 'templates');
  
  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  const files = fs.readdirSync(templatesDir).filter(file => file.endsWith('.md'));

  return files.map(file => {
    const filePath = path.join(templatesDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf-8');

    let title = 'Untitled Template';
    let description = 'No description provided.';
    let content = rawContent;

    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = rawContent.match(frontmatterRegex);

    if (match) {
      const frontmatter = match[1];
      content = match[2].trim();

      const titleMatch = frontmatter.match(/title:\s*(.*)/);
      if (titleMatch) title = titleMatch[1].trim();

      const descMatch = frontmatter.match(/description:\s*(.*)/);
      if (descMatch) description = descMatch[1].trim();
    }

    return {
      id: file.replace('.md', ''),
      title,
      description,
      content,
    };
  });
};
