// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import ThemeToggle from './components/ThemeToggle';

// Import the lessons and the global question bank
import { GRAMMAR_LESSONS, QUESTION_BANK } from './lessons';

/* ===========================
   2) UI BASICS
=========================== */
const Button = ({ children, variant = 'default', className = '', ...props }) => {
  const baseClasses =
    'px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800',
    outline:
      'border border-blue-500 text-blue-500 hover:bg-blue-50 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-gray-700',
    danger: 'bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800',
  };

  return (
    <button
      className={`${baseClasses} ${
        variantClasses[variant] || variantClasses.default
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }) => (
  <div
    className={`border border-gray-300 dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 text-gray-900 dark:text-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`text-gray-800 dark:text-gray-200 ${className}`} {...props}>
    {children}
  </div>
);

const Progress = ({ value = 0, className = '' }) => (
  <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 ${className}`}>
    <div
      className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full transition-all duration-300 ease-out"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

/* ===========================
   3) LOCALSTORAGE-BASED SRS LOGIC
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
      lastWrongAt: null,
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

/** Return all "new" questions => srsLevel=0 or no record. */
function getNewQuestions() {
  const data = getSRSData();
  return QUESTION_BANK.filter((q) => {
    const r = data[q.id];
    if (!r) return true;
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
   4) FUZZY MATCH FOR TYPED ANSWERS
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
   5) OPTIONAL LESSON REFRESHER
   Show snippet if user is wrong
=========================== */
function LessonRefresher({ lessonId }) {
  const lesson = GRAMMAR_LESSONS.find((l) => l.id === lessonId);
  if (!lesson) return null;

  return (
    <div className="mt-4 p-4 border rounded bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
      <h4 className="font-bold mb-2">Refresher: {lesson.title}</h4>
      <p className="text-sm whitespace-pre-wrap">{lesson.explanation}</p>
      <h5 className="font-bold mt-2">Key Grammar Points:</h5>
      <ul className="list-disc pl-5 text-sm">
        {lesson.grammarPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

/* ===========================
   6) LESSON-BASED QUIZ
=========================== */
const LessonQuiz = ({ lesson, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);

  // Reset if lesson changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowExplanation(false);
    setAnsweredCorrectly(null);
  }, [lesson]);

  const currentQuestion = lesson?.quiz?.[currentQuestionIndex];
  if (!currentQuestion) {
    return <p className="mt-4 text-gray-700 dark:text-gray-300">No questions available.</p>;
  }

  function submitAnswer() {
    if (answeredCorrectly !== null) return; // already answered

    let isCorrect = false;
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect =
        selectedAnswer.toLowerCase().trim() ===
        currentQuestion.correctAnswer.toLowerCase().trim();
    } else {
      // translation / conjugation => fuzzy
      isCorrect = fuzzyMatch(selectedAnswer, currentQuestion.correctAnswer);
    }

    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Optionally feed these into SRS
    if (currentQuestion.id) {
      updateSRS(currentQuestion.id, isCorrect);
    }
  }

  function goNext() {
    setAnsweredCorrectly(null);
    setShowExplanation(false);
    setSelectedAnswer('');
    if (currentQuestionIndex >= lesson.quiz.length - 1) {
      onComplete(score);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  const progressValue = ((currentQuestionIndex + 1) / lesson.quiz.length) * 100;

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 mt-4">
      <CardHeader className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Quiz: {lesson.title}
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          Question {currentQuestionIndex + 1} of {lesson.quiz.length}
        </p>
        <Progress value={progressValue} className="mb-4" />

        <p className="font-medium mb-4 text-gray-800 dark:text-gray-200">{currentQuestion.question}</p>

        {/* If multiple-choice */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {/* If text-based input */}
        {(currentQuestion.type === 'translation' || currentQuestion.type === 'conjugation') && (
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Type your answer..."
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
        )}

        <div className="mt-4 flex gap-2">
          <Button onClick={submitAnswer} disabled={!selectedAnswer} className="flex-1">
            Submit Answer
          </Button>
          {showExplanation && (
            <Button variant="outline" onClick={goNext} className="flex-1">
              {currentQuestionIndex < lesson.quiz.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 border rounded bg-white dark:bg-gray-700">
            {answeredCorrectly ? (
              <p className="text-green-600 font-semibold">Correct!</p>
            ) : (
              <p className="text-red-600 font-semibold">Incorrect</p>
            )}
            {currentQuestion.explanation && (
              <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ===========================
   7) LESSON DETAIL
=========================== */
function GrammarLessonDetail({ lesson }) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // If the user switches lessons
  useEffect(() => {
    setShowQuiz(false);
    setQuizCompleted(false);
    setFinalScore(0);
  }, [lesson]);

  function handleQuizComplete(score) {
    setShowQuiz(false);
    setQuizCompleted(true);
    setFinalScore(score);
  }

  return (
    <div className="p-4 border-2 border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">Grammar Points:</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            {lesson.grammarPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{lesson.explanation}</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-200">Examples:</h3>
          {lesson.examples.map((example, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-gray-900 dark:text-gray-100">{example.japanese}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{example.romanji}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{example.english}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>Difficulty: {lesson.difficulty}/10</span>
          <span className="ml-4">Est. Study Time: {lesson.estimatedStudyTime} mins</span>
        </div>
        <Button onClick={() => setShowQuiz(true)}>Start Quiz</Button>
      </div>
      {showQuiz && <LessonQuiz lesson={lesson} onComplete={handleQuizComplete} />}
      {quizCompleted && (
        <div className="mt-4 p-4 border rounded bg-green-50 dark:bg-green-700 text-center">
          <h3 className="text-xl font-bold text-green-600 dark:text-green-200">Quiz Completed!</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
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
}

/* ===========================
   8) SRS QUIZ
   (New, Review, or Mistakes)
=========================== */
function SRSQuiz({ title, questions, onDone }) {
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions.length) {
    return (
      <div className="my-4 p-4 text-center border rounded bg-gray-50 dark:bg-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">No questions available!</p>
      </div>
    );
  }

  const currentQuestion = questions[index];

  function submitAnswer() {
    if (answeredCorrectly !== null) return; // already answered

    let isCorrect;
    if (currentQuestion.type === 'multiple-choice') {
      isCorrect =
        selectedAnswer.trim().toLowerCase() ===
        currentQuestion.correctAnswer.trim().toLowerCase();
    } else {
      // translation/conjugation => fuzzy
      isCorrect = fuzzyMatch(selectedAnswer, currentQuestion.correctAnswer);
    }

    setAnsweredCorrectly(isCorrect);
    setShowExplanation(true);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Update SRS
    updateSRS(currentQuestion.id, isCorrect);
  }

  function nextQuestion() {
    setAnsweredCorrectly(null);
    setShowExplanation(false);
    setSelectedAnswer('');

    // end of quiz?
    if (index >= questions.length - 1) {
      onDone(score + (answeredCorrectly ? 1 : 0));
    } else {
      setIndex((prev) => prev + 1);
    }
  }

  const progressValue = ((index + 1) / questions.length) * 100;

  return (
    <Card className="bg-gray-100 dark:bg-gray-800 mt-4">
      <CardHeader className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</CardHeader>
      <CardContent>
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
          Question {index + 1} of {questions.length}
        </p>
        <Progress value={progressValue} className="mb-4" />

        <p className="font-medium mb-4 text-gray-800 dark:text-gray-200">{currentQuestion.question}</p>

        {/* If multiple choice */}
        {currentQuestion.type === 'multiple-choice' && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? 'default' : 'outline'}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {/* If text-based */}
        {(currentQuestion.type === 'translation' || currentQuestion.type === 'conjugation') && (
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Type your answer..."
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
            <Button variant="outline" onClick={nextQuestion} className="flex-1">
              {index < questions.length - 1 ? 'Next' : 'Finish'}
            </Button>
          )}
        </div>

        {showExplanation && (
          <div className="mt-4 p-3 border rounded bg-white dark:bg-gray-700">
            {answeredCorrectly ? (
              <p className="text-green-600 font-semibold">Correct!</p>
            ) : (
              <>
                <p className="text-red-600 font-semibold">Incorrect</p>
                {/* Show refresher for the original lesson if desired */}
                <LessonRefresher lessonId={currentQuestion.lessonId} />
              </>
            )}
            {currentQuestion.explanation && (
              <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap">
                {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/* ===========================
   9) MAIN APP
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

  useEffect(() => {
    if (srsMode === 'none') {
      // reset any SRS quiz state
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

  function handleSrsDone(finalScore) {
    setSrsScore(finalScore);
    setShowSrsResults(true);
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Top Nav (mobile only) */}
      <div className="md:hidden bg-blue-500 text-white flex justify-between items-center px-4 py-2">
        <h1 className="text-2xl font-bold">日本語 Grammar Mastery</h1>
        <ThemeToggle />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="focus:outline-none text-white ml-2"
          aria-label="Toggle Sidebar"
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
          bg-gray-100 dark:bg-gray-800 p-4 md:w-1/4 border-r border-gray-300 dark:border-gray-700 
          ${isSidebarOpen ? 'block' : 'hidden'} 
          absolute md:relative top-0 left-0 w-full md:w-1/4 h-full md:h-auto
          z-10
          hidden md:block
        `}
      >
        {/* Close button (mobile) */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* LESSON LIST */}
        <h2 className="text-2xl font-bold mb-4 hidden md:block text-gray-900 dark:text-gray-100">Lessons</h2>
        {GRAMMAR_LESSONS.map((lesson) => (
          <Button
            key={lesson.id}
            variant="outline"
            className={`w-full mb-2 text-left ${
              selectedLesson?.id === lesson.id ? 'bg-blue-200 dark:bg-blue-700 border-blue-600 dark:border-blue-800' : ''
            }`}
            onClick={() => {
              setSelectedLesson(lesson);
              setIsSidebarOpen(false);
              setSrsMode('none');
            }}
          >
            {lesson.title} ({lesson.level})
          </Button>
        ))}

        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {/* SRS SECTION */}
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">SRS Study</h2>
        <Button
          variant="outline"
          className={`w-full mb-2 text-left ${
            srsMode === 'new' ? 'bg-blue-200 dark:bg-blue-700' : ''
          }`}
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
          className={`w-full mb-2 text-left ${
            srsMode === 'review' ? 'bg-blue-200 dark:bg-blue-700' : ''
          }`}
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
          className={`w-full mb-2 text-left ${
            srsMode === 'mistakes' ? 'bg-blue-200 dark:bg-blue-700' : ''
          }`}
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">日本語 Grammar Mastery</h1>
          <ThemeToggle className="mt-2 mx-auto" />
        </div>

        {/* Lesson-based approach */}
        {selectedLesson && srsMode === 'none' && <GrammarLessonDetail lesson={selectedLesson} />}

        {/* SRS mode approach */}
        {!selectedLesson && srsMode !== 'none' && (
          <>
            {!showSrsResults ? (
              <SRSQuiz title={getSrsTitle(srsMode)} questions={srsQuestions} onDone={handleSrsDone} />
            ) : (
              <div className="my-4 p-4 border rounded bg-green-50 dark:bg-green-700 text-center">
                <h2 className="text-xl font-bold text-green-600 dark:text-green-200">
                  {getSrsTitle(srsMode)} Completed!
                </h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
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

        {/* If no lesson & srsMode=none => prompt user */}
        {!selectedLesson && srsMode === 'none' && (
          <div className="text-center text-gray-500 dark:text-gray-300 mt-20">
            Select a lesson or SRS mode to begin studying
          </div>
        )}
      </div>
    </div>
  );
}

/* ===========================
   HELPER FUNCTION
=========================== */
function getSrsTitle(mode) {
  switch (mode) {
    case 'new':
      return 'New Questions';
    case 'review':
      return 'Review';
    case 'mistakes':
      return 'Mistakes (Last 24h)';
    default:
      return '';
  }
}

export default App;