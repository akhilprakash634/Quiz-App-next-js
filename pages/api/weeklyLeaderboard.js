import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const leaderboard = await User.find({})
      .select('username weeklyScore')
      .sort({ weeklyScore: -1 })
      .limit(100);  // Limit to top 100 users

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching weekly leaderboard:', error);
    res.status(500).json({ message: 'Error fetching weekly leaderboard', error: error.message });
  }
}