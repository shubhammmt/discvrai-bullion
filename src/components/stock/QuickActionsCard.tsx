
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, BookmarkPlus, StickyNote, Plus, Heart } from 'lucide-react';

interface QuickActionsCardProps {
  symbol: string;
  isWatchlisted: boolean;
  onWatchlistToggle: (value: boolean) => void;
}

const QuickActionsCard = ({ symbol, isWatchlisted, onWatchlistToggle }: QuickActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start" variant="outline">
          <Bell size={16} className="mr-2" />
          Set Price Alert
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => onWatchlistToggle(!isWatchlisted)}
        >
          <Heart size={16} className={`mr-2 ${isWatchlisted ? 'fill-red-500 text-red-500' : ''}`} />
          {isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <BookmarkPlus size={16} className="mr-2" />
          Add to Portfolio
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <StickyNote size={16} className="mr-2" />
          Add Notes
        </Button>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Plus size={16} className="mr-2" />
          Buy Stock
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
