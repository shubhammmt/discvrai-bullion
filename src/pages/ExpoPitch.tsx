import React, { useState, useEffect, useCallback } from 'react';
import { expoPitchSlides } from '@/data/expoPitchSlides';
import { ExpoSlideRenderer } from '@/components/pitch/expo/ExpoSlideRenderer';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Eye, 
  EyeOff,
  Monitor,
  Presentation,
  RotateCcw
} from 'lucide-react';

const ExpoPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [presentationMode, setPresentationMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const currentSlideData = expoPitchSlides[currentSlide];
  const slideTiming = currentSlideData?.timing || 18;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % expoPitchSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + expoPitchSlides.length) % expoPitchSlides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTimeRemaining(expoPitchSlides[index]?.timing || 18);
  };

  // Auto-advance timer
  useEffect(() => {
    if (!isAutoPlay) return;
    
    setTimeRemaining(slideTiming);
    
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          nextSlide();
          return slideTiming;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoPlay, currentSlide, slideTiming, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'p' || e.key === 'P') {
        setPresentationMode((prev) => !prev);
      }
      if (e.key === 'a' || e.key === 'A') {
        setIsAutoPlay((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setPresentationMode(false);
        setIsAutoPlay(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  // Section colors for progress indicator
  const sectionColors: Record<string, string> = {
    core: 'bg-blue-500',
    amc: 'bg-emerald-500',
    manufacturing: 'bg-orange-500',
    healthcare: 'bg-rose-500',
    closing: 'bg-violet-500'
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Top Bar - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mode Toggle */}
            <div className="flex items-center bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setIsAutoPlay(false)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                  !isAutoPlay 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Presentation className="w-4 h-4" />
                Present
              </button>
              <button
                onClick={() => setIsAutoPlay(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                  isAutoPlay 
                    ? 'bg-emerald-600 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                Expo Auto
              </button>
            </div>

            {/* Auto-play indicator */}
            {isAutoPlay && (
              <div className="flex items-center gap-2 text-emerald-400 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>Auto: {timeRemaining}s</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Slide counter */}
            <span className="text-slate-400 text-sm font-mono">
              {String(currentSlide + 1).padStart(2, '0')} / {String(expoPitchSlides.length).padStart(2, '0')}
            </span>
            
            {/* Section badge */}
            <span className={`px-2 py-1 rounded text-xs text-white capitalize ${sectionColors[currentSlideData?.section || 'core']}`}>
              {currentSlideData?.section}
            </span>

            {/* Presentation mode toggle */}
            <button
              onClick={() => setPresentationMode(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all text-sm"
            >
              <Eye className="w-4 h-4" />
              Screenshot Mode
            </button>
          </div>
        </div>
      )}

      {/* Main Slide Area - 16:9 Aspect Ratio Container */}
      <div className="flex-1 flex items-center justify-center p-4 bg-slate-900">
        <div 
          className="w-full h-full max-w-[1920px] max-h-[1080px] bg-white rounded-lg shadow-2xl overflow-hidden relative"
          style={{ aspectRatio: '16/9' }}
        >
          <ExpoSlideRenderer slide={currentSlideData} />
          
          {/* Progress bar for auto-play */}
          {isAutoPlay && !presentationMode && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000"
                style={{ width: `${((slideTiming - timeRemaining) / slideTiming) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="bg-slate-800 border-t border-slate-700 px-4 py-3">
          <div className="flex items-center justify-center gap-4">
            {/* Play/Pause for auto mode */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isAutoPlay 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {isAutoPlay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>

            {/* Previous */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide dots with section colors */}
            <div className="flex items-center gap-1 max-w-[600px] overflow-x-auto px-2">
              {expoPitchSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 h-2 rounded-full transition-all ${
                    index === currentSlide 
                      ? `w-6 ${sectionColors[slide.section]}` 
                      : `w-2 bg-slate-600 hover:bg-slate-500`
                  }`}
                  title={`Slide ${index + 1}: ${slide.title}`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Reset */}
            <button
              onClick={() => goToSlide(0)}
              className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white flex items-center justify-center transition-all"
              title="Reset to first slide"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="text-center mt-2 text-xs text-slate-500">
            <span className="mr-4">← → Navigate</span>
            <span className="mr-4">Space: Next</span>
            <span className="mr-4">A: Auto-play</span>
            <span>P: Screenshot mode</span>
          </div>
        </div>
      )}

      {/* Presentation mode - press P or Escape to exit (no visible button for clean screenshots) */}

      {/* Click navigation in presentation mode */}
      {presentationMode && (
        <>
          <div 
            className="fixed left-0 top-0 bottom-0 w-1/3 cursor-pointer z-40"
            onClick={prevSlide}
          />
          <div 
            className="fixed right-0 top-0 bottom-0 w-1/3 cursor-pointer z-40"
            onClick={nextSlide}
          />
        </>
      )}
    </div>
  );
};

export default ExpoPitch;
