import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

interface AptechWhatsAppMessageProps {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  children?: React.ReactNode;
  senderName?: string;
}

const AptechWhatsAppMessage = ({ type, content, timestamp, status = 'read', children, senderName }: AptechWhatsAppMessageProps) => {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in mb-1`}>
      <div className={`relative max-w-[85%] rounded-lg px-3 py-2 text-[13.5px] leading-[19px] shadow-sm ${
        type === 'user'
          ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none'
          : 'bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none'
      }`}>
        {/* Tail */}
        <div className={`absolute top-0 w-3 h-3 overflow-hidden ${
          type === 'user' ? '-right-[6px]' : '-left-[6px]'
        }`}>
          <div className={`w-3 h-3 transform rotate-45 ${
            type === 'user'
              ? 'bg-[#d9fdd3] dark:bg-[#005c4b] -translate-x-1.5'
              : 'bg-white dark:bg-[#202c33] translate-x-1.5'
          }`} />
        </div>

        {/* Sender name for bot */}
        {type === 'bot' && senderName && (
          <p className="text-[12.5px] font-medium text-[#06cf9c] mb-0.5">{senderName}</p>
        )}

        {/* Content */}
        <div className="whitespace-pre-wrap">
          {content.split('\n').map((line, i) => {
            // Handle bold
            const parts = line.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            );
          })}
        </div>

        {/* Timestamp + ticks */}
        <div className={`flex items-center gap-1 justify-end mt-0.5 -mb-0.5`}>
          <span className="text-[10.5px] text-[#667781] dark:text-[#8696a0] leading-none">{timestamp}</span>
          {type === 'user' && (
            status === 'read' ? (
              <CheckCheck className="h-[14px] w-[14px] text-[#53bdeb]" />
            ) : status === 'delivered' ? (
              <CheckCheck className="h-[14px] w-[14px] text-[#667781]" />
            ) : (
              <Check className="h-[14px] w-[14px] text-[#667781]" />
            )
          )}
        </div>

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default AptechWhatsAppMessage;
