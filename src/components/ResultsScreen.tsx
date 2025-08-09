import React from 'react';
import { ArrowLeft, BookOpen, RotateCcw } from 'lucide-react';
import { Screen } from '../types';

interface ResultsScreenProps {
  recommendation: string;
  onNavigate: (screen: Screen) => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ recommendation, onNavigate }) => {
  const getRecommendationDetails = (program: string) => {
    const details: Record<string, { description: string; careers: string[] }> = {
      'General Science': {
        description: 'Perfect for students interested in scientific inquiry and research. This program provides a strong foundation in physics, chemistry, biology, and mathematics.',
        careers: ['Doctor', 'Engineer', 'Researcher', 'Pharmacist', 'Laboratory Technician']
      },
      'General Arts': {
        description: 'Ideal for creative and analytical minds interested in humanities, languages, and social sciences.',
        careers: ['Lawyer', 'Journalist', 'Teacher', 'Social Worker', 'Writer']
      },
      'Business': {
        description: 'Great for entrepreneurial spirits and those interested in commerce, economics, and business management.',
        careers: ['Business Owner', 'Accountant', 'Marketing Manager', 'Banker', 'Financial Analyst']
      },
      'Visual Arts': {
        description: 'Perfect for creative minds interested in visual expression, design, and artistic creation.',
        careers: ['Graphic Designer', 'Artist', 'Animator', 'Art Director', 'Fashion Designer']
      },
      'Agriculture': {
        description: 'Ideal for students interested in farming, environmental science, and sustainable food production.',
        careers: ['Agricultural Officer', 'Veterinarian', 'Environmental Scientist', 'Farm Manager', 'Food Technologist']
      },
      'Home Economics': {
        description: 'Great for students interested in nutrition, family studies, and practical life skills.',
        careers: ['Nutritionist', 'Fashion Designer', 'Hotel Manager', 'Food Scientist', 'Family Counselor']
      }
    };

    return details[program] || details['General Science'];
  };

  const details = getRecommendationDetails(recommendation);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center">
        <button
          onClick={() => onNavigate('welcome')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-800">
          Your Recommendation
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {/* Character with graduation cap */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-teal-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <div className="text-6xl">🎓</div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            We recommend
          </h2>
          <h3 className="text-3xl font-bold text-blue-600 mb-4">
            {recommendation}
          </h3>
          <p className="text-gray-600 mb-2">based on your responses</p>
        </div>

        {/* Explanation Card */}
        <div className="w-full max-w-md bg-blue-50 rounded-xl p-6 mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Explanation
          </h4>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {details.description}
          </p>
          
          <div>
            <h5 className="font-semibold text-gray-800 mb-2">Potential Career Paths:</h5>
            <div className="flex flex-wrap gap-2">
              {details.careers.map((career, index) => (
                <span
                  key={index}
                  className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={() => onNavigate('tips')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-200"
          >
            Learn More
          </button>
          
          <button
            onClick={() => onNavigate('quiz')}
            className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-6 rounded-full border-2 border-blue-600 shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;