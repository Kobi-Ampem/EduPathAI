export type Screen = 'welcome' | 'quiz' | 'results' | 'chat' | 'tips' | 'settings';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  language: 'en' | 'tw';
  fontSize: 'small' | 'medium' | 'large';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type: 'single' | 'multiple' | 'rating';
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[] | Record<string, number>;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'career' | 'mental-health';
  tags: string[];
}