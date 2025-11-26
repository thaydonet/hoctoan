import React, { useState, useEffect } from 'react';
import { Brain, Check, X, RotateCcw, Trophy, CheckCircle, XCircle, CreditCard as Edit3 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { QuizQuestion, TrueFalseQuestion, ShortAnswerQuestion } from '../types/MathTopic';

interface QuizSectionProps {
  questions: QuizQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
  onMathJaxRender: () => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ 
  questions, 
  trueFalseQuestions, 
  shortAnswerQuestions,
  onMathJaxRender
}) => {
  // Combine all questions into one array
  const allQuestions = [
    ...questions.map(q => ({ ...q, type: 'multiple' as const })),
    ...trueFalseQuestions.map(q => ({ ...q, type: 'trueFalse' as const })),
    ...shortAnswerQuestions.map(q => ({ ...q, type: 'shortAnswer' as const }))
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<any[]>(new Array(allQuestions.length).fill(undefined));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { user } = useAuth();
  const [isSavingResult, setIsSavingResult] = useState(false);

  useEffect(() => {
    onMathJaxRender();
  }, [showResults, onMathJaxRender]);

  const handleAnswerSelect = (answer: any, questionIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answer;
    setSelectedAnswers(newAnswers);
    
    setTimeout(onMathJaxRender, 50);
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    setShowResults(true);
    
    // Auto-save result if user is logged in
    if (user && !isSavingResult) {
      const score = calculateScore();
      saveQuizResult(score, allQuestions.length);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers(new Array(allQuestions.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    allQuestions.forEach((question, index) => {
      const userAnswer = selectedAnswers[index];
      
      if (question.type === 'multiple') {
        if (userAnswer === (question as QuizQuestion).correctAnswer) correct++;
      } else if (question.type === 'trueFalse') {
        const tfQuestion = question as TrueFalseQuestion;
        if (userAnswer && userAnswer.every((answer: boolean, i: number) => 
          answer === tfQuestion.statements[i].isTrue)) correct++;
      } else if (question.type === 'shortAnswer') {
        const saQuestion = question as ShortAnswerQuestion;
        if (userAnswer && userAnswer.toLowerCase().trim() === saQuestion.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      }
    });
    return correct;
  };

  const saveQuizResult = async (score: number, totalQuestions: number) => {
    if (!user) return;
    console.log('Quiz completed:', { score, totalQuestions });
  };

  if (allQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có câu hỏi cho bài học này.</p>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / allQuestions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto">
        {/* Results Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hoàn thành!</h2>
          <div className="text-6xl font-bold text-orange-500 mb-4">{percentage}%</div>
          <p className="text-xl text-gray-700 mb-6">
            Bạn đã trả lời đúng {score}/{allQuestions.length} câu
          </p>
          
          
          <button
            onClick={resetQuiz}
            className="flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Làm lại</span>
          </button>
        </div>

        {/* Detailed Review */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Xem lại đáp án</h3>
          {allQuestions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            let isCorrect = false;
            
            if (question.type === 'multiple') {
              isCorrect = userAnswer === (question as QuizQuestion).correctAnswer;
            } else if (question.type === 'trueFalse') {
              const tfQuestion = question as TrueFalseQuestion;
              isCorrect = userAnswer && userAnswer.every((answer: boolean, i: number) => 
                answer === tfQuestion.statements[i].isTrue);
            } else if (question.type === 'shortAnswer') {
              const saQuestion = question as ShortAnswerQuestion;
              isCorrect = userAnswer && userAnswer.toLowerCase().trim() === saQuestion.correctAnswer.toLowerCase().trim();
            }
            
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{question.question}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        question.type === 'multiple' ? 'bg-blue-100 text-blue-800' :
                        question.type === 'trueFalse' ? 'bg-purple-100 text-purple-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {question.type === 'multiple' ? 'Trắc nghiệm' :
                         question.type === 'trueFalse' ? 'Đúng/Sai' : 'Trả lời ngắn'}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-medium">{isCorrect ? 'Đúng' : 'Sai'}</span>
                  </div>
                </div>
                
                {question.type === 'multiple' && (
                  <MultipleChoiceQuestion 
                    question={question as QuizQuestion}
                    selectedAnswer={userAnswer}
                    showResults={true}
                    onAnswerSelect={() => {}}
                    onMathJaxRender={onMathJaxRender}
                    questionNumber={index + 1}
                    isReview={true}
                  />
                )}

                {question.type === 'trueFalse' && (
                  <TrueFalseQuestionComponent
                    question={question as TrueFalseQuestion}
                    selectedAnswers={userAnswer}
                    showResults={true}
                    onAnswerSelect={() => {}}
                    onMathJaxRender={onMathJaxRender}
                    isReview={true}
                  />
                )}

                {question.type === 'shortAnswer' && (
                  <ShortAnswerQuestionComponent
                    question={question as ShortAnswerQuestion}
                    selectedAnswer={userAnswer}
                    showResults={true}
                    onAnswerSelect={() => {}}
                    onMathJaxRender={onMathJaxRender}
                    isReview={true}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Bài tập tổng hợp</h2>
        </div>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {allQuestions.length} câu hỏi
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {allQuestions.map((question, questionIndex) => (
          <div key={questionIndex} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {questionIndex + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{question.question}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    question.type === 'multiple' ? 'bg-blue-100 text-blue-800' :
                    question.type === 'trueFalse' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {question.type === 'multiple' ? 'Trắc nghiệm' :
                     question.type === 'trueFalse' ? 'Đúng/Sai' : 'Trả lời ngắn'}
                  </span>
                </div>

                {question.type === 'multiple' && (
                  <MultipleChoiceQuestion 
                    question={question as QuizQuestion}
                    selectedAnswer={selectedAnswers[questionIndex]}
                    showResults={false}
                    onAnswerSelect={(answer) => handleAnswerSelect(answer, questionIndex)}
                    onMathJaxRender={onMathJaxRender}
                    questionNumber={questionIndex + 1}
                    isInAllMode={true}
                  />
                )}

                {question.type === 'trueFalse' && (
                  <TrueFalseQuestionComponent
                    question={question as TrueFalseQuestion}
                    selectedAnswers={selectedAnswers[questionIndex]}
                    showResults={false}
                    onAnswerSelect={(answer) => handleAnswerSelect(answer, questionIndex)}
                    onMathJaxRender={onMathJaxRender}
                    isInAllMode={true}
                  />
                )}

                {question.type === 'shortAnswer' && (
                  <ShortAnswerQuestionComponent
                    question={question as ShortAnswerQuestion}
                    selectedAnswer={selectedAnswers[questionIndex]}
                    showResults={false}
                    onAnswerSelect={(answer) => handleAnswerSelect(answer, questionIndex)}
                    onMathJaxRender={onMathJaxRender}
                    isInAllMode={true}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        
        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <button
            onClick={finishQuiz}
            disabled={selectedAnswers.filter(a => a !== undefined).length === 0}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-600 transition-all duration-200"
          >
            Hoàn thành ({selectedAnswers.filter(a => a !== undefined).length}/{allQuestions.length})
          </button>
        </div>
      </div>
    </div>
  );
};

// Multiple Choice Component
const MultipleChoiceQuestion: React.FC<{
  question: QuizQuestion;
  selectedAnswer: number;
  showResults: boolean;
  onAnswerSelect: (answer: number) => void;
  onMathJaxRender: () => void;
  questionNumber: number;
  isInAllMode?: boolean;
  isReview?: boolean;
}> = ({ question, selectedAnswer, showResults, onAnswerSelect, onMathJaxRender, questionNumber, isInAllMode = false, isReview = false }) => {
  
  if (!question || !Array.isArray(question.options)) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 font-medium">Lỗi: Dữ liệu câu hỏi không hợp lệ.</p>
        </div>
      </div>
    );
  }
  
  const handleAnswerClick = (index: number) => {
    onAnswerSelect(index);
    setTimeout(onMathJaxRender, 50);
  };

  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <>
      {!isInAllMode && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Chọn đáp án đúng:</p>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center space-x-4 ";
          let labelClass = "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ";
          
          if (showResults || isReview) {
            if (index === question.correctAnswer) {
              buttonClass += "bg-green-50 border-green-500 text-green-800";
              labelClass += "bg-green-500 text-white";
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              buttonClass += "bg-red-50 border-red-500 text-red-800";
              labelClass += "bg-red-500 text-white";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-600";
              labelClass += "bg-gray-300 text-gray-600";
            }
          } else {
            if (index === selectedAnswer) {
              buttonClass += "bg-blue-50 border-blue-500 text-blue-800 shadow-md";
              labelClass += "bg-blue-500 text-white";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300";
              labelClass += "bg-gray-200 text-gray-600";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={buttonClass}
              disabled={showResults || isReview}
            >
              <div className={labelClass}>
                {optionLabels[index]}
              </div>
              <span className="flex-1">{option}</span>
              {(showResults || isReview) && (
                <div className="flex-shrink-0">
                  {index === question.correctAnswer && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                  {index === selectedAnswer && index !== question.correctAnswer && (
                    <X className="w-6 h-6 text-red-600" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {(showResults || isReview) && question.explanation && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <h4 className="font-semibold text-blue-800">Giải thích:</h4>
          </div>
          <p className="text-blue-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </>
  );
};

// True/False Component
const TrueFalseQuestionComponent: React.FC<{
  question: TrueFalseQuestion;
  selectedAnswers: boolean[];
  showResults: boolean;
  onAnswerSelect: (answers: boolean[]) => void;
  onMathJaxRender: () => void;
  isInAllMode?: boolean;
  isReview?: boolean;
}> = ({ question, selectedAnswers = [], showResults, onAnswerSelect, onMathJaxRender, isInAllMode = false, isReview = false }) => {
  
  if (!question || !Array.isArray(question.statements)) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 font-medium">Lỗi: Dữ liệu câu hỏi không hợp lệ.</p>
        </div>
      </div>
    );
  }
  
  const handleStatementAnswer = (index: number, answer: boolean) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = answer;
    onAnswerSelect(newAnswers);
    setTimeout(onMathJaxRender, 50);
  };

  return (
    <>
      {!isInAllMode && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Đánh giá tính đúng/sai của các khẳng định sau:</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {question.statements.map((statement, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-gray-800 mb-3 font-medium">{statement.text}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleStatementAnswer(index, true)}
                disabled={showResults || isReview}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedAnswers[index] === true
                    ? (showResults || isReview)
                      ? statement.isTrue
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {(showResults || isReview) && selectedAnswers[index] === true && (
                  statement.isTrue ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                )}
                <span>Đúng</span>
              </button>
              <button
                onClick={() => handleStatementAnswer(index, false)}
                disabled={showResults || isReview}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedAnswers[index] === false
                    ? (showResults || isReview)
                      ? !statement.isTrue
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {(showResults || isReview) && selectedAnswers[index] === false && (
                  !statement.isTrue ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />
                )}
                <span>Sai</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {(showResults || isReview) && question.explanation && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <h4 className="font-semibold text-purple-800">Giải thích:</h4>
          </div>
          <p className="text-purple-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </>
  );
};

// Short Answer Component
const ShortAnswerQuestionComponent: React.FC<{
  question: ShortAnswerQuestion;
  selectedAnswer: string;
  showResults: boolean;
  onAnswerSelect: (answer: string) => void;
  onMathJaxRender: () => void;
  isInAllMode?: boolean;
  isReview?: boolean;
}> = ({ question, selectedAnswer = '', showResults, onAnswerSelect, onMathJaxRender, isInAllMode = false, isReview = false }) => {
  
  if (!question || !question.question || !question.correctAnswer) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-700 font-medium">Lỗi: Dữ liệu câu hỏi không hợp lệ.</p>
        </div>
      </div>
    );
  }
  
  const handleInputChange = (value: string) => {
    onAnswerSelect(value);
    setTimeout(onMathJaxRender, 50);
  };

  return (
    <>
      {!isInAllMode && (
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Nhập câu trả lời của bạn vào ô bên dưới:</p>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Edit3 className="w-5 h-5 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Nhập đáp án của bạn:</label>
        </div>
        <input
          type="text"
          value={selectedAnswer}
          onChange={(e) => handleInputChange(e.target.value)}
          disabled={showResults || isReview}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors duration-200 text-lg"
          placeholder="Nhập đáp án..."
        />
        {question.hint && !(showResults || isReview) && (
          <p className="text-sm text-gray-500 mt-2">💡 Gợi ý: {question.hint}</p>
        )}
      </div>

      {(showResults || isReview) && (
        <div className="space-y-4">
          <div className={`p-4 rounded-xl border-2 ${
            selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()
              ? 'bg-green-50 border-green-500'
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className="font-semibold">
                {selectedAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() 
                  ? 'Chính xác!' 
                  : 'Chưa đúng'}
              </span>
            </div>
            <p className="text-sm">Đáp án đúng: <strong>{question.correctAnswer}</strong></p>
          </div>
          
          {question.explanation && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <h4 className="font-semibold text-green-800">Giải thích:</h4>
              </div>
              <p className="text-green-700 leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default QuizSection;