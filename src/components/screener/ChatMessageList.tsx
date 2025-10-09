import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Clock } from 'lucide-react';
import StockScreenerResults from './StockScreenerResults';
import type { ChatMessage } from '@/pages/AIStockScreener';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatMessageList = ({ messages, isLoading }: ChatMessageListProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          {/* Avatar */}
          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.type === 'ai' ? 'bg-primary/10' : 'bg-muted'
          }`}>
            {message.type === 'ai' ? (
              <Bot className="h-4 w-4 text-primary" />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {/* Message Content */}
          <div className={`flex-1 max-w-[85%] ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
            <Card className={`p-3 ${
              message.type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              
              {/* Metadata */}
              {message.metadata && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                  <Badge variant="outline" className="text-xs">
                    {message.metadata.queryType}
                  </Badge>
                  {message.metadata.responseTime && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {message.metadata.responseTime}s
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Results Table */}
            {message.results && message.results.length > 0 && (
              <div className="mt-3">
                <StockScreenerResults results={message.results} market={message.market} />
              </div>
            )}

            {/* Timestamp */}
            <p className="text-xs text-muted-foreground mt-1 px-1">
              {message.timestamp.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex gap-3">
          <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <Card className="p-3 bg-card">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatMessageList;
