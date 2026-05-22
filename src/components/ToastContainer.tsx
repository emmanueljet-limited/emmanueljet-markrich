import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

import type { Toast } from '@/hooks/useToast';

interface ToastContainerProps {
  toasts: Toast[];
}

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 pointer-events-auto ${
            toast.type === 'success' ? 'bg-lavender border-primary-300 text-primary' :
            toast.type === 'info' ? 'bg-white border-lavender text-primary' :
            'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4.5 h-4.5 text-primary" />}
          {toast.type === 'info' && <Info className="w-4.5 h-4.5 text-primary" />}
          {toast.type === 'error' && <AlertCircle className="w-4.5 h-4.5 text-rose-600" />}
          {toast.message}
        </div>
      ))}
    </div>
  );
};
