import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Brain, X, Maximize2, MessageCircle, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotDialog: React.FC<ChatbotDialogProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'd be happy to help you with that! How can I assist you further?",
        "Great question! Let me analyze this for you and provide insights.",
        "I understand what you're looking for. Here's what I found...",
        `That's interesting about "${messageToSend}". Let me provide you with some helpful information.`
      ];
      
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep dialog within viewport bounds
      const maxX = window.innerWidth - 400;
      const maxY = window.innerHeight - 500;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleFullscreen = () => {
    handleClose();
    navigate('/chatbot');
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Match animation duration
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-200 ${isClosing ? 'opacity-0' : 'opacity-100'}`} onClick={handleClose} />
      
      {/* Dialog */}
      <div
        ref={dialogRef}
        className={`fixed z-50 w-[90vw] sm:w-96 h-[80vh] sm:h-[500px] max-w-md border rounded-2xl flex flex-col shadow-2xl transition-opacity duration-200 ${
          isDarkMode 
            ? 'ai-surface-elevated ai-border-glow' 
            : 'bg-white border-gray-200'
        } ${isClosing ? 'animate-scale-out opacity-0' : 'animate-scale-in opacity-100'}`}
        style={{
          right: window.innerWidth < 640 ? '5vw' : `${position.x}px`,
          bottom: window.innerWidth < 640 ? '10vh' : `${position.y}px`,
        }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-3 sm:p-4 rounded-t-2xl cursor-move select-none ${
            isDarkMode ? 'ai-gradient' : 'bg-gradient-to-r from-blue-600 to-purple-600'
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-white/20' : 'bg-white/30'
            }`}>
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-white font-semibold text-sm">discvr.ai</h3>
              <p className="text-white/70 text-xs">AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-white hover:bg-white/20 rounded-lg transition-colors"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-3 w-3 sm:h-4 sm:w-4" /> : <Moon className="h-3 w-3 sm:h-4 sm:w-4" />}
            </Button>
            <Button
              onClick={handleFullscreen}
              variant="ghost"
              size="sm"
              className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-white hover:bg-white/20 rounded-lg"
            >
              <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="w-7 h-7 sm:w-8 sm:h-8 p-0 text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            /* Welcome State */
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 text-center">
              <div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 mx-auto ${
                  isDarkMode ? 'ai-gradient ai-glow' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                  <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h4 className={`font-semibold mb-2 text-sm sm:text-base ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Hi there!</h4>
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  How can I help you today? Ask me anything!
                </p>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className={`flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 ${
              isDarkMode ? '' : 'bg-gray-50'
            }`}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? isDarkMode 
                        ? 'ai-gradient ai-glow'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : isDarkMode 
                        ? 'ai-surface-elevated ai-border-glow border'
                        : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    ) : (
                      <Brain className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`max-w-[80%] sm:max-w-[75%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm ${
                        message.type === 'user'
                          ? isDarkMode
                            ? 'bg-purple-600/70 border border-purple-500/50 text-white'
                            : 'bg-blue-600 text-white'
                          : isDarkMode
                            ? 'ai-surface-elevated border ai-border-glow text-white'
                            : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                      }`}
                    >
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDarkMode ? 'ai-surface-elevated ai-border-glow border' : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    <Brain className={`h-4 w-4 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className={`rounded-xl p-3 ${
                    isDarkMode ? 'ai-surface-elevated border ai-border-glow' : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    <div className="flex space-x-1">
                      <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                        isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                      }`}></div>
                      <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                        isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                      }`} style={{ animationDelay: '0.1s' }}></div>
                      <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${
                        isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                      }`} style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className={`p-3 sm:p-4 border-t ${
            isDarkMode ? 'ai-border-glow' : 'border-gray-200 bg-white'
          }`}>
            <div className={`flex items-center gap-2 rounded-full border px-2.5 sm:px-3 py-1.5 sm:py-2 ${
              isDarkMode ? 'ai-surface-elevated ai-border-glow' : 'bg-gray-50 border-gray-200'
            }`}>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className={`flex-1 border-0 bg-transparent focus-visible:ring-0 text-xs sm:text-sm outline-none ${
                  isDarkMode 
                    ? 'placeholder:text-gray-500 text-white' 
                    : 'placeholder:text-gray-400 text-gray-900'
                }`}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className={`rounded-full w-7 h-7 sm:w-8 sm:h-8 p-0 hover:opacity-90 transition-all duration-300 ${
                  isDarkMode ? 'ai-gradient ai-glow' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                }`}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Trigger Button Component
export const ChatbotTrigger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 ai-gradient rounded-full ai-glow-intense hover:scale-110 transition-all duration-300 z-30 shadow-2xl"
    >
      <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
    </Button>
  );
};

export default ChatbotDialog;
