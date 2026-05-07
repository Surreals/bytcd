import Link from 'next/link';
import { Frown } from 'lucide-react';

export const metadata = {
  title: '404 - Page Not Found | BYTCD',
  description: "The page you're looking for doesn't exist. Return to BYTCD homepage.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <Frown size={80} className="text-gray-500 mb-8" />
      <h1 className="text-5xl md:text-7xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg md:text-xl mb-8 max-w-md">
        Oops! The page you&#39;re looking for doesn&#39;t exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
