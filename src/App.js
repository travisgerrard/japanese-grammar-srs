import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';

// Import the lessons and the global question bank
import { GRAMMAR_LESSONS, QUESTION_BANK } from './lessons';

/* ==============
   Simple Button
=============== */
const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded';
  const variantClasses = {
    default: 'bg-blue-500 text-white',
    outline: 'border border-blue-500 text-blue-500',
    danger: 'bg-red-500 text-white'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div className={`border rounded p-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

/* ===========================
   LocalStorage-based SRS Logic
=========================== */
const SRS_STORAGE_KEY = 'japaneseSRSData';

function getSRSData() {
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveSRSData(data) {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
}

/** Initialize a question's record if missing. */
function initSRSRecord(questionId) {
  const data = getSRSData();
  if (!data[questionId]) {
    data[questionId] = {
      srsLevel: 0,
      nextReview: null,
      lastWrongAt: null
    };
    saveSRSData(data);
  }
}

/**
 * Very simple SRS update:
 * - If correct: srsLevel++, nextReview = now + srsLevel days
 * - If wrong: srsLevel=0, nextReview=tomorrow, lastWrongAt=now
 */
function updateSRS(questionId, wasCorrect) {
  if (!questionId) return;
  initSRSRecord(questionId);

  const data = getSRSData();
  const record = data[questionId];
  const now = new Date();

  if (wasCorrect) {
    record.srsLevel = (record.srsLevel || 0) + 1;
    record.lastWrongAt = null;

    // Next review = now + srsLevel days
    const next = new Date(now);
    next.setDate(now.getDate() + record.srsLevel);
    record.nextReview = next.toISOString();
  } else {
    record.srsLevel = 0;
    record.lastWrongAt = now.toISOString();

    // Next review = tomorrow
    const next = new Date(now);
    next.setDate(now.getDate() + 1);
    record.nextReview = next.toISOString();
  }

  data[questionId] = record;
  saveSRSData(data);
}

/** Return all "new" questions => srsLevel=0 (or no record). */
function getNewQuestions() {
  const data = getSRSData();
  return QUESTION_BANK.filter((q) => {
    const r = data[q.id];
    // If no record => new
    if (!r) return true;
    // If srsLevel=0 => still new
    return r.srsLevel === 0;
  });
}

/** Return all "due" questions => now >= nextReview. */
function getReviewQuestions() {
  const data = getSRSData();
  const now = new Date();
  return QUESTION_BANK.filter((q) => {
    const r = data[q.id];
    if (!r || !r.nextReview) return false;
    return now >= new Date(r.nextReview);
  });
}

/** Return questions answered wrong in last 24h. */
function getMistakesQuestions() {
  const data = getSRSData();
  const now = new Date();
  return QUESTION_BANK.filter((q) => {
    const r = data[q.id];
    if (!r || !r.lastWrongAt) return false;
    const diffHrs = (now - new Date(r.lastWrongAt)) / 3600000;
    return diffHrs <= 24; // within last 24 hours
  });
}

/* ===========================
   Fuzzy Matching
=========================== */
function levenshteinDistance(a, b) {
  const dp = [];
  for (let i = 0; i <= a.length; i++) {
    dp[i] = [i];
  }
  for (let j = 1; j <= b.length; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

function fuzzyMatch(userAnswer, correctAnswer) {
  const a = userAnswer.toLowerCase().trim();
  const b = correctAnswer.toLowerCase().trim();
  const distance = levenshteinDistance(a, b);
  const maxLen = Math.max(a.length, b.length);
  const similarity = (maxLen - distance) / maxLen;
  return similarity >= 0.8; // Accept if 80% similar or better
}

/* ===========================
   Lesson Quiz
=========================== */
const LessonQuiz = ({ lesson, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);

  // Reset quiz if lesson changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowExplanation(false);
    setAnsweredCorrectly(null);
  }, [lesson]);

  const currentQuestion = lesson?.quiz?.[currentQuestionIndex];
  if (!currentQuestion) {
    return <p className="mt-4">No questions available.</p>;
  }

  const handleTextChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const submitAnswer = () => {
    if (answeredCorrectly !== null) return; // Already submitted

    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect =
        selectedAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer.trim().toLowerCase();
    } else {
      // translation / conjugation => fuzzy
      isCorrect = fuzzyMatch(selectedAnswer, currentQuestion.correctAnswer);
    }

    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // If you want these lesson-based questions tracked in SRS as well:
    // (only if currentQuestion has an id)
    if (currentQuestion.id) {
      updateSRS(currentQuestion.id, isCorrect);
    }
  };

  const goToNextQuestion = () => {
    setAnsweredCorrectly(null);
    setShowExplanation(false);
    setSelectedAnswer('');
    if (currentQuestionIndex >= lesson.quiz.length - 1) {
      onComplete(score + (answeredCorrectly ? 1 : 0));
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const progressValue = ((currentQuestionIndex + 1) / lesson.quiz.length) * 100;

  return (
    <Card className="bg-gray-100 mt-4">
      <CardHeader className="text-xl font-bold">
        Quiz: {lesson.title}
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-700">
          Question {currentQuestionIndex + 1} of {lesson.quiz.length}
        </p>
        <Progress value={progressValue} className="mb-4" />

        <p className="font-medium mb-4">{currentQuestion.question}</p>

        {/* multiple choice */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                className={
                  selectedAnswer === option ? 'bg-blue-600 text-white' : ''
                }
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {/* input for translation/conjugation */}
        {(currentQuestion.type === 'translation' ||
          currentQuestion.type === 'conjugation') && (
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Type your answer here..."
            value={selectedAnswer}
            onChange={handleTextChange}
          />
        )}

        <div className="mt-4 flex gap-2">
          <Button onClick={submitAnswer} disabled={!selectedAnswer} className="flex-1">
            Submit
          </Button>
          {showExplanation && (
            <Button variant="outline" onClick={goToNextQuestion} className="flex-1">
              {currentQuestionIndex < lesson.quiz.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 border rounded bg-white">
            {answeredCorrectly ? (
              <p className="text-green-600 font-semibold">Correct!</p>
            ) : (
              <p className="text-red-600 font-semibold">Incorrect</p>
            )}
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ===========================
   Single Lesson Detail
=========================== */
const GrammarLessonDetail = ({ lesson }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizComplete = (score) => {
    setShowQuiz(false);
    setQuizCompleted(true);
    setFinalScore(score);
  };

  // If we switch to a new lesson, reset quiz states
  useEffect(() => {
    setShowQuiz(false);
    setQuizCompleted(false);
    setFinalScore(0);
  }, [lesson]);

  return (
    <div className="p-4 border-2 border-black rounded">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Explanation */}
        <div>
          <h3 className="font-bold">Grammar Points:</h3>
          <ul className="list-disc pl-5">
            {lesson.grammarPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 whitespace-pre-wrap">{lesson.explanation}</p>
        </div>

        {/* Examples */}
        <div>
          <h3 className="font-bold">Examples:</h3>
          {lesson.examples.map((example, i) => (
            <div key={i} className="mb-2 p-2 bg-gray-50 rounded">
              {example.japanese && <p>{example.japanese}</p>}
              {example.romanji && (
                <p className="text-sm text-gray-600">{example.romanji}</p>
              )}
              {example.english && <p className="text-sm">{example.english}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty & Time */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>Difficulty: {lesson.difficulty}/10</span>
          <span className="ml-4">
            Est. Study Time: {lesson.estimatedStudyTime} mins
          </span>
        </div>
        {!quizCompleted && (
          <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
        )}
      </div>

      {/* Quiz */}
      {showQuiz && (
        <LessonQuiz lesson={lesson} onComplete={handleQuizComplete} />
      )}

      {/* Final results */}
      {quizCompleted && (
        <div className="mt-4 p-4 border rounded bg-green-50 text-center">
          <h3 className="text-xl font-bold">Quiz Completed!</h3>
          <p className="mt-2">
            You scored {finalScore} / {lesson.quiz.length}
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setShowQuiz(false);
              setQuizCompleted(false);
              setFinalScore(0);
            }}
          >
            Retake Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

/* ===========================
   SRS Quiz
=========================== */
const SRSQuiz = ({ title, questions, onDone }) => {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions.length) {
    return (
      <div className="my-4 p-4 text-center border rounded bg-gray-50">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2">No questions available!</p>
      </div>
    );
  }

  const currentQuestion = questions[index];

  const submitAnswer = () => {
    if (answeredCorrectly !== null) return; // already answered

    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect =
        selectedAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer.trim().toLowerCase();
    } else {
      // translation / conjugation => fuzzy
      isCorrect = fuzzyMatch(selectedAnswer, currentQuestion.correctAnswer);
    }

    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    if (isCorrect) setScore((prev) => prev + 1);

    // Update SRS
    updateSRS(currentQuestion.id, isCorrect);
  };

  const goNext = () => {
    setAnsweredCorrectly(null);
    setShowExplanation(false);
    setSelectedAnswer('');

    if (index >= questions.length - 1) {
      // done
      onDone(score + (answeredCorrectly ? 1 : 0));
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const progressValue = ((index + 1) / questions.length) * 100;

  return (
    <Card className="bg-gray-100 mt-4">
      <CardHeader className="text-xl font-bold">{title}</CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-700">
          Question {index + 1} of {questions.length}
        </p>
        <Progress value={progressValue} className="mb-4" />

        <p className="font-medium mb-4">{currentQuestion.question}</p>

        {currentQuestion.type === 'multiple-choice' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                className={
                  selectedAnswer === option ? 'bg-blue-600 text-white' : ''
                }
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {(currentQuestion.type === 'translation' ||
          currentQuestion.type === 'conjugation') && (
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-2 py-1"
            placeholder="Type your answer here..."
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={answeredCorrectly !== null}
          />
        )}

        <div className="mt-4 flex gap-2">
          <Button onClick={submitAnswer} disabled={!selectedAnswer} className="flex-1">
            Submit
          </Button>
          {showExplanation && (
            <Button variant="outline" onClick={goNext} className="flex-1">
              {index < questions.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 border rounded bg-white">
            {answeredCorrectly ? (
              <p className="text-green-600 font-semibold">Correct!</p>
            ) : (
              <p className="text-red-600 font-semibold">Incorrect</p>
            )}
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">
              {currentQuestion.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ===========================
   Main App
=========================== */
function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // SRS mode: 'none' | 'new' | 'review' | 'mistakes'
  const [srsMode, setSrsMode] = useState('none');

  // The question set for current SRS session
  const [srsQuestions, setSrsQuestions] = useState([]);
  const [showSrsResults, setShowSrsResults] = useState(false);
  const [srsScore, setSrsScore] = useState(0);

  // If user picks an SRS mode, build the question array
  useEffect(() => {
    if (srsMode === 'none') {
      setSrsQuestions([]);
      setShowSrsResults(false);
      setSrsScore(0);
      return;
    }
    let qs = [];
    if (srsMode === 'new') {
      qs = getNewQuestions();
    } else if (srsMode === 'review') {
      qs = getReviewQuestions();
    } else if (srsMode === 'mistakes') {
      qs = getMistakesQuestions();
    }
    setSrsQuestions(qs);
    setShowSrsResults(false);
    setSrsScore(0);
  }, [srsMode]);

  const handleSrsDone = (finalScore) => {
    setSrsScore(finalScore);
    setShowSrsResults(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Top Nav (mobile only) */}
      <div className="md:hidden bg-blue-500 text-white flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold">日本語 Grammar Mastery</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="focus:outline-none text-white"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          bg-gray-100 p-4 md:w-1/4 border-r border-gray-300 md:block 
          ${isSidebarOpen ? 'block' : 'hidden'} 
          absolute md:relative top-0 left-0 w-full md:w-1/4 h-full md:h-auto
          z-10
        `}
      >
        {/* Close button in sidebar (mobile) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* LESSONS */}
        <h2 className="text-2xl font-bold mb-4 hidden md:block">Lessons</h2>
        {GRAMMAR_LESSONS.map((lesson) => (
          <Button
            key={lesson.id}
            variant="outline"
            className={`w-full mb-2 text-left ${
              selectedLesson?.id === lesson.id ? 'bg-blue-200 border-blue-600' : ''
            }`}
            onClick={() => {
              setSelectedLesson(lesson);
              setIsSidebarOpen(false);
              setSrsMode('none'); // exit SRS mode
            }}
          >
            {lesson.title} ({lesson.level})
          </Button>
        ))}

        <hr className="my-4" />

        {/* SRS SECTION */}
        <h2 className="text-xl font-bold mb-2">SRS Study</h2>
        <Button
          variant="outline"
          className={`w-full mb-2 text-left ${srsMode === 'new' ? 'bg-blue-200' : ''}`}
          onClick={() => {
            setSrsMode('new');
            setSelectedLesson(null);
            setIsSidebarOpen(false);
          }}
        >
          New Questions
        </Button>
        <Button
          variant="outline"
          className={`w-full mb-2 text-left ${srsMode === 'review' ? 'bg-blue-200' : ''}`}
          onClick={() => {
            setSrsMode('review');
            setSelectedLesson(null);
            setIsSidebarOpen(false);
          }}
        >
          Review
        </Button>
        <Button
          variant="outline"
          className={`w-full mb-2 text-left ${srsMode === 'mistakes' ? 'bg-blue-200' : ''}`}
          onClick={() => {
            setSrsMode('mistakes');
            setSelectedLesson(null);
            setIsSidebarOpen(false);
          }}
        >
          Mistakes (Last 24h)
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8">
        {/* Desktop Title */}
        <div className="hidden md:block text-center mb-6">
          <h1 className="text-4xl font-bold">日本語 Grammar Mastery</h1>
        </div>

        {selectedLesson && srsMode === 'none' && (
          <GrammarLessonDetail lesson={selectedLesson} />
        )}

        {!selectedLesson && srsMode !== 'none' && (
          <>
            {!showSrsResults ? (
              <SRSQuiz
                title={
                  srsMode === 'new'
                    ? 'New Questions'
                    : srsMode === 'review'
                    ? 'Review'
                    : 'Mistakes (Last 24h)'
                }
                questions={srsQuestions}
                onDone={handleSrsDone}
              />
            ) : (
              <div className="my-4 p-4 border rounded bg-green-50 text-center">
                <h2 className="text-xl font-bold">
                  {srsMode === 'new'
                    ? 'New Questions'
                    : srsMode === 'review'
                    ? 'Review'
                    : 'Mistakes'}
                  {' '}Completed!
                </h2>
                <p className="mt-2">
                  You scored {srsScore} / {srsQuestions.length}
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => {
                    setShowSrsResults(false);
                    setSrsScore(0);
                  }}
                >
                  Retake
                </Button>
              </div>
            )}
          </>
        )}

        {/* If no lesson selected and no SRS mode, show a message */}
        {!selectedLesson && srsMode === 'none' && (
          <div className="text-center text-gray-500 mt-20">
            Select a lesson or SRS mode to begin studying
          </div>
        )}
      </div>
    </div>
  );
}

export default App;