import React, { useState, useEffect } from 'react';
import { Bot, Send, BookOpen, Lightbulb, Calculator, HelpCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface StudyAssistantProps {
  chapter?: string;
  lesson?: string;
  onMathJaxRender: () => void;
}

const StudyAssistant: React.FC<StudyAssistantProps> = ({ chapter, lesson, onMathJaxRender }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content: `Xin chào! Tôi là trợ lý học tập AI của bạn. Tôi có thể giúp bạn:
      
• Giải thích các khái niệm toán học
• Hướng dẫn giải bài tập từng bước
• Đưa ra gợi ý khi bạn gặp khó khăn
• Tạo bài tập tương tự để luyện tập

Bạn có câu hỏi gì về ${chapter || 'toán học'} không?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [chapter]);

  useEffect(() => {
    onMathJaxRender();
  }, [messages, onMathJaxRender]);

  const quickQuestions = [
    "Giải thích khái niệm phân thức đại số",
    "Hướng dẫn rút gọn phân thức",
    "Cách giải phương trình bậc nhất",
    "Tạo bài tập tương tự",
    "Kiểm tra bài làm của em"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('phân thức')) {
      return `Phân thức đại số là biểu thức có dạng $\\frac{A}{B}$ trong đó:

• $A$ và $B$ là các đa thức
• $B \\neq 0$ (điều kiện xác định)

**Ví dụ:** $\\frac{x+1}{x-2}$ với điều kiện $x \\neq 2$

**Các phép toán cơ bản:**
• Rút gọn: Chia cả tử và mẫu cho nhân tử chung
• Cộng trừ: Quy đồng mẫu số
• Nhân chia: Nhân tử với tử, mẫu với mẫu

Bạn có muốn tôi giải thích chi tiết phép toán nào không?`;
    }
    
    if (lowerQuestion.includes('rút gọn')) {
      return `**Cách rút gọn phân thức:**

**Bước 1:** Phân tích tử và mẫu thành nhân tử
**Bước 2:** Tìm nhân tử chung
**Bước 3:** Chia cả tử và mẫu cho nhân tử chung

**Ví dụ:** Rút gọn $\\frac{x^2-4}{x^2+4x+4}$

• Tử số: $x^2-4 = (x-2)(x+2)$
• Mẫu số: $x^2+4x+4 = (x+2)^2$
• Kết quả: $\\frac{(x-2)(x+2)}{(x+2)^2} = \\frac{x-2}{x+2}$

Bạn có bài tập cụ thể nào cần giúp không?`;
    }
    
    if (lowerQuestion.includes('phương trình')) {
      return `**Phương trình bậc nhất** có dạng $ax + b = 0$ với $a \\neq 0$

**Cách giải:**
1. Chuyển vế: $ax = -b$
2. Chia hai vế cho $a$: $x = -\\frac{b}{a}$

**Ví dụ:** Giải $3x - 7 = 2x + 1$
• Chuyển vế: $3x - 2x = 1 + 7$
• Rút gọn: $x = 8$

**Kiểm tra:** $3(8) - 7 = 24 - 7 = 17$ và $2(8) + 1 = 17$ ✓

Bạn có phương trình nào cần giải không?`;
    }
    
    return `Tôi hiểu bạn đang hỏi về "${question}". 

Đây là một câu hỏi hay! Để tôi có thể hỗ trợ bạn tốt nhất, bạn có thể:

• Cung cấp thêm chi tiết về vấn đề
• Gửi bài tập cụ thể cần giải
• Cho biết phần nào bạn đang gặp khó khăn

Tôi sẽ cố gắng giải thích một cách dễ hiểu nhất có thể!`;
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Bot className="w-8 h-8 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-900">Trợ lý học tập AI</h2>
        <Sparkles className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.type === 'assistant' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-600">Trợ lý AI</span>
                  </div>
                )}
                <div className="whitespace-pre-line leading-relaxed">
                  {message.content}
                </div>
                <div className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-600">Trợ lý AI</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="border-t border-gray-200 p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Câu hỏi gợi ý:</h4>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm transition-colors duration-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white p-3 rounded-lg transition-colors duration-200"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-blue-800 mb-2">Giải thích khái niệm</h3>
          <p className="text-blue-700 text-sm">Giải thích các khái niệm toán học một cách dễ hiểu với ví dụ cụ thể</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-green-800 mb-2">Hướng dẫn giải bài</h3>
          <p className="text-green-700 text-sm">Hướng dẫn giải bài tập từng bước một cách chi tiết</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-purple-800 mb-2">Gợi ý thông minh</h3>
          <p className="text-purple-700 text-sm">Đưa ra gợi ý và mẹo học tập hiệu quả</p>
        </div>
      </div>
    </div>
  );
};

export default StudyAssistant;