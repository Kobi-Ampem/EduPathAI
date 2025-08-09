import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, BookOpen, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, signup, isLoading } = useAuth();
  const { settings } = useSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    const success = isLogin 
      ? await login(formData.email, formData.password)
      : await signup(formData.email, formData.password, formData.name);

    if (!success) {
      setError(isLogin ? 'Invalid email or password' : 'Failed to create account');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${
      settings.darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="relative mb-6">
          <div className="relative inline-block">
            <BookOpen className={`w-20 h-20 mb-2 ${
              settings.darkMode ? 'text-blue-400' : 'text-blue-600'
            }`} strokeWidth={1.5} />
            <Brain 
              className={`w-12 h-12 absolute -top-2 -right-2 p-1 rounded-full ${
                settings.darkMode 
                  ? 'text-teal-400 bg-gray-800' 
                  : 'text-teal-500 bg-white'
              }`}
              strokeWidth={2}
            />
          </div>
        </div>
        
        <h1 className={`text-4xl font-bold mb-2 ${
          settings.darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          EduPath<span className={settings.darkMode ? 'text-blue-400' : 'text-blue-600'}>AI</span>
        </h1>
        
        <p className={`text-lg leading-relaxed ${
          settings.darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover Your Path,<br />
          <span className={`font-medium ${
            settings.darkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>Define Your Future</span>
        </p>
      </div>

      {/* Auth Form */}
      <div className={`w-full max-w-sm rounded-2xl p-6 shadow-xl ${
        settings.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}>
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className={`text-sm mt-2 ${
            settings.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isLogin ? 'Sign in to continue your journey' : 'Join thousands of students'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  settings.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500'
                }`}
              />
            </div>
          )}

          <div className="relative">
            <Mail className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                settings.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <Lock className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
              settings.darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                settings.darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                settings.darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ email: '', password: '', name: '' });
            }}
            className={`text-sm font-medium transition-colors ${
              settings.darkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;