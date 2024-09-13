import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState({});
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, userRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/user')
      ]);
      const categoriesData = await categoriesRes.json();
      const userData = await userRes.json();
      setCategories(categoriesData);
      setUserScore(userData.totalScore);
    }
    if (session) {
      fetchData();
    }
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.name}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">Your Stats</h2>
            <p>Total Score: {userScore}</p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-4">Available Categories</h2>
            <ul>
              {Object.keys(categories).map((category, index) => (
                <li key={index} className="mb-2">
                  <button 
                    onClick={() => router.push(`/quiz/${category}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}