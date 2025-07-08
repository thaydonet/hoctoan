import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Zap, Grid, List } from 'lucide-react';
// Giả sử bạn có type này
interface FlashCard {
  id: string | number;
  question: string;
  answer: string;
}

interface FlashcardsSectionProps {
  flashcards: FlashCard[];
  onMathJaxRender: () => void;
}

const colorPalette = [
    { front: 'from-sky-200 to-sky-400', back: 'from-emerald-200 to-emerald-400' },
    // ... các màu khác
];

const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ flashcards, onMathJaxRender }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [flippedCards, setFlippedCards] = useState<{[key: number]: boolean}>({});
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('grid');
  const [cardColors, setCardColors] = useState<{front: string; back: string}[]>([]);

  useEffect(() => {
    onMathJaxRender();
  }, [currentCard, flippedCards, viewMode, onMathJaxRender]);

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

  const SingleCard = ({ card, cardIndex, onClick, frontColor, backColor }: {
    card: FlashCard; cardIndex: number; onClick?: () => void; frontColor: string; backColor: string;
  }) => {
    const isFlipped = flippedCards[cardIndex] || false;
    const cardStyle = { perspective: '1500px' };
    const innerStyle = {
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      transformStyle: 'preserve-3d' as const,
    };

    return (
      <div className="relative cursor-pointer group" onClick={onClick} style={cardStyle}>
        <div className="relative w-[320px] h-[200px] shadow-xl group-hover:shadow-2xl" style={innerStyle}>
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className={`bg-gradient-to-br ${frontColor} rounded-xl p-6 h-full flex flex-col justify-center text-white`}>
              <div className="text-center">
                <div className="text-sm font-medium text-white opacity-80 mb-3">CÂU HỎI</div>
                <div className="text-lg font-semibold leading-relaxed mb-4 text-gray-800">{card.question}</div>
                <div className="text-sm text-white opacity-80 flex items-center justify-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Nhấp để xem đáp án</span>
                </div>
              </div>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
            <div className={`bg-gradient-to-br ${backColor} rounded-xl p-6 h-full flex flex-col justify-center text-white`}>
               <div className="text-center">
                <div className="text-sm font-medium text-white opacity-80 mb-3">ĐÁP ÁN</div>
                <div className="text-lg font-semibold leading-relaxed mb-4 text-gray-800">{card.answer}</div>
                <div className="text-sm text-white opacity-80 flex items-center justify-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Nhấp để xem câu hỏi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GridCard = ({ card, cardIndex, frontColor, backColor }: {
    card: FlashCard; cardIndex: number; frontColor: string; backColor: string;
  }) => {
    const isFlipped = flippedCards[cardIndex] || false;
    const cardStyle = { perspective: '1200px', height: '200px' };
    const innerStyle = {
      // Hợp nhất transition cho cả transform (lật) và scale (hover)
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      transformStyle: 'preserve-3d' as const,
    };

    return (
      <div className="relative cursor-pointer group" onClick={() => flipCard(cardIndex)} style={cardStyle}>
        {/* ⚠️ Cải thiện: Bỏ `transition-transform duration-300` để tránh xung đột */}
        <div className="relative w-full h-full shadow-lg group-hover:shadow-xl group-hover:scale-105" style={innerStyle}>
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className={`bg-gradient-to-br ${frontColor} rounded-xl p-4 h-full flex flex-col justify-center text-white`}>
              <div className="text-center">
                <div className="text-xs font-medium text-white opacity-80 mb-2">CÂU HỎI {cardIndex + 1}</div>
                <div className="text-sm font-semibold leading-relaxed mb-3 line-clamp-4 text-gray-800">{card.question}</div>
                <div className="text-xs text-white opacity-80 flex items-center justify-center space-x-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Nhấp để lật</span>
                </div>
              </div>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
            <div className={`bg-gradient-to-br ${backColor} rounded-xl p-4 h-full flex flex-col justify-center text-white`}>
              <div className="text-center">
                <div className="text-xs font-medium text-white opacity-80 mb-2">ĐÁP ÁN {cardIndex + 1}</div>
                <div className="text-sm font-semibold leading-relaxed mb-3 line-clamp-4 text-gray-800">{card.answer}</div>
                <div className="text-xs text-white opacity-80 flex items-center justify-center space-x-1">
                  <RotateCcw className="w-3 h-3" />
                  <span>Nhấp để lật</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // ✅ TOÀN BỘ JSX PHẢI NẰM TRONG RETURN
  return (
    <div className="max-w-7xl mx-auto p-4">
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
            <button onClick={() => setViewMode('single')} className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${viewMode === 'single' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <Grid className="w-4 h-4" />
              <span>Từng thẻ</span>
            </button>
            <button onClick={() => setViewMode('grid')} className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'}`}>
              <List className="w-4 h-4" />
              <span>Tất cả</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logic hiển thị theo viewMode */}
      {viewMode === 'single' ? (
        <>
          <div className="flex justify-center items-center mb-8 h-[220px]">
            {cardColors.length > 0 && (
              <SingleCard
                card={flashcards[currentCard]}
                cardIndex={currentCard}
                onClick={() => flipCard(currentCard)}
                frontColor={cardColors[currentCard].front}
                backColor={cardColors[currentCard].back}
              />
            )}
          </div>
          <div className="flex justify-between items-center">
            <button onClick={prevCard} disabled={flashcards.length <= 1} className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Trước</span>
            </button>
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">{currentCard + 1} / {flashcards.length}</div>
              <button onClick={resetCards} className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
                <RotateCcw className="w-5 h-5" />
                <span className="font-medium">Bắt đầu lại</span>
              </button>
            </div>
            <button onClick={nextCard} disabled={flashcards.length <= 1} className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 disabled:opacity-50">
              <span className="font-medium">Sau</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {flashcards.map((card, index) => (
              cardColors[index] && (
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
          <div className="text-center">
            <button onClick={() => setFlippedCards({})} className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto">
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