import { BookOpen, X } from 'lucide-react';

import type { Template } from '@/lib/getTemplates';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  onSelect: (template: Template) => void;
}

export const TemplateModal = ({ isOpen, onClose, templates, onSelect }: TemplateModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-lavender transform scale-95 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-lavender pb-3">
          <h3 className="text-lg font-bold text-black flex items-center gap-2">
            <BookOpen className="text-primary w-5 h-5" /> Select Document Template
          </h3>
          <button onClick={onClose} className="text-graphite hover:text-black" aria-label="Close Modal">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {templates.map(template => (
            <button
              key={template.id}
              className="w-full text-left p-3 border border-lavender hover:border-primary hover:bg-lavender/20 rounded-xl transition block"
              onClick={() => onSelect(template)}
              aria-label={`Load ${template.title} Template`}
            >
              <h4 className="font-bold text-primary">{template.title}</h4>
              <p className="text-xs text-graphite mt-1">{template.description}</p>
            </button>
          ))}
          {templates.length === 0 && (
             <p className="text-sm text-graphite text-center py-4">No templates found in src/templates/</p>
          )}
        </div>
      </div>
    </div>
  );
};
