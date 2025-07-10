
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface AIConversationWidgetProps {
  symbol: string;
}

const AIConversationWidget = ({ symbol }: AIConversationWidgetProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4 text-purple-600" />
          Ask AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            Why is the stock up today?
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            Compare with sector peers
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            What are the key risks?
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-xs">
            Should I buy for long term?
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConversationWidget;
