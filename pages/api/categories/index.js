import { loadQuestions } from '../../../lib/loadQuestions';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const questions = loadQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}