
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, Users, DollarSign, FileText, Clock } from 'lucide-react';

interface CorporateActionsCardProps {
  symbol: string;
}

const CorporateActionsCard = ({ symbol }: CorporateActionsCardProps) => {
  const corporateActions = [
    {
      type: 'dividend',
      title: 'Dividend Declaration',
      description: 'Final dividend of ₹12 per share',
      date: '2024-07-15',
      status: 'upcoming',
      impact: 'positive',
      details: 'Ex-date: July 15, Record date: July 16, Payment date: July 30'
    },
    {
      type: 'results',
      title: 'Q4 FY24 Results',
      description: 'Quarterly earnings announcement',
      date: '2024-04-18',
      status: 'completed',
      impact: 'positive',
      details: 'Revenue grew 15% YoY, Net profit up 12%'
    },
    {
      type: 'agm',
      title: 'Annual General Meeting',
      description: 'AGM & Annual Report presentation',
      date: '2024-06-28',
      status: 'upcoming',
      impact: 'neutral',
      details: 'Venue: Mumbai, Time: 11:00 AM'
    },
    {
      type: 'bonus',
      title: 'Board Meeting',
      description: 'To consider bonus issue proposal',
      date: '2024-05-20',
      status: 'upcoming',
      impact: 'positive',
      details: 'Ratio and other details to be announced'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'dividend': return <DollarSign size={16} className="text-green-600" />;
      case 'results': return <TrendingUp size={16} className="text-blue-600" />;
      case 'agm': return <Users size={16} className="text-purple-600" />;
      case 'bonus': return <FileText size={16} className="text-orange-600" />;
      default: return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-700 border-blue-200',
      completed: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'border-l-green-500';
      case 'negative': return 'border-l-red-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Corporate Actions & Events
          <Badge variant="secondary">{corporateActions.length} Events</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {corporateActions.map((action, index) => (
            <div 
              key={index} 
              className={`p-4 border-l-4 ${getImpactColor(action.impact)} bg-gray-50 rounded-r-lg hover:bg-gray-100 transition-colors`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getActionIcon(action.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{action.title}</h4>
                      <Badge className={getStatusBadge(action.status)}>
                        {action.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{action.description}</p>
                    <p className="text-xs text-gray-600">{action.details}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                    <Clock size={14} />
                    <span>{formatDate(action.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Quick Calendar Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center p-2 bg-white rounded">
              <div className="text-blue-600 font-bold">Apr 18</div>
              <div className="text-xs text-gray-600">Q4 Results</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-purple-600 font-bold">May 20</div>
              <div className="text-xs text-gray-600">Board Meet</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-green-600 font-bold">Jun 28</div>
              <div className="text-xs text-gray-600">AGM</div>
            </div>
            <div className="text-center p-2 bg-white rounded">
              <div className="text-orange-600 font-bold">Jul 15</div>
              <div className="text-xs text-gray-600">Ex-Dividend</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorporateActionsCard;
