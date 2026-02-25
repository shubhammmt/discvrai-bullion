
import React from 'react';

interface ChatMessage {
  id: number;
  type: 'user' | 'ai';
  content: string;
  results?: any[];
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

const renderContent = (content: string) => {
  const parts = content.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
};

const ChatHistory = ({ messages }: ChatHistoryProps) => {
  return (
    <div className="max-h-32 overflow-y-auto space-y-2 mb-4 bg-white/50 rounded-lg p-3">
      {messages.slice(-2).map((message) => (
        <div
          key={message.id}
          className={`${
            message.type === 'user'
              ? 'ml-6 bg-blue-100 text-blue-900'
              : 'mr-6 bg-white text-gray-900'
          } p-2 rounded-lg text-sm`}
        >
          <div>{renderContent(message.content)}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
