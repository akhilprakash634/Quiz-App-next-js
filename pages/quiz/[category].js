import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import { useQuiz } from '../../hooks/useQuiz';

export default function Quiz() {
  const router = useRouter();
  const { category } = router.query;
  const { data: session, status } = useSession();
  const {
    questions,
    currentQuestionIndex,
    currentSetIndex,
    totalSets,
    selectedAnswer,
    score,
    showResult,
    timer,
    totalScore,
    setSelectedAnswer,
    handleAnswerSubmit,
    handleNextSet,
    handleRetry,
  } = useQuiz(category);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (!questions.length) return <p>Loading questions...</p>;

  if (showResult) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6">{category} Quiz - Set {currentSetIndex + 1} Result</h1>
          <div className="bg-white shadow-md rounded p-6">
            <p className="text-xl mb-4">Your score: {score} out of 5</p>
            <p className="text-xl mb-4">Total score: {totalScore}</p>
            {score < 4 ? (
              <>
                <p className="mb-4">You might want to review this set. Click the button below to retry and view helpful resources:</p>
                <button
                  onClick={handleRetry}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Retry Set and View Resources
                </button>
              </>
            ) : (
              <>
                <p className="mb-4">Great job! You're ready for the next set.</p>
                {currentSetIndex < totalSets - 1 ? (
                  <button
                    onClick={handleNextSet}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Next Set
                  </button>
                ) : (
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Finish Quiz
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">{category} Quiz - Set {currentSetIndex + 1}</h1>
        <div className="bg-white shadow-md rounded p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl">Question {currentQuestionIndex + 1} of 5</h2>
            <div className="text-xl font-bold">Time: {timer}s</div>
          </div>
          <h2 className="text-xl mb-4">{currentQuestion.question}</h2>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Set' : 'Next'}
          </button>
        </div>
      </div>
    </Layout>
  );
}