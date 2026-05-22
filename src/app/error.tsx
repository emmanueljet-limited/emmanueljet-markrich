'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white text-black">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-rose-200 shadow-xl text-center flex flex-col items-center gap-5">
        <div className="bg-rose-50 text-rose-600 p-4 rounded-full border border-rose-100">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-black">Something went wrong!</h2>
          <p className="text-sm text-graphite mt-2">We encountered an unexpected error processing your request.</p>
        </div>
        <button
          onClick={() => reset()}
          className="mt-2 w-full px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
