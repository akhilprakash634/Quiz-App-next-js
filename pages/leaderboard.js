import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Leaderboard() {
  const { data: session, status } = useSession();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await fetch('/api/leaderboard');
      const data = await res.json();
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Global Leaderboard</h1>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => (
              <tr key={user._id} className={user.username === session?.user?.name ? 'bg-yellow-100' : ''}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.totalScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}