import { getToken } from "next-auth/jwt";
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = await getToken({ req });
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { score } = req.body;

  await dbConnect();

  try {
    const user = await User.findById(token.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.totalScore += score;
    user.weeklyScore += score;
    user.lastScoreUpdate = new Date();
    await user.save();

    res.status(200).json({ message: 'Score updated successfully', totalScore: user.totalScore, weeklyScore: user.weeklyScore });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Error updating score', error: error.message });
  }
}