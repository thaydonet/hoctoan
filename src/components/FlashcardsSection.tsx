import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Zap, Grid, List } from 'lucide-react';
import { FlashCard } from '../types/MathTopic';

interface FlashcardsSectionProps {
  flashcards: FlashCard[];
  onMathJaxRender: () => void;
}

// Thêm mới: Bảng màu dịu nhẹ và đa dạng
const colorPalette = [
  { front: 'from-sky-200 to-sky-400', back: 'from-emerald-200 to-emerald-400' },
  { front: 'from-rose-200 to-rose-400', back: 'from-amber-200 to-amber-400' },
  { front: 'from-violet-200 to-violet-400', back: 'from-lime-200 to-lime-400' },
  { front: 'from-fuchsia-200 to-fuchsia-400', back: 'from-cyan-200 to-cyan-400' },
  { front: 'from-orange-200 to-orange-400', back: 'from-indigo-200 to-indigo-400' },
  { front: 'from-pink-300 to-pink-500', back: 'from-green-300 to-green-500' },
];

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ flashcards, onMathJaxRender }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('grid');

  // Thêm mới: State để lưu màu ngẫu nhiên cho mỗi thẻ
  const [cardColors, setCardColors] = useState<{front: string; back: string}[]>([]);

  useEffect(() => {
    onMathJaxRender();
  }, [currentCard, flippedCards, viewMode, onMathJaxRender]);

  // Thêm mới: useEffect để gán màu ngẫu nhiên một lần khi flashcards thay đổi
  useEffect(() => {
    const generatedColors = flashcards.map(() =>
      colorPalette[Math.floor(Math.random() * colorPalette.length)]
    );
    setCardColors(generatedColors);
  }, [flashcards]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setFlippedCards({});
    setTimeout(onMathJaxRender, 100);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlippedCards({});
    setTimeout(onMathJaxRender, 100);
  };

  const flipCard = (cardIndex: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardIndex]: !prev[cardIndex]
    }));
    setTimeout(onMathJaxRender, 200);
  };

  const resetCards = () => {
    setCurrentCard(0);
    setFlippedCards({});
    setTimeout(onMathJaxRender, 100);
  };

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Chưa có flashcards cho bài học này.</p>
      </div>
    );
  }

  // Single Card Component
  const SingleCard = ({ card, cardIndex, onClick, isCenter = false, frontColor, backColor }: {
    card: FlashCard;
    cardIndex: number;
    onClick?: () => void;
    isCenter?: boolean;
    frontColor: string;
    backColor: string;
  }) => {
    const isFlipped = flippedCards[cardIndex] || false;
    
    return (
      <div
        className={`
          relative cursor-pointer transition-all duration-800 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          ${isCenter ? 'z-20 scale-105' : 'z-10 scale-95 opacity-80'}
          shadow-xl hover:shadow-2xl hover:scale-110
        `}
        onClick={onClick}
        style={{ perspective: '1200px', width: '320px', height: '200px' }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`bg-gradient-to-br ${frontColor} rounded-xl shadow-2xl p-6 h-full flex flex-col justify-center text-white`}>
            <div className="text-center">
              <div className="text-sm font-medium text-white opacity-80 mb-3">CÂU HỎI</div>
              <div className="text-lg font-semibold leading-relaxed mb-4 text-gray-800">
                {card.question}
              </div>
              <div className="text-sm text-white opacity-80 flex items-center justify-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Nhấp để xem đáp án</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className={`bg-gradient-to-br ${backColor} rounded-xl shadow-2xl p-6 h-full flex flex-col justify-center text-white`}>
            <div className="text-center">
              <div className="text-sm font-medium text-white opacity-80 mb-3">ĐÁP ÁN</div>
              <div className="text-lg font-semibold leading-relaxed mb-4 text-gray-800">
                {card.answer}
              </div>
              <div className="text-sm text-white opacity-80 flex items-center justify-center space-x-2">
                <RotateCcw className="w-4 h-4" />
                <span>Nhấp để xem câu hỏi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Grid Card Component
  const GridCard = ({ card, cardIndex, frontColor, backColor }: { card: FlashCard; cardIndex: number; frontColor: string; backColor: string; }) => {
    const isFlipped = flippedCards[cardIndex] || false;
    
    return (
      <div
        className={`
          relative cursor-pointer transition-transform duration-800 transform-style-preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          shadow-lg hover:shadow-xl hover:scale-105
        `}
        onClick={() => flipCard(cardIndex)}
        style={{ perspective: '1000px', height: '200px' }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className={`bg-gradient-to-br ${frontColor} rounded-xl p-4 h-full flex flex-col justify-center text-white`}>
            <div className="text-center">
              <div className="text-xs font-medium text-white opacity-80 mb-2">CÂU HỎI {cardIndex + 1}</div>
              <div className="text-sm font-semibold leading-relaxed mb-3 line-clamp-4 text-gray-800">
                {card.question}
              </div>
              <div className="text-xs text-white opacity-80 flex items-center justify-center space-x-1">
                <RotateCcw className="w-3 h-3" />
                <span>Nhấp để lật</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className={`bg-gradient-to-br ${backColor} rounded-xl p-4 h-full flex flex-col justify-center text-white`}>
            <div className="text-center">
              <div className="text-xs font-medium text-white opacity-80 mb-2">ĐÁP ÁN {cardIndex + 1}</div>
              <div className="text-sm font-semibold leading-relaxed mb-3 line-clamp-4 text-gray-800">
                {card.answer}
              </div>
              <div className="text-xs text-white opacity-80 flex items-center justify-center space-x-1">
                <RotateCcw className="w-3 h-3" />
                <span>Nhấp để lật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {flashcards.length} thẻ
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                viewMode === 'single' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>Từng thẻ</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Tất cả</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'single' ? (
        <>
          {/* Single Card View */}
          <div className="flex justify-center mb-8">
            {cardColors.length > 0 && ( // Đảm bảo màu đã được tạo
              <SingleCard
                card={flashcards[currentCard]}
                cardIndex={currentCard}
                onClick={() => flipCard(currentCard)}
                isCenter={true}
                frontColor={cardColors[currentCard].front}
                backColor={cardColors[currentCard].back}
              />
            )}
          </div>

         {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevCard}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50"
              disabled={flashcards.length <= 1}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Trước</span>
            </button>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">
                {currentCard + 1} / {flashcards.length}
              </div>
              <button
                onClick={resetCards}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="font-medium">Bắt đầu lại</span>
              </button>
            </div>

            <button
              onClick={nextCard}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50"
              disabled={flashcards.length <= 1}
            >
              <span className="font-medium">Sau</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Grid View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {flashcards.map((card, index) => (
              cardColors[index] && ( // Đảm bảo màu đã được tạo
                <GridCard
                  key={card.id}
                  card={card}
                  cardIndex={index}
                  frontColor={cardColors[index].front}
                  backColor={cardColors[index].back}
                />
              )
            ))}
          </div>

         {/* Grid Controls */}
          <div className="text-center">
            <button
              onClick={() => setFlippedCards({})}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">Lật tất cả về mặt trước</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardsSection;