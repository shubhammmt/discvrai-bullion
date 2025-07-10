
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, ThumbsUp, ThumbsDown, TrendingUp, Twitter, Users, Hash } from 'lucide-react';

interface SocialSentimentCardProps {
  symbol: string;
}

const SocialSentimentCard = ({ symbol }: SocialSentimentCardProps) => {
  const sentimentData = {
    overall: { score: 72, sentiment: 'Positive', change: '+5%' },
    platforms: {
      twitter: { mentions: 1247, sentiment: 75, trending: true },
      reddit: { mentions: 456, sentiment: 68, trending: false },
      news: { mentions: 89, sentiment: 78, trending: true }
    },
    keyTopics: [
      { topic: 'Q3 Results', mentions: 324, sentiment: 'positive' },
      { topic: 'Expansion Plans', mentions: 189, sentiment: 'positive' },
      { topic: 'Market Competition', mentions: 156, sentiment: 'neutral' },
      { topic: 'Regulatory Changes', mentions: 98, sentiment: 'negative' }
    ],
    recentMentions: [
      {
        platform: 'Twitter',
        text: `Strong quarter for ${symbol}! Revenue growth impressive 📈`,
        sentiment: 'positive',
        time: '2h ago',
        engagement: 34
      },
      {
        platform: 'Reddit',
        text: `Analysis: ${symbol} fundamentals look solid for long-term`,
        sentiment: 'positive',
        time: '4h ago',
        engagement: 67
      },
      {
        platform: 'News',
        text: `${symbol} faces headwinds from new regulations`,
        sentiment: 'negative',
        time: '6h ago',
        engagement: 12
      }
    ]
  };

  const getSentimentColor = (sentiment: string | number) => {
    const score = typeof sentiment === 'string' ? 
      (sentiment === 'positive' ? 75 : sentiment === 'negative' ? 25 : 50) : 
      sentiment;
    
    if (score >= 70) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp size={14} className="text-green-600" />;
      case 'negative': return <ThumbsDown size={14} className="text-red-600" />;
      default: return <MessageCircle size={14} className="text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Social Sentiment Analysis
          <Badge variant="secondary">Real-time</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Sentiment */}
          <div className={`p-4 rounded-lg border ${getSentimentColor(sentimentData.overall.score)}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{sentimentData.overall.sentiment}</h3>
                <p className="text-sm opacity-80">Overall market sentiment</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{sentimentData.overall.score}/100</div>
                <div className="text-sm">{sentimentData.overall.change} vs yesterday</div>
              </div>
            </div>
            <Progress value={sentimentData.overall.score} className="h-2" />
          </div>

          {/* Platform Breakdown */}
          <div>
            <h4 className="font-medium mb-3">Platform Breakdown</h4>
            <div className="space-y-3">
              {Object.entries(sentimentData.platforms).map(([platform, data]) => (
                <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      {platform === 'twitter' && <Twitter size={16} className="text-blue-500" />}
                      {platform === 'reddit' && <Users size={16} className="text-orange-500" />}
                      {platform === 'news' && <Hash size={16} className="text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{platform}</p>
                      <p className="text-sm text-gray-600">{data.mentions} mentions</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{data.sentiment}%</span>
                      {data.trending && <TrendingUp size={14} className="text-green-600" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div>
            <h4 className="font-medium mb-3">Trending Topics</h4>
            <div className="space-y-2">
              {sentimentData.keyTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    {getSentimentIcon(topic.sentiment)}
                    <span className="text-sm">{topic.topic}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {topic.mentions} mentions
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Mentions */}
          <div>
            <h4 className="font-medium mb-3">Recent Mentions</h4>
            <div className="space-y-3">
              {sentimentData.recentMentions.map((mention, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {mention.platform}
                    </Badge>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span>{mention.time}</span>
                      <span>•</span>
                      <span>{mention.engagement} reactions</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{mention.text}</p>
                  <div className="mt-2">
                    {getSentimentIcon(mention.sentiment)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded p-2">
            <strong>Note:</strong> Social sentiment is for informational purposes only and should not be considered as investment advice. 
            Sentiment can be volatile and may not reflect fundamental value.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialSentimentCard;
