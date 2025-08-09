import React from 'react';
import { ArrowLeft, Moon, Sun, Bell, Globe, Type, LogOut, User, Shield } from 'lucide-react';
import { Screen } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

interface SettingsScreenProps {
  onNavigate: (screen: Screen) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { settings, updateSettings, toggleDarkMode } = useSettings();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      settings.darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`shadow-sm p-4 flex items-center ${
        settings.darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-white'
      }`}>
        <button
          onClick={() => onNavigate('welcome')}
          className={`p-2 rounded-full transition-colors ${
            settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <ArrowLeft className={`w-6 h-6 ${
            settings.darkMode ? 'text-gray-300' : 'text-gray-600'
          }`} />
        </button>
        <h1 className={`flex-1 text-center text-lg font-semibold ${
          settings.darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Settings
        </h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Profile Section */}
        <div className={`rounded-xl p-6 ${
          settings.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              settings.darkMode ? 'bg-blue-600' : 'bg-blue-100'
            }`}>
              <User className={`w-8 h-8 ${
                settings.darkMode ? 'text-white' : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${
                settings.darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {user?.name}
              </h3>
              <p className={`text-sm ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className={`rounded-xl p-6 ${
          settings.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            settings.darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Appearance
          </h3>
          
          <div className="space-y-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.darkMode ? (
                  <Moon className="w-5 h-5 text-blue-500" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
                <div>
                  <p className={`font-medium ${
                    settings.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Dark Mode
                  </p>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Switch between light and dark themes
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Font Size */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Type className={`w-5 h-5 ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`font-medium ${
                    settings.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Font Size
                  </p>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Adjust text size for better readability
                  </p>
                </div>
              </div>
              <select
                value={settings.fontSize}
                onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  settings.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={`rounded-xl p-6 ${
          settings.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            settings.darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Preferences
          </h3>
          
          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className={`w-5 h-5 ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`font-medium ${
                    settings.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Notifications
                  </p>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Receive updates and reminders
                  </p>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ notifications: !settings.notifications })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className={`w-5 h-5 ${
                  settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <div>
                  <p className={`font-medium ${
                    settings.darkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Language
                  </p>
                  <p className={`text-sm ${
                    settings.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <select
                value={settings.language}
                onChange={(e) => updateSettings({ language: e.target.value as any })}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  settings.darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              >
                <option value="en">English</option>
                <option value="tw">Twi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className={`rounded-xl p-6 ${
          settings.darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            settings.darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Account
          </h3>
          
          <div className="space-y-3">
            <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              settings.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <Shield className={`w-5 h-5 ${
                settings.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className={`font-medium ${
                settings.darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Privacy & Security
              </span>
            </button>
            
            <button
              onClick={handleLogout}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                settings.darkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-50 text-red-600'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;