import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold">FuturePath</h1>
          </div>
          
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Welcome to Your Journey
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Set goals, track progress, and stay motivated with AI-powered assistance.
          </p>
          
          <Link 
            href="/goal"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 
                     text-white font-medium px-8 py-4 rounded-full
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                     transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
