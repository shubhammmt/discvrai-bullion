import React from 'react';
import { Bot, User } from 'lucide-react';

interface AptechChatMessageProps {
  type: 'user' | 'bot';
  content: string;
  children?: React.ReactNode;
}

const AptechChatMessage = ({ type, content, children }: AptechChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${type === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in`}>
      {/* Avatar */}
      <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
        type === 'bot'
          ? 'bg-gradient-to-br from-orange-500 to-blue-600 text-white'
          : 'bg-muted text-muted-foreground'
      }`}>
        {type === 'bot' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>

      {/* Message */}
      <div className={`max-w-[80%] ${type === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          type === 'user'
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-sm'
            : 'bg-card border border-border text-foreground rounded-tl-sm'
        }`}>
          {content.split('\n').map((line, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>
              {line.replace(/\*\*(.*?)\*\*/g, (_, m) => m).split('•').map((part, j) =>
                j === 0 ? part : <React.Fragment key={j}><br />• {part}</React.Fragment>
              )}
            </p>
          ))}
        </div>
        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
};

export default AptechChatMessage;
