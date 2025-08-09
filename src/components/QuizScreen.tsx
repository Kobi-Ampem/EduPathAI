import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Screen, QuizQuestion, QuizAnswer } from '../types';
import { quizQuestions } from '../data/quizData';
import { generateRecommendation } from '../utils/recommendationEngine';

interface QuizScreenProps {
  onNavigate: (screen: Screen) => void;
  onQuizComplete: (answers: QuizAnswer[], recommendation: string) => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ onNavigate, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [subjectRatings, setSubjectRatings] = useState<Record<string, number>>({});

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleNext = () => {
    let newAnswer: QuizAnswer;

    if (currentQuestion.type === 'rating') {
      // Check if all subjects are rated
      const allRated = currentQuestion.options.every(subject => subjectRatings[subject] > 0);
      if (!allRated) return;

      newAnswer = {
        questionId: currentQuestion.id,
        answer: { ...subjectRatings },
      };
    } else {
      if (!selectedOption) return;
      newAnswer = {
        questionId: currentQuestion.id,
        answer: selectedOption,
      };
    }

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      const recommendation = generateRecommendation(updatedAnswers);
      onQuizComplete(updatedAnswers, recommendation);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setSubjectRatings({});
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedOption('');
      setSubjectRatings({});
    } else {
      onNavigate('welcome');
    }
  };

  const handleRatingChange = (subject: string, rating: number) => {
    setSubjectRatings(prev => ({
      ...prev,
      [subject]: rating
    }));
  };

  const isNextEnabled = () => {
    if (currentQuestion.type === 'rating') {
      return currentQuestion.options.every(subject => subjectRatings[subject] > 0);
    }
    return selectedOption !== '';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">
            {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>
        
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Character Illustration */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-4">
            <div className="text-6xl">👨‍🎓</div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Rating Questions */}
        {currentQuestion.type === 'rating' ? (
          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((subject, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-800">{subject}</span>
                  <span className="text-blue-600 font-bold text-lg">
                    {subjectRatings[subject] || 0}/10
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Not Interested</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(subject, rating)}
                        className={`w-8 h-8 rounded-full text-sm font-medium transition-all ${
                          subjectRatings[subject] === rating
                            ? 'bg-blue-600 text-white shadow-lg scale-110'
                            : subjectRatings[subject] > rating
                            ? 'bg-blue-200 text-blue-800'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Very Interested</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Regular Options */
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedOption === option
                    ? 'border-blue-600 bg-blue-50 text-blue-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 transition-all ${
                      selectedOption === option
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === option && (
                      <div className="w-full h-full bg-white rounded-full scale-50" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!isNextEnabled()}
          className={`w-full py-4 px-6 rounded-full font-semibold text-white transition-all duration-200 flex items-center justify-center ${
            isNextEnabled()
              ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isLastQuestion ? 'Get Recommendation' : 'Next'}
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;