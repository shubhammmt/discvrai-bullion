
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Brain } from 'lucide-react';

interface CorporateActionsCardProps {
  symbol: string;
}

const CorporateActionsCard = ({ symbol }: CorporateActionsCardProps) => {
  const upcomingEvents = [
    { type: 'Results', event: 'Q4 FY24 Results', date: 'Apr 18, 2024', icon: '📊' },
    { type: 'AGM', event: 'Annual General Meeting', date: 'Jun 28, 2024', icon: '🏛️' },
    { type: 'Dividend', event: 'Ex-Dividend Date', date: 'Jul 15, 2024', icon: '💰' },
    { type: 'Board Meeting', event: 'Board Meeting', date: 'Aug 12, 2024', icon: '👥' }
  ];

  const recentEvents = [
    { type: 'Results', event: 'Q3 FY24 Results', date: 'Jan 15, 2024', status: 'Completed' },
    { type: 'Dividend', event: 'Interim Dividend', date: 'Dec 20, 2023', status: 'Paid' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Corporate Actions & Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{event.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Recent Events</h3>
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{event.event}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <Badge variant="secondary">{event.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Brain size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">AI Calendar Alert:</p>
                <p className="text-sm text-yellow-700">
                  Upcoming Q4 results on Apr 18 could be a catalyst. Historical pattern shows positive price reaction post-results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorporateActionsCard;
