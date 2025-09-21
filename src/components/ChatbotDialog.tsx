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
        className={`fixed z-50 w-96 h-[500px] ai-surface-elevated ai-border-glow border rounded-2xl flex flex-col shadow-2xl transition-all duration-200 ${
          isClosing ? 'animate-scale-out opacity-0' : 'animate-scale-in opacity-100'
        }`}
        style={{
          right: `${position.x}px`,
          bottom: `${position.y}px`,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 ai-gradient rounded-t-2xl cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">discvr.ai</h3>
              <p className="text-white/70 text-xs">AI Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-lg"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              onClick={handleFullscreen}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-lg"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white hover:bg-white/20 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {messages.length === 0 ? (
            /* Welcome State */
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <div>
                <div className="w-12 h-12 ai-gradient rounded-xl flex items-center justify-center mb-3 mx-auto ai-glow">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white font-semibold mb-2">Hi there!</h4>
                <p className="text-gray-400 text-xs leading-relaxed">
                  How can I help you today? Ask me anything!
                </p>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'ai-gradient ai-glow'
                      : 'ai-surface-elevated ai-border-glow border'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Brain className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  
                  {/* Message Content */}
                  <div className={`max-w-[75%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`rounded-xl p-3 text-sm ${
                        message.type === 'user'
                          ? 'bg-purple-600/70 border border-purple-500/50 text-white'
                          : 'ai-surface-elevated border ai-border-glow text-white'
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
                  <div className="w-8 h-8 rounded-lg ai-surface-elevated ai-border-glow border flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="ai-surface-elevated border ai-border-glow rounded-xl p-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t ai-border-glow">
            <div className="flex items-center gap-2 ai-surface-elevated rounded-full border ai-border-glow px-3 py-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-sm placeholder:text-gray-500 text-white outline-none"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="ai-gradient hover:opacity-90 text-white rounded-full w-8 h-8 p-0 ai-glow"
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
      className="fixed bottom-6 right-6 w-14 h-14 ai-gradient rounded-full ai-glow-intense hover:scale-110 transition-all duration-300 z-30 shadow-2xl"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};

export default ChatbotDialog;
