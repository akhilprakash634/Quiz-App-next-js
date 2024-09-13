import { getQuestionSet, getQuestionSetsCount } from '../../../lib/loadQuestions';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { category, set } = req.query;
    try {
      const questions = getQuestionSet(category, parseInt(set) || 0);
      const totalSets = getQuestionSetsCount(category);
      res.status(200).json({ questions, totalSets });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}