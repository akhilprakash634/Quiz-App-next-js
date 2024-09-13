import questions from '../data/questions.json';

export function loadQuestions() {
  return questions;
}

export function getCategories() {
  return Object.keys(questions);
}

export function getQuestionSet(category, setIndex = 0) {
  if (!questions[category] || !questions[category][setIndex]) {
    throw new Error('Category or question set not found');
  }
  return questions[category][setIndex];
}

export function getQuestionSetsCount(category) {
  if (!questions[category]) {
    throw new Error('Category not found');
  }
  return questions[category].length;
}