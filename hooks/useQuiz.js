import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { urlList } from '../data/urls';

export function useQuiz(category) {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (category) {
      fetchQuestions();
    }
  }, [category, currentSetIndex]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showResult) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimerEnd();
    }
    return () => clearInterval(interval);
  }, [timer, showResult]);

  async function fetchQuestions() {
    const res = await fetch('/api/questions');
    const data = await res.json();
    if (data[category] && data[category][currentSetIndex]) {
      setQuestions(data[category][currentSetIndex]);
      setTotalSets(data[category].length);
    }
  }

  const updateScoreInDatabase = async (scoreToAdd) => {
    console.log('Attempting to update score:', scoreToAdd);
    try {
      const response = await fetch('/api/updateScore', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify({ score: scoreToAdd }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Score updated in database:', data.totalScore);
      } else {
        console.error('Failed to update score:', data.message);
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setTimer(10);
    } else {
      setShowResult(true);
      setTotalScore(prevTotalScore => {
        const newTotalScore = prevTotalScore + score;
        updateScoreInDatabase(score);
        return newTotalScore;
      });
    }
  }, [currentQuestionIndex, questions.length, score, session]);

  function handleAnswerSubmit() {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(prevScore => prevScore + 1);
    }
    handleNextQuestion();
  }

  function handleTimerEnd() {
    handleNextQuestion();
  }

  function handleNextSet() {
    if (currentSetIndex < totalSets - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      resetQuizState();
    }
    return currentSetIndex === totalSets - 1;
  }

  function handleRetry() {
    const randomUrl = urlList[Math.floor(Math.random() * urlList.length)];
    window.open(randomUrl, '_blank');
    resetQuizState();
  }

  function resetQuizState() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer('');
    setShowResult(false);
    setTimer(10);
  }

  return {
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
    handleTimerEnd,
  };
}