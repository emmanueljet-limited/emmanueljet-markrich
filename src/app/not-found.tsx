import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white text-black">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-lavender shadow-xl text-center flex flex-col items-center gap-5">
        <div className="bg-lavender/50 text-primary p-4 rounded-full border border-primary/20">
          <FileQuestion className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-black">Page Not Found</h2>
          <p className="text-sm text-graphite mt-2">The document or page you are looking for doesn&apos;t exist or has been moved.</p>
        </div>
        <Link
          href="/"
          className="mt-2 w-full px-6 py-3 bg-linear-to-br from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-sm shadow-md shadow-primary/25 transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
