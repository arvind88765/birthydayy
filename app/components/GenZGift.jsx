'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function GenZGift() {
  const [stage, setStage] = useState('hero');
  const [cardOpen, setCardOpen] = useState(false);
  const [presentOpen, setPresentOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(true);

  const name = 'Raj';

  const letterContent = {
    greeting: `Dear ${name},`,
    body: `I just wanted to say you're absolutely amazing! 
    
Remember when we had that crazy adventure together? Those are the moments 
I treasure the most. You make every day more fun, more meaningful, and 
more colorful.

I'm so grateful to have you in my life. Here are some of our best memories...`,
    closing: `Can't wait to celebrate this special day with you! You deserve 
all the happiness in the world.

Forever your friend,
Love & Laughter 💕`
  };

  const pics = [
    { id: 1, caption: 'That time we were pure chaos 😂' },
    { id: 2, caption: 'Best memories with you ❤️' },
    { id: 3, caption: 'You\'re literally the best 🎉' },
  ];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleClickMe = () => {
    triggerConfetti();
    setStage('card');
  };

  const handleCardOpen = () => {
    setCardOpen(true);
    triggerConfetti();
    setTimeout(() => {
      setStage('letter');
    }, 800);
  };

  const handlePresentOpen = () => {
    setPresentOpen(true);
    triggerConfetti();
    triggerConfetti();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Mute Button */}
      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed top-6 right-6 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg z-50 text-2xl transition-all"
        title={musicPlaying ? 'Mute' : 'Unmute'}
      >
        {musicPlaying ? '🔊' : '🔇'}
      </button>

      {/* HERO STAGE */}
      {stage === 'hero' && (
        <div className="text-center space-y-8 max-w-md w-full animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 animate-pulse-custom">
              🎉 Happy Birthday {name}! 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-semibold">
              The vibes are immaculate ✨
            </p>
          </div>

          <button
            onClick={handleClickMe}
            className="w-full mx-auto bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-200 text-lg animate-bounce-custom"
          >
            ✨ Wanna a small surprise? Click Me ✨
          </button>

          <div className="text-3xl md:text-4xl animate-pulse-custom">
            ⬇️ Click the button ⬇️
          </div>
        </div>
      )}

      {/* CARD STAGE */}
      {stage === 'card' && !cardOpen && (
        <div className="text-center space-y-8 w-full max-w-md animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800">✨ Tap the Card ✨</h2>

          <div
            onClick={handleCardOpen}
            className="relative w-full h-96 cursor-pointer transform hover:scale-105 transition-transform"
          >
            {/* Card */}
            <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-pink-100 rounded-2xl shadow-2xl border-4 border-pink-300 flex flex-col items-center justify-center p-6 md:p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 text-4xl">🎂</div>
              <div className="absolute bottom-4 left-4 text-4xl">🎂</div>

              <div className="text-center space-y-4">
                <div className="text-6xl">💌</div>
                <h3 className="text-2xl font-bold text-pink-600">Birthday Card</h3>
                <p className="text-gray-700 font-semibold">Tap to open your greeting</p>
                <div className="text-xl mt-4 animate-pulse-custom">👆</div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 animate-bounce-custom">Click on the card!</p>
        </div>
      )}

      {/* LETTER STAGE */}
      {stage === 'letter' && (
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-6 md:p-12 space-y-6 max-h-[85vh] overflow-y-auto">
            {/* Letter Header */}
            <div className="border-b-4 border-pink-300 pb-6">
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                {letterContent.greeting}
              </p>
            </div>

            {/* Letter Body */}
            <div className="space-y-8">
              {/* Opening */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {letterContent.body}
              </p>

              {/* Picture 1 */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-pink-300 to-purple-300 rounded-lg shadow-lg flex items-center justify-center text-6xl border-4 border-white">
                  📸
                </div>
                <p className="text-xs md:text-sm text-gray-600 italic text-center">
                  {pics[0].caption}
                </p>
              </div>

              {/* More body text */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                From the first day we met, I knew you were someone special. 
                Your laugh is contagious, your heart is pure, and your vibe 
                is absolutely unmatched! ✨
              </p>

              {/* Picture 2 */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-blue-300 to-cyan-300 rounded-lg shadow-lg flex items-center justify-center text-6xl border-4 border-white">
                  📸
                </div>
                <p className="text-xs md:text-sm text-gray-600 italic text-center">
                  {pics[1].caption}
                </p>
              </div>

              {/* More body text */}
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                Keep being your authentic self because that's what makes you 
                truly beautiful. The world needs more people like you! 🌟
              </p>

              {/* Picture 3 */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-full md:w-64 h-64 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-lg shadow-lg flex items-center justify-center text-6xl border-4 border-white">
                  📸
                </div>
                <p className="text-xs md:text-sm text-gray-600 italic text-center">
                  {pics[2].caption}
                </p>
              </div>

              {/* Closing */}
              <div className="border-t-4 border-pink-300 pt-6 space-y-4">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {letterContent.closing}
                </p>
              </div>

              {/* Present Section */}
              <div className="flex flex-col items-center space-y-6 py-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-6">
                <p className="text-xl md:text-2xl font-bold text-gray-800">
                  One more thing... 👇
                </p>

                <button
                  onClick={handlePresentOpen}
                  className="text-6xl md:text-7xl cursor-pointer transform hover:scale-110 transition-transform duration-200 animate-bounce-custom"
                  title="Click to open"
                >
                  🎁
                </button>

                <p className="text-xs md:text-sm text-gray-600">Tap the present!</p>

                {presentOpen && (
                  <div className="w-full text-center space-y-4 animate-fade-in">
                    <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                      ✨ Happy Birthday! ✨
                    </p>
                    <p className="text-lg md:text-xl text-gray-700 font-semibold">
                      You're AMAZING! 
                      <br/>
                      Love you so much! 💕
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="text-center mt-4 text-gray-600 animate-pulse-custom text-sm md:text-base">
            ⬇️ Scroll to see more & the present! ⬇️
          </div>
        </div>
      )}
    </div>
  );
}
