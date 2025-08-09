import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'subject_ratings',
    question: 'Rate each subject based on your interest and performance (1-10)',
    options: [
      'Core Mathematics',
      'English Language', 
      'French Language',
      'Ghanaian Language',
      'Creative Technology',
      'Creative Arts',
      'Social Studies',
      'Computing',
      'Religious and Moral Education',
      'Integrated Science'
    ],
    type: 'rating'
  },
  {
    id: 'career_interest',
    question: 'What type of career interests you most?',
    options: ['Healthcare & Medicine', 'Engineering & Technology', 'Business & Finance', 'Arts & Humanities', 'Agriculture & Environment', 'Creative Industries'],
    type: 'single'
  },
  {
    id: 'learning_style',
    question: 'How do you prefer to learn?',
    options: ['Hands-on activities', 'Reading and research', 'Group discussions', 'Visual demonstrations', 'Problem-solving'],
    type: 'single'
  },
  {
    id: 'future_goals',
    question: 'What is your primary goal after SHS?',
    options: ['University education', 'Professional training', 'Start working immediately', 'Entrepreneurship', 'Further skill development'],
    type: 'single'
  }
];