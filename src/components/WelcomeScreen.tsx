import React from 'react';
import { Brain, BookOpen, Settings } from 'lucide-react';
import { Screen } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

interface WelcomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { settings } = useSettings();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
      settings.darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Settings Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => onNavigate('settings')}
          className={`p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
            settings.darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
              : 'bg-white hover:bg-gray-50 text-gray-600'
          }`}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <div className="text-center mb-12">
        {/* Logo */}
        <div className="relative mb-6">
          <div className="relative inline-block">
            <BookOpen className={`w-20 h-20 mb-2 ${
              settings.darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} strokeWidth={1.5} />
            <Brain 
              className={`w-12 h-12 absolute -top-2 -right-2 rounded-full p-1 ${
                settings.darkMode 
                  ? 'text-teal-400 bg-gray-800' 
                  : 'text-teal-500 bg-white'
              }`}
              strokeWidth={2}
            />
          </div>
        </div>
        
        {/* App Name */}
        <h1 className={`text-4xl font-bold mb-4 ${
          settings.darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          EduPath<span className={settings.darkMode ? 'text-blue-400' : 'text-blue-600'}>AI</span>
        </h1>
        
        {/* Welcome Message */}
        <p className={`text-lg mb-2 ${
          settings.darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Welcome back, {user?.name}!
        </p>
        
        {/* Slogan */}
        <p className={`text-lg mb-12 px-4 leading-relaxed ${
          settings.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover Your Path,<br />
          <span className={`font-medium ${
            settings.darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>Define Your Future</span>
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-sm">
          <button
            onClick={() => onNavigate('quiz')}
            className={`w-full font-semibold py-4 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
              settings.darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Start Quiz
          </button>
          
          <button
            onClick={() => onNavigate('chat')}
            className={`w-full font-semibold py-4 px-6 rounded-full border-2 shadow-lg transition-all duration-200 transform hover:scale-105 ${
              settings.darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-blue-400 border-blue-400' 
                : 'bg-white hover:bg-gray-50 text-blue-600 border-blue-600'
            }`}
          >
            Chat with EduBot
          </button>
          
          <button
            onClick={() => onNavigate('tips')}
            className={`w-full font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 ${
              settings.darkMode 
                ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                : 'bg-teal-500 hover:bg-teal-600 text-white'
            }`}
          >
            Academic & Career Tips
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;