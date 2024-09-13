import { loadQuestions } from '../../../lib/loadQuestions';

export default function handler(req, res) {
  const questions = loadQuestions();
  res.status(200).json(questions);
}