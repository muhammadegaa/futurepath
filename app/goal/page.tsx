import GoalInput from '@/app/components/GoalInput';

export default function GoalPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8">
            <h1 className="text-2xl font-bold text-white text-center">
              Set Your Goal
            </h1>
            <p className="text-blue-100 text-center mt-2 text-sm">
              What would you like to achieve?
            </p>
          </div>
          <div className="p-8">
            <GoalInput />
          </div>
        </div>
      </div>
    </div>
  );
} 