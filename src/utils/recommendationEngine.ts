import { QuizAnswer } from '../types';

export const generateRecommendation = (answers: QuizAnswer[]): string => {
  const answerMap = answers.reduce((acc, answer) => {
    acc[answer.questionId] = answer.answer;
    return acc;
  }, {} as Record<string, string | string[] | Record<string, number>>);

  const subjectRatings = answerMap.subject_ratings as Record<string, number>;
  const careerInterest = answerMap.career_interest as string;
  const learningStyle = answerMap.learning_style as string;
  const futureGoals = answerMap.future_goals as string;

  // Calculate subject category scores
  const scienceScore = (
    (subjectRatings['Core Mathematics'] || 0) +
    (subjectRatings['Integrated Science'] || 0) +
    (subjectRatings['Computing'] || 0)
  ) / 3;

  const artsScore = (
    (subjectRatings['English Language'] || 0) +
    (subjectRatings['French Language'] || 0) +
    (subjectRatings['Ghanaian Language'] || 0) +
    (subjectRatings['Social Studies'] || 0) +
    (subjectRatings['Religious and Moral Education'] || 0)
  ) / 5;

  const creativeScore = (
    (subjectRatings['Creative Arts'] || 0) +
    (subjectRatings['Creative Technology'] || 0)
  ) / 2;

  const businessScore = (
    (subjectRatings['Core Mathematics'] || 0) +
    (subjectRatings['Social Studies'] || 0) +
    (subjectRatings['English Language'] || 0)
  ) / 3;

  // Career interest weights
  let careerWeight = {
    science: 0,
    arts: 0,
    business: 0,
    creative: 0,
    agriculture: 0,
    homeEconomics: 0
  };

  switch (careerInterest) {
    case 'Healthcare & Medicine':
    case 'Engineering & Technology':
      careerWeight.science = 3;
      break;
    case 'Business & Finance':
      careerWeight.business = 3;
      break;
    case 'Arts & Humanities':
      careerWeight.arts = 3;
      break;
    case 'Agriculture & Environment':
      careerWeight.agriculture = 3;
      break;
    case 'Creative Industries':
      careerWeight.creative = 3;
      break;
  }

  // Learning style weights
  if (learningStyle === 'Hands-on activities') {
    careerWeight.agriculture += 1;
    careerWeight.homeEconomics += 1;
  }
  if (learningStyle === 'Visual demonstrations') {
    careerWeight.creative += 1;
  }
  if (learningStyle === 'Problem-solving') {
    careerWeight.science += 1;
  }

  // Future goals weights
  if (futureGoals === 'University education') {
    careerWeight.science += 1;
    careerWeight.arts += 1;
  }
  if (futureGoals === 'Entrepreneurship') {
    careerWeight.business += 2;
  }
  if (futureGoals === 'Professional training') {
    careerWeight.homeEconomics += 1;
  }

  // Calculate final scores
  const finalScores = {
    'General Science': scienceScore + careerWeight.science,
    'General Arts': artsScore + careerWeight.arts,
    'Business': businessScore + careerWeight.business,
    'Visual Arts': creativeScore + careerWeight.creative,
    'Agriculture': ((subjectRatings['Integrated Science'] || 0) + scienceScore) / 2 + careerWeight.agriculture,
    'Home Economics': ((subjectRatings['Creative Arts'] || 0) + (subjectRatings['Social Studies'] || 0)) / 2 + careerWeight.homeEconomics
  };

  // Find the program with the highest score
  const recommendedProgram = Object.entries(finalScores).reduce(
  (a, b) => (a[1] > b[1] ? a : b)
)[0];


  return recommendedProgram;
};