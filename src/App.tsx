import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import AuthScreen from './components/AuthScreen';
import SettingsScreen from './components/SettingsScreen';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ChatScreen from './components/ChatScreen';
import TipsScreen from './components/TipsScreen';
import { Screen } from './types';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [quizData, setQuizData] = useState({});
  const [recommendation, setRecommendation] = useState('');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNavigate={navigateToScreen} />;
      case 'quiz':
        return (
          <QuizScreen
            onNavigate={navigateToScreen}
            onQuizComplete={(data, result) => {
              setQuizData(data);
              setRecommendation(result);
              navigateToScreen('results');
            }}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            recommendation={recommendation}
            onNavigate={navigateToScreen}
          />
        );
      case 'chat':
        return <ChatScreen onNavigate={navigateToScreen} />;
      case 'tips':
        return <TipsScreen onNavigate={navigateToScreen} />;
      case 'settings':
        return <SettingsScreen onNavigate={navigateToScreen} />;
      default:
        return <WelcomeScreen onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderScreen()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;